import { Mutation, Resolver, Ctx } from 'type-graphql'
import type { User } from '@prisma/client'

@Resolver()
export class CreateUserResolver {
  @Mutation((returns) => User, { nullable: false })
  async createUser()
}
