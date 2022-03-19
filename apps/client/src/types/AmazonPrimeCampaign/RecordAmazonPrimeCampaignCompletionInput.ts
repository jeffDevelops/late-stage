export enum MembershipSelections {
  Annually = 'Annual',
  Monthly = 'Monthly',
  PrimeVideo = 'Prime Video',
  StudentMonthly = 'Student Monthly',
  StudentAnnually = 'Student Annual',
  Discounted = 'Discounted',
}

export type RecordAmazonPrimeCampaignCompletionInput = {
  RecordAmazonPrimeCompletionInput: {
    campaignId: string
    isAnonymous: boolean
    cancellationImageURL: string
    imageKitFileId: string
    membershipSelection: MembershipSelections

    // Reasons for cancelling Amazon Prime
    environmentalConcerns: boolean
    antiCompetitionConcerns: boolean
    workersRightsConcerns: boolean
    marketplaceAntitrustConcerns: boolean
    otherInfo: string
  }
}
