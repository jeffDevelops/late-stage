import {
  Resolver,
  FieldResolver,
  Root,
  Ctx,
  createUnionType,
} from 'type-graphql'
import { Campaign, Tag } from '@generated/type-graphql/models'
import { AggregateBankExodusCompletion } from '@generated/type-graphql/resolvers/outputs'
import type { Context } from '../../types/Context'

const CampaignAggregateUnion = createUnionType({
  name: 'CampaignAggregateUnion',
  types: () =>
    [
      AggregateBankExodusCompletion,
      // ...
    ] as const,
  resolveType: (value) => {
    if (value._sum && 'withdrawalAmount' in value._sum) {
      return AggregateBankExodusCompletion
    }

    // ...

    return undefined
  },
})

@Resolver((_of) => Campaign)
export abstract class CampaignFieldResolvers {
  @FieldResolver((_type) => CampaignAggregateUnion, { nullable: true })
  async stats(@Root() campaign: Campaign, @Ctx() { prisma }: Context) {
    switch (campaign.shortName) {
      case 'banks':
        return await prisma.bankExodusCompletion.aggregate({
          _sum: {
            withdrawalAmount: true,
          },
          where: {
            wasApprovedByAdmin: true,
          },
        })
      default:
        console.log('Unhandled campaign shortName', campaign.shortName)
        return null
    }
  }

  @FieldResolver((_type) => [Tag], { nullable: false })
  async tags(@Root() campaign: Campaign, @Ctx() { prisma }: Context) {
    const tags = await prisma.tag.findMany({
      where: {
        campaigns: {
          some: {
            id: campaign.id,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return tags
  }
}
