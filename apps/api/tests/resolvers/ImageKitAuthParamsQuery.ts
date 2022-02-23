import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { gqlRequestInit, request } from '../../test-utils/gqlRequest'
import { setup, refreshAccessToken } from '../../test-utils/authenticate/setup'
import { teardown } from '../../test-utils/authenticate/teardown'

export const imageKitAuthParamsQuery = `#graphql
query ImageKitAuthParams {
  imageKitAuthParams {
    token
    expire
    signature
  }
}
`

test('ImageKitAuthParamsResolver returns an authentication object for consumption on the client, when user is authorized', async () => {
  await setup()
  const cookie = await refreshAccessToken()

  const init = gqlRequestInit(
    {
      query: imageKitAuthParamsQuery,
    },
    {
      cookie,
    },
  )

  const res = await request(init)

  assert.ok(res.data.imageKitAuthParams.token)
  assert.ok(res.data.imageKitAuthParams.expire)
  assert.ok(res.data.imageKitAuthParams.signature)
  assert.is(res.errors, undefined)

  await teardown()
})

test('ImageKitAuthParamsResolver fails when user not authorized', async () => {
  const requestInit = await gqlRequestInit({
    query: imageKitAuthParamsQuery,
  })

  const res = await request(requestInit)

  assert.is(
    res.errors.some(
      ({ message }: { message: string }) =>
        message === 'Unauthorized - no __Host-a cookie',
    ),
    true,
  )
  assert.is(res.data, null)
})

test.run()
