import { test } from 'uvu'
import * as assert from 'uvu/assert'
import dayjs from 'dayjs'
import { prisma } from '../../prisma/prisma.config'
import {
  registerUser,
  authenticateUser,
} from '../../test-utils/authenticate/setup'
import { teardown } from '../../test-utils/authenticate/teardown'
import { gqlRequestInit, request } from '../../test-utils/gqlRequest'

test.before.each(async () => {
  await registerUser()
})

test.after.each(async () => {
  await teardown()
})

const logOutMutation = `#graphql
mutation LogOutMutation {
  logOut
}`

const refreshAccessTokenMutation = `#graphql
mutation RefreshAccessToken {
  refreshAccessToken
}`

test('LogOutMutation fails if not logged in', async () => {
  const init = gqlRequestInit({
    query: logOutMutation, // Don't pass cookie header
  })

  const response = await request(init)

  assert.is(response.errors[0].message, 'Unauthorized - no __Host-r cookie')
})

test('LogOutMutation succeeds if user logged in', async () => {
  /**
   * Log the user in. Store the refresh cookie.
   */

  const authResponse = await authenticateUser(undefined, false)
  const refreshCookie = authResponse.headers.get('set-cookie')

  /**
   * Furnish an access cookie for log out to work.
   */

  const refreshInit = gqlRequestInit(
    {
      query: refreshAccessTokenMutation,
    },
    { cookie: refreshCookie },
  )

  const refreshResponse1 = await request(refreshInit, false)
  const accessCookie = refreshResponse1.headers.get('set-cookie')

  /**
   * Get the latest expired refresh token before log out is called.
   */
  const [latestExpiredTokenBefore] =
    await prisma.artificiallyExpiredRefreshToken.findMany({
      orderBy: {
        actualExpiration: 'desc',
      },
      take: 1,
    })

  /**
   * Log the user out.
   */

  const logoutInit = gqlRequestInit(
    {
      query: logOutMutation,
    },
    { cookie: [accessCookie, refreshCookie].join('; ') },
  )
  const response = await request(logoutInit)

  const currentTime = dayjs()

  assert.is(response.data.logOut, true)

  /**
   * Ensure that the access token has been artificially invalidated by recording it in the db.
   * Because it's impossible to inject a specific JWT that's queryable in this table, we'll
   * just ensure that latest one recorded before the test's logout is called is no longer the
   * latest one after the test's logout.
   */

  const [latestExpiredTokenAfter] =
    await prisma.artificiallyExpiredRefreshToken.findMany({
      orderBy: {
        actualExpiration: 'desc',
      },
      take: 1,
    })

  /**
   * If there ISN'T an old one, ensure that the latest one is newer than the date
   * snapshotted before the test's logout was called.
   */
  if (!latestExpiredTokenBefore) {
    assert.is(
      currentTime.isBefore(dayjs(latestExpiredTokenAfter.actualExpiration)),
      true,
    )
    /**
     * Otherwise, ensure that the latest one is newer than the latest one
     * snapshotted before the test's logout was called.
     */
  } else {
    assert.is(
      dayjs(latestExpiredTokenBefore.actualExpiration).isBefore(
        dayjs(latestExpiredTokenAfter.actualExpiration),
      ),
      true,
    )
  }

  /**
   * Clean up ArtificiallyExpiredRefreshTokens
   */
  await Promise.all([
    ...(!latestExpiredTokenBefore
      ? []
      : [
          prisma.artificiallyExpiredRefreshToken.delete({
            where: {
              id: latestExpiredTokenBefore.id,
            },
          }),
        ]),
    prisma.artificiallyExpiredRefreshToken.delete({
      where: {
        id: latestExpiredTokenAfter.id,
      },
    }),
  ])
})

test.run()
