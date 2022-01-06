import dotenv from 'dotenv'

dotenv.config()

export const gqlRequest = <T>(data?: T): RequestInit => {
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
