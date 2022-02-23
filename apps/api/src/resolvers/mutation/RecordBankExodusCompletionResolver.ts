import {
  Authorized,
  Field,
  InputType,
  UseMiddleware,
  Float,
  Resolver,
  Mutation,
  Ctx,
  Arg,
} from 'type-graphql'
import sgMail from '@sendgrid/mail'

import { CurrentUser } from '../../middleware/CurrentUser'
import { User, BankExodusCompletion } from '@generated/type-graphql/models'
import { ErrorWithProps } from '../../utility/ErrorWithProps'
import type { Context } from '../../types/Context'

@InputType()
abstract class RecordBankExodusCompletionInput {
  @Field((_type) => String, { nullable: false })
  campaignId: string

  bankExodusCompletionId!: string
  @Field((_type) => Boolean, { nullable: false })
  isAnonymous: boolean

  @Field((_type) => String, { nullable: false })
  withdrawalReceiptImageURL: string

  @Field((_type) => String, { nullable: false })
  imageKitFileId: string

  @Field((_type) => Float, { nullable: false })
  withdrawalAmount: number

  @Field((_type) => String, { nullable: false })
  originInstitutionName: string

  @Field((_type) => String, { nullable: false })
  destinationInstitutionName: string

  // Reasons for moving to this destination bank
  @Field((_type) => Boolean, { nullable: false })
  dontInvestInFossilFuels: boolean

  @Field((_type) => Boolean, { nullable: false })
  dontInvestInSLABS: boolean

  @Field((_type) => Boolean, { nullable: false })
  dontChargeAccountFees: boolean

  @Field((_type) => Boolean, { nullable: false })
  offerFairRatesToAccountHolders: boolean

  @Field((_type) => Boolean, { nullable: false })
  conscientiousAboutHumanRights: boolean

  @Field((_type) => Boolean, { nullable: false })
  other: boolean

  @Field((_type) => String, { nullable: false })
  otherInfo: string
}

@Resolver()
export abstract class RecordBankExodusCompletionResolver {
  @Authorized()
  @UseMiddleware(CurrentUser)
  @Mutation(() => BankExodusCompletion, { nullable: false })
  async recordBankExodusCompletion(
    @Arg('RecordBankExodusCompletionInput', { nullable: false, validate: true })
    input: RecordBankExodusCompletionInput,
    @Ctx() { prisma, user, imageKit }: Context,
  ): Promise<BankExodusCompletion> {
    /* c8 ignore start */
    if (!user) throw new ErrorWithProps('User not found') // This would never happen in production on account of the CurrentUser middleware; it's here to appease TS
    /* c8 ignore end */

    /**
     * Ensure the user hasn't submitted 5 in one day
     */
    const completions = await prisma.bankExodusCompletion.findMany({
      where: {
        userId: user.id,
        createdAt: {
          gte: new Date(Date.now() - 1000 * 60 * 60 * 24),
        },
      },
    })

    if (completions.length >= 5) {
      await imageKit.deleteFile(input.imageKitFileId)

      throw new ErrorWithProps(
        'You have exceeded the maximum number of submissions allowed per day.',
      )
    }

    const [createBankExodusCompletion, _markCampaignCompletedByUser] =
      await prisma.$transaction([
        prisma.bankExodusCompletion.create({
          data: {
            ...input,
            belongsToUser: {
              connect: {
                id: user.id,
              },
            },
          },
        }),

        prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            cred: 100, // Reward the user 100 cred
            completedCampaigns: {
              connect: {
                id: input.campaignId,
              },
            },
          },
        }),
      ])

    await this.sendSubmissionNotificationEmail(
      user,
      createBankExodusCompletion.id,
    )

    return createBankExodusCompletion
  }

  private async sendSubmissionNotificationEmail(
    user: User,
    bankExodusCompletionId: string,
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
            .CORS_ORIGIN!}/bank-exodus-campaign/${bankExodusCompletionId}`,
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
