import type { User } from './User'

export type BaseEntity = {
  id: string
  createdAt: string
  createdBy: User
  updatedAt: string
  updatedBy: User
}
