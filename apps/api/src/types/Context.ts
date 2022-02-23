import ImageKit from 'imagekit'
import type { PrismaClient } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { User } from '@generated/type-graphql/models/User'

export type Context = {
  prisma: PrismaClient
  imageKit: ImageKit

  req: FastifyRequest
  res: FastifyReply

  userId?: string // assigned in isAuthorized middleware, where decorated with @Authorized
  user?: User // assigned on-demand by CurrentUser middleware, where decorated with @UseMiddleware(CurrentUser)
}
