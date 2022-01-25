import { buildPostEndpoint } from '../../proxy/buildPostEndpoint'

import type { EndpointOutput } from '@sveltejs/kit'
import type { ErrorHandler } from '../../proxy/buildPostEndpoint'

const handleGraphQLErrors: ErrorHandler = (): void | EndpointOutput => undefined

export const post = buildPostEndpoint('logOut', handleGraphQLErrors, false)
