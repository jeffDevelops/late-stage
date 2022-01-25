import { Query, Resolver, Ctx, UseMiddleware, Authorized } from 'type-graphql'

import { User } from '@generated/type-graphql/models/User'
import { CurrentUser } from '../../middleware/CurrentUser'

import type { Context } from '../../types/Context'

@Resolver()
export abstract class CurrentUserResolver {
  @Query(() => User)
  @Authorized()
  @UseMiddleware(CurrentUser)
  public async currentUser(@Ctx() { user }: Context) {
    console.log({ user })
    return user
  }
}
