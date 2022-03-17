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

export type WorksCited = WebsiteCitation[]
// | ... other citation types
