import dotenv from 'dotenv'
dotenv.config()
import core from '@actions/core'
import github from '@actions/github'

import { getCeramicAlias, createCeramicDocument, readCeramicRecord } from './src/services/ceramic/ceramic-service.js'
import { uploadFilesToWeb3Storage } from './src/services/web3-storage/web3-storage-service.js'
import { storeNFTData } from './src/services/nft-storage/nft-storage-service.js'
import { getPullRequest } from './src/services/github/actions-service.js'

async function main(){
  // const { ctx, payload } = await getPullRequest();
  const { files, rootCid } = await uploadFilesToWeb3Storage()

  //const cali = await readCeramicRecord('did:3:kjzl6cwe1jw14943z6hvbzjkod828dq9qh6ga2hegvoznaak81690a0gaf4ygwo')
  //console.log(cali);
  console.log({  files, rootCid });
  
  const nftRecord = {
    root : rootCid,
    fileNames : files.map(f => (f._name)).filter(name => (name.endsWith(".jpg")))
  }

  if(nftRecord.fileNames.length>0){
    const imgIndex = Math.floor(Math.random()*nftRecord.fileNames.length)
    console.log(`${imgIndex} and ${nftRecord.fileNames.length}`);
    let nameWithOutExt = nftRecord.fileNames[imgIndex].split('.')[0];
    nameWithOutExt = nameWithOutExt.replace(/\//g, '__');
    const nftFileName = nameWithOutExt.split('__').pop();
    console.log(nftFileName);
    const unixTime = Math.floor(Date.now() / 1000);
    const description = `Being Minted at ${unixTime}`;
    const tokenURI = await storeNFTData(nftFileName, description, "InsertDID", "interesting_quest");
    console.log(tokenURI);
  }

  // const mainRecord = {
  //   courseId: rootCid,
  //   files: files.map(f => ({ name: f.name, cid: f.cid })),
  //   // get reviewers addresses through idx
  //   reviewers: [''],
  //   // get contributors addresses through idx
  //   contributors: [''],
  //   timestamp: Date.now()
  // }
  // console.log(mainRecord.files);
  // const createdRecord = await createCeramicDocument(mainRecord, CourseSchema)
  // console.log({ createdRecord: createdRecord.doc.content })
}

main()