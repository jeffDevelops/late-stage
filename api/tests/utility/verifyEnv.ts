import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import * as assert from 'uvu/assert'
import { test } from 'uvu'
import dotenv from 'dotenv'
import sinon from 'sinon'

const EXPECTED_KEYS = ['PORT', 'DATABASE_URL', 'CORS_ORIGIN', 'API_KEY']

import { verifyEnv } from '../../utility/verifyEnv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
