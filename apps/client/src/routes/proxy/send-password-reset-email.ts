import { buildPostEndpoint } from '../../proxy/buildPostEndpoint'

export const post = buildPostEndpoint('sendPasswordResetEmail', null, false)
