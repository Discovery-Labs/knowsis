const CeramicClient  = require('@ceramicnetwork/http-client'
);
const KeyDidResolver = require('key-did-resolver');
const ThreeIdResolver = require('@ceramicnetwork/3id-did-resolver');
const { TileDocument } = require('@ceramicnetwork/stream-tile');
const { DID }  = require('dids');
const { IDX } = require('@ceramicstudio/idx');
const { createDefinition, publishSchema } = require('@ceramicstudio/idx-tools')

const aliases = {
  projects: 'definitionID projects 1',
  quests: 'definitionID quests 1',
}

const ceramic = new CeramicClient(process.env.proceAPI_URL);
const resolver = {
  ...KeyDidResolver.getResolver(),
  ...ThreeIdResolver.getResolver(ceramic)
}
ceramic.did = new DID({ resolver })
const idx = new IDX({ ceramic, aliases })

async function createCeramicDocument(data, schema){
  try {
    const publishedSchema = await publishSchema(ceramic, { content: schema })
      // Create the definition using the created schema ID
    const schemaDoc = await createDefinition(ceramic, {
      name: schema.title,
      description: schema.description,
      schema: publishedSchema.commitId.toUrl(),
    })
    const doc = await TileDocument.create(ceramic,
      data,
      {
        controllers: [ceramic.did.id],
        family: "courses",
        schema: schemaDoc.commitId,
      }
    )
    const streamId = doc.id.toString()
    return { streamId, doc, schemaDoc }
  } catch (error) {
    console.log({ createCeramicDocumentError: error })
  }
}

async function readCeramicRecord(DID_OR_CAIP10_ID){
  try {
    return await idx.get('basicProfile', DID_OR_CAIP10_ID)
  } catch (error) {
    console.log({readCeramicRecordError: error})
  }
}

async function getCeramicAlias(alias){
  try {
    return await idx.get(alias) // uses authenticated DID
  } catch (error) {
    console.log({ getCeramicAliasError: error });
  }
}

module.exports = {
  instances: { ceramic, idx },
  getCeramicAlias,
  createCeramicDocument,
  readCeramicRecord
}