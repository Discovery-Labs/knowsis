import dotenv from 'dotenv'
dotenv.config()
import core from '@actions/core'
import github from '@actions/github'

import { getCeramicAlias, createCeramicDocument, readCeramicRecord } from './src/services/ceramic/ceramic-service.js'
import { uploadFilesToWeb3Storage } from './src/services/web3-storage/web3-storage-service.js'
import { CourseSchema } from './src/services/ceramic/schemas/course-schema.js.js'
import { getPullRequest } from './src/services/github/actions-service.js'

async function main(){
  const { ctx, payload } = await getPullRequest();
  // const { files, rootCid } = await uploadFilesToWeb3Storage()
  // // const projects = await getCeramicAlias('projects')
  // console.log({  files, rootCid })
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