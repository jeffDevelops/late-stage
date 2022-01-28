import cookie from 'fastify-cookie'
import type { FastifyInstance } from 'fastify'

export const registerCookie = (app: FastifyInstance) => {
  app.register(cookie, {
    secret: process.env.COOKIE_SECRET,
    parseOptions: {
      httpOnly: true,
      secure: true,
      path: '/',
      signed: true,
    },
  })
}
