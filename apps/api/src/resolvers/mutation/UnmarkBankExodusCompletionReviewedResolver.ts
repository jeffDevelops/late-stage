import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { ErrorWithProps } from '../../utility/ErrorWithProps'
import { CurrentUser } from '../../middleware'

import type { Context } from '../../types/Context'

@Resolver()
export abstract class UnmarkBankExodusCompletionReviewedResolver {
  @Authorized('ADMIN')
  @UseMiddleware(CurrentUser)
  @Mutation(() => Boolean, { nullable: false })
  async unmarkBankExodusCompletionReviewed(
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
        wasReviewedByAdmin: false,
        wasApprovedByAdmin: false,
        reviewedByUserId: null,
      },
    })

    return true
  }
}
