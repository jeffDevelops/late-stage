export type Scalars = {
  id: string
  username: string
  email: string
  emailIsVerified: boolean
  banned: boolean
  isAdmin: boolean
  createdAt: Date
}

export type Associations = {
  // TODO:
}

export type User = Partial<Scalars> & Partial<Associations>
