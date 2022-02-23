import type { BaseEntity } from './BaseEntity'
import type { User } from './User'

export type Scalars = {
  conscientiousAboutHumanRights: boolean
  destinationInstitutionName: string
  dontChargeAccountFees: boolean
  dontInvestInFossilFuels: boolean
  dontInvestInSLABS: boolean
  isAnonymous: boolean
  offerFairRatesToAccountHolders: boolean
  originInstitutionName: string
  other: boolean
  otherInfo: string
  withdrawalAmount: number
  withdrawalReceiptImageURL: string
  wasApprovedByAdmin: boolean
  wasReviewedByAdmin: boolean
}

export type Associations = {
  belongsToUser: null | Partial<User>
  reviewedByUser: null | Partial<User>
}

export type BankExodusCampaignCompletion = BaseEntity & Partial<Scalars> & Partial<Associations>
