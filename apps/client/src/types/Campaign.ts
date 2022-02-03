import type { BaseEntity } from './BaseEntity'

type Scalars = {
  title: string
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

  // Admin / DX fields
  shortName: string // i.e., 'banks'
}

type Associations = {
  // ...
}

export type Campaign = BaseEntity & Partial<Scalars & Associations>
