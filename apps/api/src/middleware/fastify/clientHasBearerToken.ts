import type { FastifyRequest, FastifyReply } from 'fastify'
import Mercurius from 'mercurius'
import { timingSafeEqual } from 'crypto'

const { ErrorWithProps } = Mercurius

export const clientHasBearerToken = (req: FastifyRequest): true | never => {
  /* c8 ignore start */
  if (process.env.NODE_ENV === 'development') return true
  /* c8 ignore stop */

  const bearerToken: string | null =
    req.headers.authorization?.replace('Bearer ', '') ?? null

  const isAuthorized =
    bearerToken !== null &&
    timingSafeEqual(Buffer.from(bearerToken), Buffer.from(process.env.API_KEY!))

  if (!isAuthorized) {
    throw new ErrorWithProps('Unauthorized client', undefined, 401)
  }

  return isAuthorized
}
