import type { BaseEntity } from './BaseEntity'
import type { CampaignStatuses } from './CampaignStatuses'

type Scalars = {
  title: string
  checklistTitle: string
  description: string
  status: CampaignStatuses

  what: string[] // array of paragraphs
  why: string[] // array of paragraphs
  outcomes: string[] // array of paragraphs

  // "Goal goalUnits goalVerb-ed by goalDeadline"
  goal: number
  goalUnit: string
  goalVerb?: string

  goalStartDate: string
  goalDeadline: string

  stats: {
    _sum: {
      withdrawalAmount: number
    }
  }

  // Admin / DX fields
  shortName: string // i.e., 'banks'
}

type Associations = {
  tags: {
    id: string
    name: string
  }[]
  _count: {
    usersThatDidCompleteCampaign: number
  }
  // ...
}

export type Campaign = BaseEntity & Partial<Scalars & Associations>
