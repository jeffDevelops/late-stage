export const authenticateUser = `#graphql
mutation AuthenticateUser ($authenticateUserInput: AuthenticateUserInput!) {
  authenticateUser(AuthenticateUserInput: $authenticateUserInput)
}`
