export { handle } from './handle'
export { getSession } from './getSession'

import type { User } from 'src/types/User'

export type SessionImpl = {
  user: User
  apiHealthy: boolean
}

export type LocalsImpl = Partial<SessionImpl>
