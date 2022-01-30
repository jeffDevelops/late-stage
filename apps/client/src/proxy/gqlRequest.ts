import { env } from './env'

export const gqlRequest = <T>(body?: T, headers: HeadersInit = {}): [string, RequestInit] => {
  return [
    `${env.apiHost}${env.apiPath}`,
    {
      mode: 'cors' as RequestMode,
      credentials: 'include' as RequestCredentials,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${env.apiKey}`,
        ...headers,
      },
      body: body ? JSON.stringify(body) : JSON.stringify({}),
    },
  ]
}
