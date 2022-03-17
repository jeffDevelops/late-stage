import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  registerEnumType,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import sgMail from '@sendgrid/mail'
import { PrismaClient } from '@prisma/client'

import { CurrentUser } from '../../middleware/CurrentUser'
import { AmazonPrimeCompletion } from '@generated/type-graphql/models'
import { ErrorWithProps } from '../../utility/ErrorWithProps'
import type { Context } from '../../types/Context'
import { CampaignScalars } from '../inputs/CampaignScalars'

export enum MembershipSelections {
  Annually = 'Annually',
  Monthly = 'Monthly',
  PrimeVideo = 'Prime Video',
  StudentMonthly = 'Student (Monthly)',
  StudentAnnually = 'Student (Annually)',
  Discounted = 'Discounted (EBT, Medicaid, Govt. Assistance)',
}

registerEnumType(MembershipSelections, {
  name: 'MembershipSelections',
  description: 'Enumerates the possible Amazon Prime membership selections',
})

@InputType()
abstract class RecordAmazonPrimeCompletionInput extends CampaignScalars {
  @Field((_type) => String, { nullable: false })
  cancellationImageURL: string

  @Field((_type) => String, { nullable: false })
  imageKitFileId: string

  @Field((_type) => MembershipSelections, { nullable: false })
  membershipSelection: MembershipSelections

  // Reasons for cancelling Amazon Prime
  @Field((_type) => Boolean, { nullable: false })
  environmentalConcerns: boolean

  @Field((_type) => Boolean, { nullable: false })
  antiCompetitionConcerns: boolean

  @Field((_type) => Boolean, { nullable: false })
  workersRightsConcerns: boolean

  @Field((_type) => Boolean, { nullable: false })
  marketplaceAntitrustConcerns: boolean

  @Field((_type) => String, { nullable: false })
  otherInfo: string
}

@Resolver()
export abstract class RecordAmazonPrimeCompletionResolver {
  @Authorized()
  @UseMiddleware(CurrentUser)
  @Mutation(() => AmazonPrimeCompletion)
  async recordAmazonPrimeCompletion(
    @Arg('RecordAmazonPrimeCompletionInput', {
      nullable: false,
      validate: true,
    })
    input: RecordAmazonPrimeCompletionInput,
    @Ctx() { prisma, user, imageKit }: Context,
  ): Promise<AmazonPrimeCompletion> {
    /* c8 ignore start */
    if (!user) throw new ErrorWithProps('User not found') // This would never happen in production on account of the CurrentUser middleware; it's here to appease TS
    /* c8 ignore end */

    /**
     * Ensure the user hasn't submitted already
     */
    const completion = await prisma.amazonPrimeCompletion.findFirst({
      where: {
        userId: user.id,
      },
    })

    if (completion) {
      throw new ErrorWithProps(
        'You have already recorded your participation in this campaign.',
      )
    }

    const campaign = await prisma.campaign.findUnique({
      where: {
        id: input.campaignId,
      },
    })

    if (!campaign) {
      throw new ErrorWithProps('Campaign not found')
    }

    const cancellationAmount = await this.getCancellationAmount(
      prisma,
      input.membershipSelection,
    )

    const [createAmazonPrimeCompletion] = await prisma.$transaction([
      prisma.amazonPrimeCompletion.create({
        data: {
          ...input,
          cancellationAmount,
          belongsToUser: {
            connect: {
              id: user.id,
            },
          },
        },
      }),

      // Mark campaign completed by user
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          cred: {
            increment: campaign.credRewarded,
          },
          completedCampaigns: {
            connect: {
              id: input.campaignId,
            },
          },
        },
      }),
    ])

    await this.sendSubmissionNotificationEmail(createAmazonPrimeCompletion.id)

    return createAmazonPrimeCompletion
  }

  private async getCancellationAmount(
    prisma: PrismaClient,
    membershipSelection: MembershipSelections,
  ): Promise<number> {
    const primePricing = await prisma.amazonPrimePricing.findFirst()

    if (!primePricing)
      throw new ErrorWithProps('Amazon Prime pricing not found')

    switch (membershipSelection) {
      case MembershipSelections.Annually:
        return primePricing.Annually
      case MembershipSelections.Monthly:
        return primePricing.Monthly
      case MembershipSelections.PrimeVideo:
        return primePricing.PrimeVideo
      case MembershipSelections.StudentMonthly:
        return primePricing.StudentMonthly
      case MembershipSelections.StudentAnnually:
        return primePricing.StudentAnnually
      case MembershipSelections.Discounted:
        return primePricing.Discounted
      default:
        throw new ErrorWithProps(
          `Unhandled membership selection ${membershipSelection}`,
        )
    }
  }

  private async sendSubmissionNotificationEmail(
    amazonPrimeCompletionId: string,
  ): Promise<void> | never {
    try {
      const message = {
        to: process.env.ADMIN_EMAIL,
        from: {
          email: 'letsdothis@late-stage.com',
          name: 'Late-Stage',
        },
        templateId: 'd-4757a4f13fd14483a0f70cd7dfb811db',
        dynamicTemplateData: {
          url: `${process.env
            .CORS_ORIGIN!}/amazon-prime-campaign/${amazonPrimeCompletionId}`,
        },
        hideWarnings: true,
      }

      sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

      /* c8 ignore start */
      if (process.env.NODE_ENV !== 'test') {
        await sgMail.send(message)
      }
    } catch (error) {
      console.error(error)
      throw new ErrorWithProps('And unknown error occurred')
    }
    /* c8 ignore stop */
  }
}
