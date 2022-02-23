import type { GetSession, RequestEvent } from '@sveltejs/kit'
import type { LocalsImpl, SessionImpl } from '.'

export const getSession: GetSession<LocalsImpl, Record<string, any>, SessionImpl> = async ({
  locals: { user, apiHealthy },
}: RequestEvent<SessionImpl>) => ({
  user,
  apiHealthy,
})
