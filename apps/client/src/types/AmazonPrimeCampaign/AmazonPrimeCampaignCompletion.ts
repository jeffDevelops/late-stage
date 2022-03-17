import type { BaseEntity } from '../BaseEntity'
import type { CampaignCompletionScalars } from '../CampaignCompletionScalars'
import type { User } from '../User'

export type Scalars = CampaignCompletionScalars & {
  cancellationImageURL: string
  imageKitFileId: string
  membershipSelection: string
  cancellationAmount: number

  // Reasons for cancelling Amazon Prime
  environmentalConcerns: boolean
  antiCompetitionConcerns: boolean
  workersRightsConcerns: boolean
  marketplaceAntitrustConcerns: boolean
  otherInfo: string
}

export type Associations = {
  belongsToUser: null | Partial<User>
  reviewedByUser: null | Partial<User>
}

export type AmazonPrimeCampaignCompletion = BaseEntity & Partial<Scalars> & Partial<Associations>
