import { InputType, Field } from 'type-graphql'

/**
 * Abstract out the common properties of a RecordCampaignCompletionInput
 */
@InputType()
export abstract class CampaignScalars {
  @Field((_type) => String, { nullable: false })
  campaignId: string

  @Field((_type) => Boolean, { nullable: false })
  isAnonymous: boolean

  @Field((_type) => String, { nullable: false })
  imageKitFileId: string
}
