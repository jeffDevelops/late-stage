export enum CampaignStatuses {
  NotStarted = 'NOT_STARTED', // Campaign is not yet started
  Active = 'ACTIVE', // Campaign is visible under "Current Campaigns" on index page
  Open = 'OPEN', // Users may still participate in the Campaign, but it is not featured under "Current Campaigns" on index page
  Closed = 'CLOSED', // Users may no longer participate in the Campaign
}
