import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Resolver,
  UseMiddleware,
  ID,
} from 'type-graphql'
import { ErrorWithProps } from '../../utility/ErrorWithProps'
import { CurrentUser } from '../../middleware'

import type { Context } from '../../types/Context'

@Resolver()
export abstract class ApproveBankExodusCompletionResolver {
  @Authorized('ADMIN')
  @UseMiddleware(CurrentUser)
  @Mutation(() => Boolean, { nullable: false })
  async approveBankExodusCompletion(
    @Arg('bankExodusCompletionId') id: string,
    @Ctx() { prisma, userId }: Context,
  ): Promise<boolean> {
    const bankExodusCompletion = await prisma.bankExodusCompletion.findUnique({
      where: { id },
    })

    if (!bankExodusCompletion) {
      throw new ErrorWithProps('BankExodusCompletion not found')
    }

    await prisma.bankExodusCompletion.update({
      where: { id },
      data: {
        wasReviewedByAdmin: true,
        wasApprovedByAdmin: true,
        reviewedByUserId: userId,
      },
    })

    return true
  }
}
