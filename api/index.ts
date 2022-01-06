import 'reflect-metadata'

/** Node */
import { Server, IncomingMessage, ServerResponse } from 'http'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

/** Libs */
import { fastify, FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import mercurius from 'mercurius'
import { buildSchema } from 'type-graphql'
import { NoSchemaIntrospectionCustomRule } from 'graphql'

/** Plugins */
import cors from 'fastify-cors'
import multipart from 'fastify-multipart'
import AltairFastify from 'altair-fastify-plugin'

/** Modules */
import { healthcheck, upload, uploads } from './routes/index'
import { verifyEnv } from './utility/verifyEnv'
import { prisma } from './prisma/prisma.config'

/** Resolvers (Generated) */
import resolvers from '@generated/type-graphql'
const { CreateUserResolver, FindUniqueUserResolver, FindManyUserResolver } =
  resolvers

const { ErrorWithProps } = mercurius
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

verifyEnv()

// Main
;(async () => {
  const schema = await buildSchema({
    resolvers: [
      // Resolvers from '@generated/type-graphql go here...
      CreateUserResolver,
      FindUniqueUserResolver,
      FindManyUserResolver,
    ],
    emitSchemaFile: resolve(__dirname, './generated-schema.graphql'),
    validate: false,
  })

  const app: FastifyInstance<Server, IncomingMessage, ServerResponse> =
    fastify()

  const corsOptions = {
    origin: ['http://localhost:3000'],
  }

  app.register(cors, corsOptions)

  /** Image Uploads */
  app.register(multipart)

  app.register(mercurius, {
    schema,
    path: '/graphql',
    context: (req: FastifyRequest, _: FastifyReply) => {
      const bearerToken: string | null =
        req.headers.authorization?.replace('Bearer ', '') ?? null

      const isAuthorized =
        (bearerToken !== undefined && bearerToken === process.env.API_KEY) ||
        process.env.NODE_ENV === 'development'

      if (!isAuthorized) throw new ErrorWithProps('Unauthorized')

      return {
        prisma,
        isAuthorized,
      }
    },
    validationRules:
      process.env.NODE_ENV === 'production'
        ? [NoSchemaIntrospectionCustomRule]
        : [],
  })

  app.register(AltairFastify, {
    path: '/altair',
    baseURL: '/altair/',
    endpointURL: '/graphql',
  })

  // Custom controller plugins
  app.register(healthcheck)
  app.register(upload)
  app.register(uploads)

  app.listen(process.env.PORT!, (error, address) => {
    if (error) return console.error(error)

    console.log(`GraphQL server running @ ${address}/altair`)
  })
})()
