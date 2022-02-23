import type { Campaign } from './Campaign'

export type Scalars = {
  id: string
  name: string
}

export type Associations = {
  campaigns: Campaign[]
}

export type Tag = Partial<Scalars> & Partial<Associations>
