import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import { ErrorWithProps } from '../../utility/ErrorWithProps'
import type { Context } from '../../types/Context'

@Resolver()
export abstract class BanUserResolver {
  @Authorized('ADMIN')
  @Mutation(() => Boolean, { nullable: false })
  async banUser(
    @Arg('id') id: string,
    @Ctx() { prisma }: Context,
  ): Promise<boolean> {
    const userToBan = await prisma.user.findUnique({
      where: { id },
    })

    if (!userToBan) {
      throw new ErrorWithProps('User not found')
    }

    if (userToBan.isAdmin) {
      throw new ErrorWithProps('Cannot ban an admin')
    }

    await prisma.user.update({
      where: { id },
      data: { banned: true },
    })

    return true
  }
}
