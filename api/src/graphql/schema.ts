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
  ExampleResolver,
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

      // TODO: remove
      ExampleResolver,

      // Resolvers from '@generated/type-graphql are selectively included below...
      FindUniqueUserResolver,
      FindManyUserResolver,
    ],
    authChecker: isAuthorized,
    validate: false,
  })
