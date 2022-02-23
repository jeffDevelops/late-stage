import { readFileSync } from 'fs'
import { join } from 'path'
import * as assert from 'uvu/assert'
import { test } from 'uvu'
import dotenv from 'dotenv'
import sinon from 'sinon'
import { verifyEnv } from '../../src/utility/verifyEnv'

const EXPECTED_KEYS = [
  'PORT',
  'DATABASE_URL',
  'CORS_ORIGIN',
  'API_KEY',
  'TOKEN_SECRET',
  'COOKIE_SECRET',

  // Third-party
  'SENDGRID_API_KEY',
  // 'IMAGEKIT_PUBLIC_KEY',
  // 'IMAGEKIT_PRIVATE_KEY',
  'RECAPTCHA_SECRET_KEY',
]

// Save the contents of the .env in memory to be replaced at the end of the test suite
const env = readFileSync(join(__dirname, '../../.env'), { encoding: 'utf8' })

const valueForKey = (key: string): string | undefined => {
  const kvs = env.split('\n')
  const indexOfKey = kvs.findIndex((kvPair) => kvPair.startsWith(`${key}=`))

  if (indexOfKey !== -1 && kvs[indexOfKey])
    return kvs[indexOfKey].replace(/^(.*)=/, '')
}

test.before(() => {
  sinon.stub(dotenv, 'config').callsFake(() => ({}))
})

test.after(() => {
  sinon.restore()
})

test('Throws error when expected keys are not all present', () => {
  EXPECTED_KEYS.forEach((key) => {
    // SETUP
    delete process.env[key]

    assert.throws(
      verifyEnv,
      new RegExp(`${key} was not present in environment variables at runtime.`),
    )

    // CLEANUP
    process.env[key] = valueForKey(key)
  })
})

test.run()
