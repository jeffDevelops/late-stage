import { performHealthcheck } from './performHealthcheck'
import { getCurrentUser } from './getCurrentUser'
import type { Handle, RequestEvent, ResolveOpts } from '@sveltejs/kit/types/hooks'
import { sequence } from '@sveltejs/kit/hooks'

export type HandleInput<Locals extends Record<string, unknown>> = {
  event: RequestEvent<Locals>
  resolve(event: RequestEvent<Locals>, opts?: ResolveOpts): Promise<Response>
}

export const handle: Handle = sequence(performHealthcheck, getCurrentUser)
