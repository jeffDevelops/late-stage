import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { request } from '../../test-utils/gqlRequest'
import { queryTestUser, EMAIL } from '../../test-utils/authenticate/setup'

const QUERY = `
query UserWhere($userWhereUniqueInput: UserWhereUniqueInput!) {
  user(where: $userWhereUniqueInput) {
    id
  }
}
`

const VARIABLES = {
  userWhereUniqueInput: {
    email: EMAIL,
  },
}

test('clientHasBearerToken unauthorizes clients that do not send Authorization token', async () => {
  const requestInit = <T>(data?: T): RequestInit => ({
    mode: 'cors' as RequestMode,
    credentials: 'include' as RequestCredentials,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',

      // -- OMIT AUTH HEADER --
    },
    body: data ? JSON.stringify(data) : JSON.stringify({}),
  })

  const response = await request(
    requestInit({
      query: QUERY,
      variables: VARIABLES,
    }),
  )

  assert.equal(response.data, undefined)
  assert.equal(response.statusCode, 401)
  assert.equal(response.message, 'Unauthorized client')
})

test('clientHasBearerToken authorizes clients that DO send Authorization header', async () => {
  /**
   * Manually construct RequestInit here in case test-util implementation changes
   */

  const requestInit = <T>(data?: T): RequestInit => ({
    mode: 'cors' as RequestMode,
    credentials: 'include' as RequestCredentials,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',

      // -- INCLUDE AUTH HEADER --
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: data ? JSON.stringify(data) : JSON.stringify({}),
  })

  const response = await request(
    requestInit({
      query: QUERY,
      variables: VARIABLES,
    }),
  )

  assert.equal(response.errors, undefined)
})

test.run()
