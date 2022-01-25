import dotenv from 'dotenv'
import fetch from 'isomorphic-fetch'

dotenv.config()

export const gqlRequestInit = <T>(data?: T): RequestInit => {
  return {
    mode: 'cors' as RequestMode,
    credentials: 'include' as RequestCredentials,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: data ? JSON.stringify(data) : JSON.stringify({}),
  }
}

export const request = async (
  requestInit: RequestInit,
  deserialize: boolean = true,
) => {
  const response = await fetch(
    `http://localhost:${process.env.TEST_PORT}/graphql`,
    requestInit,
  )

  if (deserialize) return await response.json()
  return response
}
