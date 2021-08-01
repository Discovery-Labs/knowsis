import { Web3Storage, File, getFilesFromPath } from 'web3.storage';

function getAccessToken() {
  return process.env.WEB3STORAGE_TOKEN
}
export function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

export async function storeWithProgress(files) {
  // show the root cid as soon as it's ready
  const onRootCidReady = cid => {
    console.log('uploading files with cid:', cid)
  }

  // when each chunk is stored, update the percentage complete and display
  const totalSize = files.map(f => f.size).reduce((a, b) => a + b, 0)
  let uploaded = 0

  const onChunkStored = size => {
    uploaded += size
    const pct = totalSize / uploaded
    console.log(`Uploading... ${pct.toFixed(2)}% complete`)
  }

  // makeStorageClient returns an authorized Web3.Storage client instance
  const client = makeStorageClient()

  // client.put will invoke our callbacks during the upload
  // and return the root cid when the upload completes
  return client.put(files, { onRootCidReady, onChunkStored })
}

export async function getFiles(path) {
  const filesToIgnore = process.env.FILES_TO_IGNORE.split(',').map(fileToIgnore => fileToIgnore.trim())
  return getFilesFromPath(path, {
    ignore: filesToIgnore,
  })
}

export async function uploadFilesToWeb3Storage(){
  // TODO: make sure that the github account of the contributor is linked with and ethereum address
  const client = makeStorageClient();
  const discoveryGitBookFiles = await getFiles(process.cwd())
  // TODO: Check which files need to be uploaded through github.context.payload
  const rootCid = await storeWithProgress(discoveryGitBookFiles)
  const info = await client.status(rootCid)
  const res = await client.get(rootCid) // Web3Response
  const files = await res.files() // Web3File[]
  return { rootCid, files };
}
