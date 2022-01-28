import dotenv from 'dotenv'

dotenv.config()

export type PrivateEnv = {
  apiHost: string
  apiPath: string
  apiKey: string
}

const verifyEnv = () => {
  if (!process.env.API_KEY)
    throw new Error('API_KEY not present in environment variables at runtime.')

  if (!process.env.API_PATH)
    throw new Error('API_PATH not present in environment variables at runtime.')

  if (!process.env.API_HOST)
    throw new Error('API_HOST not present in environment variables at runtime.')
}

export const env: PrivateEnv = (() => {
  verifyEnv()

  return {
    apiKey: process.env.API_KEY,
    apiPath: process.env.API_PATH,
    apiHost: process.env.API_HOST,
  }
})()
