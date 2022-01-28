export const updatePassword = `#graphql
mutation UpdatePassword ($password: String!, $token: String!, $email: String!) {
  updatePassword(password: $password, token: $token, email: $email)
}
`
