import {
  Authorized,
  Field,
  ObjectType,
  Query,
  Resolver,
  Ctx,
} from 'type-graphql'

import type { Context } from '../../types/Context'

@ObjectType()
class ImageKitAuthenticationParams {
  @Authorized()
  @Field()
  token: string

  @Authorized()
  @Field()
  expire: number // Unix timestamp

  @Authorized()
  @Field()
  signature: string
}

@Resolver()
export class ImageKitAuthenticationParamsResolver {
  @Authorized()
  @Query(() => ImageKitAuthenticationParams)
  imageKitAuthParams(
    @Ctx() { imageKit }: Context,
  ): ImageKitAuthenticationParams {
    return imageKit.getAuthenticationParameters()
  }
}
