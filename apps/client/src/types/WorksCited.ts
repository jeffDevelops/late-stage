import type { BaseEntity } from './BaseEntity'
import type { Campaign } from './Campaign'

type BaseWorksCited = {
  authorLastName: string
  authorFirstInitial?: string
  authorLastName2?: string
  authorFirstInitial2?: string
  authorLastName3?: string
  authorFirstInitial3?: string

  publicationYear: string
  publicationMonth: string
  publicationDate?: string

  title: string
  publicationName: string
}

type WebsiteCitation = BaseWorksCited & {
  hyperlink: string
}

export type Scalars = WebsiteCitation
// | ... other citation types

export type Associations = {
  campaign?: Partial<Campaign>
}

export type WorkCited = BaseEntity & Partial<Associations> & Scalars
