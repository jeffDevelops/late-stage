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
export abstract class UnmarkAmazonPrimeCompletionReviewedResolver {
  @Authorized('ADMIN')
  @UseMiddleware(CurrentUser)
  @Mutation(() => Boolean, { nullable: false })
  async unmarkAmazonPrimeCompletionReviewed(
    @Arg('amazonPrimeCompletionId') id: string,
    @Ctx() { prisma, userId }: Context,
  ): Promise<boolean> {
    const amazonPrimeCompletion = await prisma.amazonPrimeCompletion.findUnique(
      {
        where: { id },
      },
    )

    if (!amazonPrimeCompletion) {
      throw new ErrorWithProps('AmazonPrimeCompletion not found')
    }

    await prisma.amazonPrimeCompletion.update({
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
