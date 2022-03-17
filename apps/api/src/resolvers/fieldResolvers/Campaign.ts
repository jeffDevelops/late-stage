import {
  Resolver,
  FieldResolver,
  Root,
  Ctx,
  createUnionType,
} from 'type-graphql'
import { Campaign, Tag, WorkCited } from '@generated/type-graphql/models'
import {
  AggregateBankExodusCompletion,
  AggregateAmazonPrimeCompletion,
} from '@generated/type-graphql/resolvers/outputs'
import type { Context } from '../../types/Context'

const CampaignAggregateUnion = createUnionType({
  name: 'CampaignAggregateUnion',
  types: () =>
    [
      AggregateBankExodusCompletion,
      AggregateAmazonPrimeCompletion,
      // ...
    ] as const,
  resolveType: (value) => {
    if (value._sum && 'withdrawalAmount' in value._sum) {
      return AggregateBankExodusCompletion
    }

    if (value._sum && 'cancellationAmount' in value._sum) {
      return AggregateAmazonPrimeCompletion
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

      case 'amazon-prime':
        return await prisma.amazonPrimeCompletion.aggregate({
          _sum: {
            cancellationAmount: true,
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

  @FieldResolver((_type) => [WorkCited], { nullable: false })
  async worksCited(@Root() campaign: Campaign, @Ctx() { prisma }: Context) {
    const worksCited = await prisma.workCited.findMany({
      where: {
        campaignId: campaign.id,
      },
      orderBy: {
        authorLastName: 'asc',
      },
    })

    return worksCited
  }
}
