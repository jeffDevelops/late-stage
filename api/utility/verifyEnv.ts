import dotenv from 'dotenv'

/**
 * Read .env file via dotenv and throw if any are missing before the app starts
 */
export const verifyEnv = () => {
  dotenv.config()

  if (!process.env.PORT)
    throw new Error('PORT was not present in environment variables at runtime.')

  if (!process.env.DATABASE_URL)
    throw new Error(
      'DATABASE_URL was not present in environment variables at runtime.',
    )

  if (!process.env.CORS_ORIGIN)
    throw new Error(
      'CORS_ORIGIN was not present in environment variables at runtime.',
    )

  if (!process.env.API_KEY)
    throw new Error(
      'API_KEY was not present in environment variables at runtime.',
    )
}
