import { buildSchema, Authorized, UseMiddleware } from 'type-graphql'
import { isAuthorized, CurrentUser } from '../middleware'
import {
  ModelsEnhanceMap,
  applyModelsEnhanceMap,
  ModelConfig,
  ResolversEnhanceMap,
  applyResolversEnhanceMap,
} from '@generated/type-graphql'

/** Resolvers (Generated) */
import {
  CreateCampaignResolver,
  CreateTagResolver,
  CreateWorkCitedResolver,
  FindUniqueUserResolver,
  FindManyUserResolver,
  FindManyBankExodusCompletionResolver,
  AggregateBankExodusCompletionResolver,
  FindManyAmazonPrimeCompletionResolver,
  AggregateAmazonPrimeCompletionResolver,
  FindUniqueAmazonPrimeCompletionResolver,
  FindUniqueBankExodusCompletionResolver,
  FindManyCampaignResolver,
  FindUniqueCampaignResolver,
  FindManyTagResolver,
} from '@generated/type-graphql'

/** Mutations (Custom) */
import {
  ApproveAmazonPrimeCompletionResolver,
  ApproveBankExodusCompletionResolver,
  AuthenticateUserResolver,
  BanUserResolver,
  LogOutResolver,
  MarkAmazonPrimeCompletionReviewedResolver,
  MarkBankExodusCompletionReviewedResolver,
  RecordAmazonPrimeCompletionResolver,
  RecordBankExodusCompletionResolver,
  RefreshAccessTokenResolver,
  RegisterUserResolver,
  SendUserConfirmationEmailResolver,
  UnapproveAmazonPrimeCompletionResolver,
  UnapproveBankExodusCompletionResolver,
  UnmarkAmazonPrimeCompletionReviewedResolver,
  UnmarkBankExodusCompletionReviewedResolver,
  UpdateEmailAddressResolver,
  UpdateUsernameResolver,
  VerifyEmailAddressResolver,
} from '../resolvers/mutation'

/** Queries (Custom) */
import {
  CurrentUserResolver,
  ImageKitAuthenticationParamsResolver,
  RecaptchaVerificationResolver,
} from '../resolvers/query'

/** Field Resolvers (Custom) */
import {
  AmazonPrimeCompletionFieldResolvers,
  BankExodusCompletionFieldResolvers,
  CampaignFieldResolvers,
  UserFieldResolvers,
} from '../resolvers/fieldResolvers'

export const schema = async () => {
  /** Field-based permissions */
  const bankExodusCompletionModelConfig: ModelConfig<'BankExodusCompletion'> = {
    // Prevent basic user info from leaking to users that are not logged in
    fields: {
      userId: [Authorized()],
      belongsToUser: [Authorized()],
    },
  }

  const amazonPrimeCompletionsModelConfig: ModelConfig<'AmazonPrimeCompletion'> =
    {
      fields: {
        userId: [Authorized()],
        belongsToUser: [Authorized()],
      },
    }

  const modelsEnhanceMap: ModelsEnhanceMap = {
    AmazonPrimeCompletion: amazonPrimeCompletionsModelConfig,
    BankExodusCompletion: bankExodusCompletionModelConfig,
  }

  const resolversEnhanceMap: ResolversEnhanceMap = {
    Campaign: {
      createCampaign: [Authorized('ADMIN'), UseMiddleware(CurrentUser)],
    },
    Tag: {
      createTag: [Authorized('ADMIN'), UseMiddleware(CurrentUser)],
    },
    WorkCited: {
      createManyWorkCited: [Authorized('ADMIN'), UseMiddleware(CurrentUser)],
    },
  }

  applyModelsEnhanceMap(modelsEnhanceMap)
  applyResolversEnhanceMap(resolversEnhanceMap)

  const schema = await buildSchema({
    resolvers: [
      // Custom resolvers go here...
      AmazonPrimeCompletionFieldResolvers,
      ApproveAmazonPrimeCompletionResolver,
      ApproveBankExodusCompletionResolver,
      AuthenticateUserResolver,
      BankExodusCompletionFieldResolvers,
      CampaignFieldResolvers,
      BanUserResolver,
      CurrentUserResolver,
      ImageKitAuthenticationParamsResolver,
      LogOutResolver,
      MarkAmazonPrimeCompletionReviewedResolver,
      MarkBankExodusCompletionReviewedResolver,
      RecaptchaVerificationResolver,
      RecordAmazonPrimeCompletionResolver,
      RecordBankExodusCompletionResolver,
      RegisterUserResolver,
      RefreshAccessTokenResolver,
      SendUserConfirmationEmailResolver,
      UnapproveAmazonPrimeCompletionResolver,
      UnapproveBankExodusCompletionResolver,
      UnmarkAmazonPrimeCompletionReviewedResolver,
      UnmarkBankExodusCompletionReviewedResolver,
      UpdateEmailAddressResolver,
      UpdateUsernameResolver,
      UserFieldResolvers,
      VerifyEmailAddressResolver,

      // Resolvers from '@generated/type-graphql are selectively included below...
      CreateCampaignResolver,
      CreateWorkCitedResolver,
      CreateTagResolver,
      AggregateAmazonPrimeCompletionResolver,
      AggregateBankExodusCompletionResolver,
      FindManyAmazonPrimeCompletionResolver,
      FindManyBankExodusCompletionResolver,
      FindManyCampaignResolver,
      FindManyUserResolver,
      FindManyTagResolver,
      FindUniqueAmazonPrimeCompletionResolver,
      FindUniqueBankExodusCompletionResolver,
      FindUniqueCampaignResolver,
      FindUniqueUserResolver,
    ],
    authChecker: isAuthorized,
    validate: false,
  })

  return schema
}
