import type { BaseEntity } from '../BaseEntity'
import type { CampaignCompletionScalars } from '../CampaignCompletionScalars'
import type { User } from '../User'

export type Scalars = CampaignCompletionScalars & {
  conscientiousAboutHumanRights: boolean
  destinationInstitutionName: string
  dontChargeAccountFees: boolean
  dontInvestInFossilFuels: boolean
  dontInvestInSLABS: boolean
  offerFairRatesToAccountHolders: boolean
  originInstitutionName: string
  other: boolean
  otherInfo: string
  withdrawalAmount: number
  withdrawalReceiptImageURL: string
}

export type Associations = {
  belongsToUser: null | Partial<User>
  reviewedByUser: null | Partial<User>
}

export type BankExodusCampaignCompletion = BaseEntity & Partial<Scalars> & Partial<Associations>
