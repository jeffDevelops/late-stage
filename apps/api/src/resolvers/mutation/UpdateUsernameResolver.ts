import {
  Mutation,
  Resolver,
  UseMiddleware,
  Ctx,
  Authorized,
  Arg,
} from 'type-graphql'
import { User } from '@generated/type-graphql/models/User'
import { CurrentUser } from '../../middleware/CurrentUser'
import { InputValidator } from '../../utility/InputValidator'

import type { Context } from '../../types/Context'
import { ErrorWithProps } from '../../utility/ErrorWithProps'

@Resolver()
export abstract class UpdateUsernameResolver {
  @Mutation(() => User)
  @Authorized()
  @UseMiddleware(CurrentUser)
  public async updateUsername(
    @Arg('newUsername') newUsername: string,
    @Ctx() { user, req, prisma }: Context,
  ): Promise<User> {
    InputValidator.validateUsername(newUsername, req)

    /** c8 ignore start */
    /* This condition wouldn't ever happen and is here solely to appease TS */
    if (!user) throw new ErrorWithProps('User not found')
    /** c8 ignore end */

    const usernameExists = await prisma.user.findUnique({
      where: {
        username: newUsername,
      },
    })

    if (usernameExists)
      throw new ErrorWithProps(
        'A user with that username already exists. Please try another.',
      )

    const newUser = await prisma.user.update({
      where: { id: user.id },
      data: { username: newUsername },
    })

    return newUser
  }
}
