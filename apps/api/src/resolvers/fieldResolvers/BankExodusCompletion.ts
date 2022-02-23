import { Resolver, FieldResolver, Root, Ctx, Authorized } from 'type-graphql'
import { BankExodusCompletion, User } from '@generated/type-graphql/models'
import type { Context } from '../../types/Context'
import { ErrorWithProps } from '../../utility/ErrorWithProps'

@Resolver((_of) => BankExodusCompletion)
export abstract class BankExodusCompletionFieldResolvers {
  @Authorized()
  @FieldResolver((_type) => User, { nullable: true })
  async belongsToUser(
    @Root() bankExodusCompletion: BankExodusCompletion,
    @Ctx() { prisma }: Context,
  ): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id: bankExodusCompletion.userId },
    })

    if (!user) {
      throw new ErrorWithProps('User not found')
    }

    return user
  }

  @Authorized('ADMIN')
  @FieldResolver((_type) => User, { nullable: true })
  async reviewedByUser(
    @Root() bankExodusCompletion: BankExodusCompletion,
    @Ctx() { prisma }: Context,
  ): Promise<User | null> {
    if (!bankExodusCompletion.reviewedByUserId) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { id: bankExodusCompletion.reviewedByUserId },
    })

    if (!user) {
      throw new ErrorWithProps('User not found')
    }

    return user
  }
}
