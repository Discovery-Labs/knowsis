require('dotenv').config();
const core = require('@actions/core');
const github = require('@actions/github');

const { getCeramicAlias, createCeramicDocument, readCeramicRecord } = require('./services/ceramic/ceramic-service');
const { uploadFilesToWeb3Storage } = require('./services/web3-storage/web3-storage-service');

async function main(){
  const { files, rootCid } = await uploadFilesToWeb3Storage()
  const projects = await getCeramicAlias('projects');
  const mainRecord = {
    courseId: rootCid,
    files,
    // get reviewers addresses through idx
    reviewers: [''],
    // get contributors addresses through idx
    contributors: [''],
    timestamp: Date.now();
  };
}

main();