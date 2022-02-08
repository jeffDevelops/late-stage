import { fastify, FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { resolve } from 'path'
import { readFileSync } from 'fs'

export const initFastify = (): FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> => {
  // if (process.env.NODE_ENV !== 'production') {
  //   return fastify({
  //     https: {
  //       cert: readFileSync(resolve(__dirname, '../../../../server.crt')),
  //       key: readFileSync(resolve(__dirname, '../../../../server.key')),
  //     },
  //   })
  // } else {
  return fastify()
  // }
}
