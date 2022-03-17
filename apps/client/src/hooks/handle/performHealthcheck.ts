import { isPageRequest } from '../utility/isPageRequest'
import { env } from '../../networking/env'

import type { HandleInput } from '.'
import type { LocalsImpl } from '..'

export const performHealthcheck = async ({
  resolve,
  event,
}: HandleInput<LocalsImpl>): Promise<Response> => {
  event.locals.apiHealthy = true

  /** Don't run healthcheck on SvelteKit prerenders (builds fail without this line) */
  if (event.url.hostname === 'sveltekit-prerender') return await resolve(event)
  if (!isPageRequest(event)) return await resolve(event)

  const response = await fetch(`${env.viteHostAddress}/proxy/health-check`, {
    method: 'GET',
  })

  const deserialized = await response.json()

  if (deserialized?.error?.message === 'Could not connect to server') {
    event.locals.apiHealthy = false
    return await resolve(event)
  }

  return await resolve(event)
}
