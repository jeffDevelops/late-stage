import dotenv from 'dotenv'

/**
 * Read .env file via dotenv and throw if any are missing before the app starts
 */
export const verifyEnv = (): void | never => {
  dotenv.config()

  const message = (key: string) =>
    `${key} was not present in environment variables at runtime.`

  if (!process.env.PORT) throw new Error(message('PORT'))
  if (!process.env.DATABASE_URL) throw new Error(message('DATABASE_URL'))
  if (!process.env.CORS_ORIGIN) throw new Error(message('CORS_ORIGIN'))
  if (!process.env.API_KEY) throw new Error(message('API_KEY'))
  if (!process.env.TOKEN_SECRET) throw new Error(message('TOKEN_SECRET'))
  if (!process.env.COOKIE_SECRET) throw new Error(message('COOKIE_SECRET'))

  // Third-party
  if (!process.env.SENDGRID_API_KEY)
    throw new Error(message('SENDGRID_API_KEY'))
  if (!process.env.IMAGEKIT_PUBLIC_KEY)
    throw new Error(message('IMAGEKIT_PUBLIC_KEY'))
  if (!process.env.IMAGEKIT_PRIVATE_KEY)
    throw new Error(message('IMAGEKIT_PRIVATE_KEY'))
  if (!process.env.RECAPTCHA_SECRET_KEY)
    throw new Error(message('RECAPTCHA_SECRET_KEY'))
}
