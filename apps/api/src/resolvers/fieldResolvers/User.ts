import {
  Authorized,
  Resolver,
  UseMiddleware,
  Root,
  Ctx,
  FieldResolver,
} from 'type-graphql'
import { User, Campaign } from '@generated/type-graphql'
import { CurrentUser } from '../../middleware/CurrentUser'

import type { Context } from '../../types/Context'

@Resolver((_of) => User)
export abstract class UserFieldResolvers {
  @Authorized()
  @UseMiddleware(CurrentUser)
  @FieldResolver((_type) => [Campaign], { nullable: false })
  async completedCampaigns(
    @Root() user: User,
    @Ctx() { prisma }: Context,
  ): Promise<Campaign[]> {
    return await prisma.campaign.findMany({
      where: {
        usersThatDidCompleteCampaign: {
          some: { id: user.id },
        },
      },
    })
  }
}
