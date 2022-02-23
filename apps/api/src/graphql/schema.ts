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
  FindUniqueUserResolver,
  FindManyUserResolver,
  FindManyBankExodusCompletionResolver,
  AggregateBankExodusCompletionResolver,
  FindUniqueBankExodusCompletionResolver,
  FindManyCampaignResolver,
  FindUniqueCampaignResolver,
  FindManyTagResolver,
} from '@generated/type-graphql'

/** Mutations (Custom) */
import {
  ApproveBankExodusCompletionResolver,
  AuthenticateUserResolver,
  BanUserResolver,
  LogOutResolver,
  MarkBankExodusCompletionReviewedResolver,
  RecordBankExodusCompletionResolver,
  RefreshAccessTokenResolver,
  RegisterUserResolver,
  SendUserConfirmationEmailResolver,
  UnapproveBankExodusCompletionResolver,
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
  BankExodusCompletionFieldResolvers,
  CampaignFieldResolvers,
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

  const modelsEnhanceMap: ModelsEnhanceMap = {
    BankExodusCompletion: bankExodusCompletionModelConfig,
  }

  const resolversEnhanceMap: ResolversEnhanceMap = {
    Campaign: {
      createCampaign: [Authorized('ADMIN'), UseMiddleware(CurrentUser)],
    },
    Tag: {
      createTag: [Authorized('ADMIN'), UseMiddleware(CurrentUser)],
    },
  }

  applyModelsEnhanceMap(modelsEnhanceMap)
  applyResolversEnhanceMap(resolversEnhanceMap)

  const schema = await buildSchema({
    resolvers: [
      // Custom resolvers go here...
      ApproveBankExodusCompletionResolver,
      AuthenticateUserResolver,
      BankExodusCompletionFieldResolvers,
      CampaignFieldResolvers,
      BanUserResolver,
      CurrentUserResolver,
      ImageKitAuthenticationParamsResolver,
      LogOutResolver,
      MarkBankExodusCompletionReviewedResolver,
      RecaptchaVerificationResolver,
      RecordBankExodusCompletionResolver,
      RegisterUserResolver,
      RefreshAccessTokenResolver,
      SendUserConfirmationEmailResolver,
      UnapproveBankExodusCompletionResolver,
      UnmarkBankExodusCompletionReviewedResolver,
      UpdateEmailAddressResolver,
      UpdateUsernameResolver,
      VerifyEmailAddressResolver,

      // Resolvers from '@generated/type-graphql are selectively included below...
      CreateCampaignResolver,
      CreateTagResolver,
      AggregateBankExodusCompletionResolver,
      FindManyCampaignResolver,
      FindUniqueBankExodusCompletionResolver,
      FindUniqueCampaignResolver,
      FindUniqueUserResolver,
      FindManyUserResolver,
      FindManyBankExodusCompletionResolver,
      FindManyTagResolver,
    ],
    authChecker: isAuthorized,
    validate: false,
  })

  return schema
}
