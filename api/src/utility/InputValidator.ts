import jwt, { JwtPayload } from 'jsonwebtoken'
import type { FastifyRequest } from 'fastify'
import { ErrorWithProps } from './ErrorWithProps'
import sanitize from 'sanitize-html'

export abstract class InputValidator {
  public static validateUsername(
    username: string,
    req: FastifyRequest,
  ): true | never {
    this.refuseUnsanitary(username, 'USERNAME', req)

    if (!username) {
      throw new ErrorWithProps(`Username must not be empty`)
    }

    if (username.length < 2) {
      throw new ErrorWithProps(
        `Username must be at least 2 characters; received "${username}"`,
      )
    }

    if (
      !username.match(
        /^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      )
    ) {
      throw new ErrorWithProps(
        `Username must be alphanumeric. Periods and underscores may only be used as separators. Received "${username}"`,
      )
    }

    return true
  }

  public static validateEmail(
    email: string,
    req: FastifyRequest,
  ): true | never {
    this.refuseUnsanitary(email, 'EMAIL', req)

    if (!email) {
      throw new ErrorWithProps('Email address is required')
    }

    if (
      !email.match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      )
    ) {
      throw new ErrorWithProps(
        `Email address format invalid: received "${email}"`,
      )
    }

    return true
  }

  public static validatePassword(
    password: string,
    req: FastifyRequest,
  ): true | never {
    this.refuseUnsanitary(password, 'PASSWORD', req)

    if (!password) {
      throw new ErrorWithProps('Password is required')
    }

    if (password.length < 8) {
      throw new ErrorWithProps(
        `Password must be at least 8 characters in length; received ${password.length} characters`,
      )
    }

    return true
  }

  public static verifyJWT(
    token: string,
    req: FastifyRequest,
  ): JwtPayload | never {
    this.refuseUnsanitary(token, 'TOKEN', req)

    try {
      return jwt.verify(token, process.env.TOKEN_SECRET!)
    } catch (error) {
      this.handleJWTError(error, token)
    }
  }

  private static handleJWTError(error: any, token: string): never {
    if (error.message === 'invalid token')
      throw new ErrorWithProps('JWT invalid')

    if (error.message === 'jwt malformed')
      throw new ErrorWithProps('JWT malformed')

    if (error.message === 'jwt must be provided')
      throw new ErrorWithProps(`JWT was not provided; received empty string`)

    if (error.message === 'jwt expired')
      throw new ErrorWithProps(
        'JWT expired. Please send yourself another confirmation email and try again.',
      )

    if (error.message === 'invalid signature')
      throw new ErrorWithProps('JWT signature invalid')

    throw new ErrorWithProps('An unknown error occurred')
  }

  private static refuseUnsanitary(
    original: string,
    fieldName: string,
    req: FastifyRequest,
  ): never | void {
    if (
      sanitize(original, {
        allowedTags: [],
        allowedAttributes: {},
      }) !== original
    ) {
      console.group(`------------- Unsanitary input -------------`)
      console.group(`Value: "${original}`)
      console.group(`Field: ${fieldName}`)
      console.group(`IP Address: ${req.socket.remoteAddress}`)
      console.group(`Query: ${(req.body as any).query}`)
      console.group(`Variables: ${(req.body as any).variables}`)
      console.group('--------------------------------------------')
      console.groupEnd()

      throw new ErrorWithProps(`Invalid input. Received: "${original}"`)
    }
  }
}
