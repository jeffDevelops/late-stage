import type { RequestEvent } from '@sveltejs/kit/types/hooks'

export const isPageRequest = ({ request, url }: RequestEvent): boolean => {
  return (
    !url.pathname.startsWith('/proxy') && request.headers.get('Content-Type') !== 'application/json'
  )
}
