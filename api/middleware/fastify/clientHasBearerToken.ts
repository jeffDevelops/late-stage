import { FastifyRequest } from 'fastify'

export const clientHasBearerToken = (req: FastifyRequest): boolean => {
  const bearerToken: string | null =
    req.headers.authorization?.replace('Bearer ', '') ?? null

  const isAuthorized =
    (bearerToken !== undefined && bearerToken === process.env.API_KEY) ||
    process.env.NODE_ENV === 'development'

  if (!isAuthorized) return false

  return true
}
