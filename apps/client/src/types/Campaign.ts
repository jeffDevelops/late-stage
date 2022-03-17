import type { BaseEntity } from './BaseEntity'
import type { CampaignStatuses } from './CampaignStatuses'
import type { WorksCited } from './WorksCited'

type Sum = {
  [key: string]: number
}

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
    _sum: Sum
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
  worksCited: WorksCited
  // ...
}

export type Campaign = BaseEntity & Partial<Scalars & Associations>
