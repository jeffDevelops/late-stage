import { buildSchema } from 'type-graphql'
import { isAuthorized } from '../middleware/isAuthorized'

/** Resolvers (Generated) */
import {
  FindUniqueUserResolver,
  FindManyUserResolver,
} from '@generated/type-graphql'

/** Resolvers (Custom) */
import {
  RegisterUserResolver,
  AuthenticateUserResolver,
  SendUserConfirmationEmailResolver,
  VerifyEmailAddressResolver,
  RefreshAccessTokenResolver,
  LogOutResolver,
  // SendPasswordResetEmailResolver, // DISABLED
  // UpdatePasswordResolver, // DISABLED
  ExampleResolver,
  UpdateEmailAddressResolver,
  UpdateUsernameResolver,
} from '../resolvers/mutation'

import { CurrentUserResolver } from '../resolvers/query'

export const schema = async () =>
  await buildSchema({
    resolvers: [
      // Custom resolvers go here...
      RegisterUserResolver,
      AuthenticateUserResolver,
      SendUserConfirmationEmailResolver,
      VerifyEmailAddressResolver,
      RefreshAccessTokenResolver,
      LogOutResolver,
      CurrentUserResolver,
      // SendPasswordResetEmailResolver, // DISABLED
      // UpdatePasswordResolver, // DISABLED
      UpdateEmailAddressResolver,
      UpdateUsernameResolver,

      // TODO: remove
      ExampleResolver,

      // Resolvers from '@generated/type-graphql are selectively included below...
      FindUniqueUserResolver,
      FindManyUserResolver,
    ],
    authChecker: isAuthorized,
    validate: false,
  })
