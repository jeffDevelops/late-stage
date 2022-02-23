export const banUser = `#graphql
mutation BanUser($id: String!) {
  banUser(id: $id)
}
`
