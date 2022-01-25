import {
  Resolver,
  Authorized,
  Query,
  ObjectType,
  Field,
  Mutation,
} from 'type-graphql'

@ObjectType()
class ExampleObject {
  @Field()
  publicField: string

  @Authorized()
  @Field()
  authorizedField: string

  @Authorized(['ADMIN', 'MODERATOR'])
  @Field({ nullable: true })
  adminField?: string
}
@Resolver()
export abstract class ExampleResolver {
  @Query()
  publicQuery(): ExampleObject {
    return {
      publicField: 'Anyone can see this',
      authorizedField: 'Only authorized users can see this',
      adminField: 'Only admins and moderators can see this',
    }
  }

  @Authorized()
  @Query()
  authedQuery(): string {
    return 'Authorized users only!'
  }

  @Authorized('ADMIN', 'MODERATOR')
  @Mutation()
  adminMutation(): string {
    return 'You are an admin / moderator, you can safely drop the database ;)'
  }
}
