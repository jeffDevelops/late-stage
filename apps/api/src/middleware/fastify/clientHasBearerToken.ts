import type { FastifyRequest, FastifyReply } from 'fastify'
import Mercurius from 'mercurius'
const { ErrorWithProps } = Mercurius

export const clientHasBearerToken = (
  req: FastifyRequest,
  res: FastifyReply,
): true | never => {
  /* c8 ignore start */
  if (process.env.NODE_ENV === 'development') return true
  /* c8 ignore stop */

  const bearerToken: string | null =
    req.headers.authorization?.replace('Bearer ', '') ?? null

  const isAuthorized =
    bearerToken !== null && bearerToken === process.env.API_KEY

  if (!isAuthorized) {
    throw new ErrorWithProps('Unauthorized client', undefined, 401)
  }

  return isAuthorized
}
