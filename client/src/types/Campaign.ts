import type { BaseEntity } from './BaseEntity'

type Scalars = {
  shortName: string
  description: string

  what: string[] // array of paragraphs
  why: string[] // array of paragraphs
  outcomes: string[] // array of paragraphs

  // "Goal goalUnits goalVerb-ed by goalDeadline"
  goal: number
  goalUnit: string
  goalVerb?: string

  goalStartDate: string
  goalDeadline: string

  realizedValue: number
}

type Associations = {
  // ...
}

export type Campaign = BaseEntity & Partial<Scalars & Associations>
