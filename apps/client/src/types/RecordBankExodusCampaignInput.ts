export type RecordBankExodusCampaignInput = {
  RecordBankExodusCompletionInput: {
    campaignId: string
    isAnonymous: boolean
    withdrawalReceiptImageURL: string
    imageKitFileId: string
    withdrawalAmount: number
    originInstitutionName: string
    destinationInstitutionName: string

    // Reasons for moving to this destination bank
    dontInvestInFossilFuels: boolean
    dontInvestInSLABS: boolean
    dontChargeAccountFees: boolean
    offerFairRatesToAccountHolders: boolean
    conscientiousAboutHumanRights: boolean
    other: boolean

    otherInfo: string
  }
}
