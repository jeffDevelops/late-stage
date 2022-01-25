import AltairFastify from 'altair-fastify-plugin'
import type { FastifyInstance } from 'fastify'

export const registerAltair = (app: FastifyInstance) => {
  /* c8 ignore start */
  if (process.env.NODE_ENV === 'development') {
    app.register(AltairFastify, {
      path: '/altair',
      baseURL: '/altair/',
      endpointURL: '/graphql',
    })
  }
  /* c8 ignore stap */
}
