import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import mercurius from 'mercurius'
import { NoSchemaIntrospectionCustomRule } from 'graphql'

import { prisma } from '../../../prisma/prisma.config'
import { imageKit } from '../../config/imageKit/initImageKit'
import { clientHasBearerToken } from '../../middleware/fastify/index'
import { schema as codegen } from '../../graphql/schema'

import type { Context } from '../../types/Context'

export const registerMercurius = async (app: FastifyInstance) => {
  const schema = await codegen()

  app.register(mercurius, {
    schema,
    path: '/graphql',
    context: (req: FastifyRequest, res: FastifyReply): Context => {
      clientHasBearerToken(req)

      return {
        prisma,
        imageKit,

        req,
        res,
        // ...
      }
    },
    validationRules:
      process.env.NODE_ENV === 'production'
        ? /* c8 ignore start */
          [NoSchemaIntrospectionCustomRule]
        : /* c8 ignore stop */
          [],
  })
}
