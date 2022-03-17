import { Resolver, FieldResolver, Root, Ctx, Authorized } from 'type-graphql'
import { AmazonPrimeCompletion, User } from '@generated/type-graphql/models'
import type { Context } from '../../types/Context'
import { ErrorWithProps } from '../../utility/ErrorWithProps'

@Resolver((_of) => AmazonPrimeCompletion)
export abstract class AmazonPrimeCompletionFieldResolvers {
  @Authorized()
  @FieldResolver((_type) => User, { nullable: true })
  async belongsToUser(
    @Root() amazonPrimeCompletion: AmazonPrimeCompletion,
    @Ctx() { prisma }: Context,
  ): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id: amazonPrimeCompletion.userId },
    })

    if (!user) {
      throw new ErrorWithProps('User not found')
    }

    return user
  }

  @Authorized('ADMIN')
  @FieldResolver((_type) => User, { nullable: true })
  async reviewedByUser(
    @Root() amazonPrimeCompletion: AmazonPrimeCompletion,
    @Ctx() { prisma }: Context,
  ): Promise<User | null> {
    if (!amazonPrimeCompletion.reviewedByUserId) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { id: amazonPrimeCompletion.reviewedByUserId },
    })

    if (!user) {
      throw new ErrorWithProps('User not found')
    }

    return user
  }
}
