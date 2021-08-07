import CeramicClient from '@ceramicnetwork/http-client'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { DID } from 'dids'
import { IDX } from '@ceramicstudio/idx'
import { createDefinition, publishSchema } from '@ceramicstudio/idx-tools'
import { fromString } from 'uint8arrays'
import { randomBytes } from '@stablelib/random'
import { schemas } from '@discovery-decrypted/schemas/lib/schemas.js';

export async function makeCeramicClient() {
  // The seed must be provided as an environment variable
  console.log(process.env.CERAMIC_SEED);
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
    provider: new Ed25519Provider(randomBytes(32)),
    resolver: resolverRegistry,
  })
  await did.authenticate()
  await ceramic.setDID(did)

  // TODO: make a loop to create schemas and definitions and also create if not exists
  // Publish the two schemas
  const [course, courses, project, projects, repo, repos] = await Promise.all([
    publishSchema(ceramic, { content: schemas.discovery.course, name: 'course' }),
    publishSchema(ceramic, { content: schemas.discovery.courses, name: 'courses' }),
    publishSchema(ceramic, { content: schemas.discovery.project, name: 'project' }),
    publishSchema(ceramic, { content: schemas.discovery.projects, name: 'projects' }),
    publishSchema(ceramic, { content: schemas.discovery.repo, name: 'repo' }),
    publishSchema(ceramic, { content: schemas.discovery.repos, name: 'repos' }),
  ])

  console.log('project schema id', project.commitId.toString());
  const discoverySchema = await publishSchema(ceramic, { content: schemas.discovery, name: 'discovery' })

  console.log(discoverySchema);

  // Create the definition using the created schema ID
  const courseDefinition = await createDefinition(ceramic, {
    name: 'course',
    description: 'Discovery course',
    schema: course.commitId.toUrl(),
  })
  const coursesDefinition = await createDefinition(ceramic, {
    name: 'courses',
    description: 'Discovery courses',
    schema: courses.commitId.toUrl(),
  })
  const projectsDefinition = await createDefinition(ceramic, {
    name: 'projects',
    description: 'Discovery projects',
    schema: projects.commitId.toUrl(),
  })
  const projectDefinition = await createDefinition(ceramic, {
    name: 'project',
    description: 'Discovery project',
    schema: project.commitId.toUrl(),
  })
  const reposDefinition = await createDefinition(ceramic, {
    name: 'repos',
    description: 'Discovery repos',
    schema: repos.commitId.toUrl(),
  })
  const repoDefinition = await createDefinition(ceramic, {
    name: 'repo',
    description: 'Discovery repo',
    schema: repo.commitId.toUrl(),
  })
  // const discoveryDefinition = await createDefinition(ceramic, {
  //   name: 'discovery',
  //   description: 'Educational gamified collaborative platform',
  //   schema: {
  //     course: course.commitId.toUrl(),
  //     courses: course.commitId.toUrl(),
  //     project: course.commitId.toUrl(),
  //     projects: course.commitId.toUrl(),
  //     repo: course.commitId.toUrl(),
  //     repos: course.commitId.toUrl()
  //   },
  // })
  // TODO: create projects and quests definitions
  const aliases = {
    course: courseDefinition.id.toString(),
    courses: coursesDefinition.id.toString(),
    project: projectDefinition.id.toString(),
    projects: projectsDefinition.id.toString(),
    repos: reposDefinition.id.toString(),
    repo: repoDefinition.id.toString(),
  }

  const idx = new IDX({ ceramic, aliases })
  return { ceramic, idx, aliases };
}

export async function createCeramicDocument(data, schema) {
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

export async function readCeramicRecord(DID_OR_CAIP10_ID) {
  try {
    const { idx } = await makeCeramicClient();
    console.log({ idx });
    const disco = await idx.get("project")
    console.log(disco);
    return await idx.get('basicProfile', DID_OR_CAIP10_ID)
  } catch (error) {
    console.log({ readCeramicRecordError: error })
  }
}

export async function getCeramicAlias(alias) {
  try {
    const { idx } = await makeCeramicClient();
    return await idx.get(alias) // uses authenticated DID
  } catch (error) {
    console.log({ getCeramicAliasError: error });
  }
}