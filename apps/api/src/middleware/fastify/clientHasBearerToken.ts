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
    // Ensure buffer byte lengths are the same for a timing safe equal (if not, they're not equal anyway)
    Buffer.from(bearerToken).length ===
      Buffer.from(process.env.API_KEY!).length &&
    // Ensure bad actors can't use response latency as an attack vector to guess the API key
    timingSafeEqual(Buffer.from(bearerToken), Buffer.from(process.env.API_KEY!))
  if (!isAuthorized) {
    throw new ErrorWithProps('Unauthorized client', undefined, 401)
  }

  return isAuthorized
}
