import {
  Query,
  Resolver,
  Int,
  Ctx,
  Authorized,
  UseMiddleware,
} from 'type-graphql'
import { CurrentUser } from '../../middleware/CurrentUser'

import type { Context } from '../../types/Context'

@Resolver()
export abstract class UserBankExodusCompletionsCountResolver {
  @Authorized()
  @UseMiddleware(CurrentUser)
  @Query(() => Int)
  async userBankExodusCompletionsCount(
    @Ctx() { userId, prisma }: Context,
  ): Promise<number> {
    return await prisma.bankExodusCompletion.count({
      where: {
        userId,
      },
    })
  }
}
