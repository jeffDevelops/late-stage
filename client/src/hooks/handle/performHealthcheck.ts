import { isPageRequest } from '../utility/isPageRequest'
import { env } from '../../networking/env'

import type { HandleInput } from '.'
import type { LocalsImpl } from '..'

export const performHealthcheck = async ({
  resolve,
  event,
}: HandleInput<LocalsImpl>): Promise<Response> => {
  if (!isPageRequest(event)) return await resolve(event)
  console.log('getCurrentUser handle hook')

  console.log(`${env.viteSveltekitHost}/proxy/health-check`)

  const response = await fetch(`${env.viteHostAddress}/proxy/health-check`, {
    method: 'GET',
  })

  const deserialized = await response.json()

  if (deserialized?.error?.message === 'Could not connect to server') {
    event.locals.apiHealthy = false
    return await resolve(event)
  }

  event.locals.apiHealthy = true
  return await resolve(event)
}
