import CeramicClient  from '@ceramicnetwork/http-client'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { DID }  from 'dids'
import { IDX } from '@ceramicstudio/idx'
import { createDefinition, publishSchema } from '@ceramicstudio/idx-tools'
import { fromString } from 'uint8arrays'
import { randomBytes } from '@stablelib/random'


export async function makeCeramicClient(){
  // The seed must be provided as an environment variable
  // const seed = fromString(process.env.CERAMIC_SEED, 'base16')
  const seed = [
    46, 199,   8,  28, 243, 254, 156,
   129,  52, 220, 108, 191, 160,  63,
   146, 212, 170, 247, 179, 208,  27,
   139, 238, 110, 169, 101, 196, 194,
    50,  25, 123, 199
  ];
  console.log(seed);
  // Connect to the local Ceramic node
  const ceramic = new CeramicClient.default(process.env.CERAMIC_API_URL)
  // Authenticate the Ceramic instance with the provider
  const keyDidResolver = KeyDidResolver.default.getResolver()
  const threeIdResolver = ThreeIdResolver.default.getResolver(ceramic)
  const resolverRegistry = {
    ...threeIdResolver,
    ...keyDidResolver,
  }
  const did = new DID({
    provider: new Ed25519Provider(seed),
    resolver: resolverRegistry,
  })
  await did.authenticate()
  await ceramic.setDID(did)

  // TODO: create projects and quests definitions
  const aliases = {
    projects: 'definitionID projects 1',
    quests: 'definitionID quests 1',
    courses: 'definitionID courses 1'
  }

  const idx = new IDX({ ceramic, aliases })
  return { ceramic, idx };
}

export async function createCeramicDocument(data, schema){
  try {
    const { ceramic } = await makeCeramicClient();
    const publishedSchema = await publishSchema(ceramic, { content: schema })
    // TODO: Create the definition using the created schema ID
    // const schemaDoc = await createDefinition(ceramic, {
    //   name: schema.title,
    //   description: schema.description,
    //   schema: publishedSchema.commitId.toUrl(),
    // })
    const doc = await TileDocument.create(ceramic,
      data,
      {
        controllers: [ceramic.did.id],
        family: "courses",
      }
    )
    const streamId = doc.id.toString()
    return { streamId, doc }
  } catch (error) {
    console.log({ createCeramicDocumentError: error })
  }
}

export async function readCeramicRecord(DID_OR_CAIP10_ID){
  try {
    const { idx } = await makeCeramicClient();
    return await idx.get('basicProfile', DID_OR_CAIP10_ID)
  } catch (error) {
    console.log({readCeramicRecordError: error})
  }
}

export async function getCeramicAlias(alias){
  try {
    const { idx } = await makeCeramicClient();
    return await idx.get(alias) // uses authenticated DID
  } catch (error) {
    console.log({ getCeramicAliasError: error });
  }
}