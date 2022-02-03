import { ErrorWithProps } from './ErrorWithProps'

import type { FastifyRequest } from 'fastify'

export const unsignCookie = (req: FastifyRequest, cookieName: string) => {
  const cookie: undefined | string = req.cookies[cookieName]

  if (!cookie) {
    throw new ErrorWithProps(`Unauthorized - no ${cookieName} cookie`)
  }

  const unsigned = req.unsignCookie(cookie)

  if (unsigned.valid === false) {
    throw new ErrorWithProps('Unauthorized - cookie invalid')
  }

  if (!unsigned.value) {
    throw new ErrorWithProps('Unauthorized - cookie invalid')
  }

  return unsigned.value
}
