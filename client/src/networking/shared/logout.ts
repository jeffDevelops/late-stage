import { gqlRequest } from '../gqlRequest'
import { logOut as logOutMutation } from '../graphql/mutation/LogOut'
import { env } from '../env'

export const logOut = async (): Promise<void> => {
  await fetch(
    `${env.viteSveltekitHost}/proxy/log-out`,
    gqlRequest({
      query: logOutMutation,
    }),
  ).then(async (response) => await response.json())
}
