import { gqlRequest } from '../gqlRequest'
import { END_SESSION } from '../graphql/mutation/EndSession'

export const logout = async (): Promise<void> => {
  await fetch(
    '/keystone',
    gqlRequest({
      query: END_SESSION,
    }),
  ).then(async (response) => await response.json())
}
