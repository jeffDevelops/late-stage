import { session } from '$app/stores'
import { gqlRequest } from '../gqlRequest'
import { logOut as logOutMutation } from '../graphql/mutation/LogOut'
import { env } from '../env'
import { LocalStorageKeys } from '../../types/LocalStorageKeys'

export const logOut = async (): Promise<void> => {
  session.update((previous) => ({ ...previous, user: null, refreshCookie: null }))

  // Clear out pertinent local storage values
  localStorage.removeItem(LocalStorageKeys.BankCampaignSubmissionsCount)

  await fetch(
    `${env.viteSveltekitHost}/proxy/log-out`,
    gqlRequest({
      query: logOutMutation,
    }),
  ).then(async (response) => await response.json())
}
