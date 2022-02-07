import { gqlRequest } from '../gqlRequest'
import { logOut as logOutMutation } from '../graphql/mutation/LogOut'
import { env } from '../env'
import { session } from '$app/stores'

export const logOut = async (): Promise<void> => {
  session.update((previous) => ({ ...previous, user: null }))

  await fetch(
    `${env.viteSveltekitHost}/proxy/log-out`,
    gqlRequest({
      query: logOutMutation,
    }),
  ).then(async (response) => await response.json())
}
