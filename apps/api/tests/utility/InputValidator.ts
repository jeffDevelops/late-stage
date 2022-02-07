import { InputValidator } from '../../src/utility/InputValidator'
import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { req } from '../../test-utils/fixtures/FastifyRequest'

test('InputValidator reliably validates email addresses', () => {
  const validEmailAddresses = ['jeff@gmail.com', 'j@g.c', 'jeff+1@gmail.com']

  validEmailAddresses.forEach((email: string) => {
    assert.not.throws(() => InputValidator.validateEmail(email, req as any))
  })

  const invalidEmailAddresses = [
    '',
    'invalid format',
    'jeff.com',
    '@gmail.com',
    '<script>alert("hello world");</script>',
    '<img onload="alert("hacked u");" />',
  ]

  invalidEmailAddresses.forEach((alleged: string) => {
    assert.throws(() => InputValidator.validateEmail(alleged, req as any))
  })
})

test('InputValidator reliably validates username', () => {
  const invalidUsernames = [
    '',
    'a',
    '.invalid.separator',
    'invalid.separator.',
    '_invalid.separator',
    'invalid.separator_',
    '!n^@|!D(#@R^(*RS',
    '<script>alert("hello world");</script>',
    '<img onload="alert("hacked u");" />',
  ]

  invalidUsernames.forEach((alleged: string) => {
    assert.throws(() => InputValidator.validateUsername(alleged, req as any))
  })

  const validUsernames = ['ab', 'valid.separator', 'valid_separator', 'abc123']

  validUsernames.forEach((username: string) => {
    assert.not.throws(() =>
      InputValidator.validateUsername(username, req as any),
    )
  })
})

test('InputValidator reliably validates password', () => {
  const invalidPasswords = [
    '',
    '1',
    '12',
    '123',
    '1234',
    '12345',
    '123456',
    '1234567',
    '1234567',
    '<script>alert("hello world");</script>',
    '<img onload="alert("hacked u");" />',
  ]

  invalidPasswords.forEach((alleged: string) => {
    assert.throws(() => InputValidator.validatePassword(alleged, req as any))
  })

  assert.not.throws(() =>
    InputValidator.validatePassword('12345678', req as any),
  )
})

test.run()
