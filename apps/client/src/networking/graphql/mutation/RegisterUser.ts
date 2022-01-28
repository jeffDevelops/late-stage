export const registerUser = `#graphql
mutation RegisterUser($userRegistrationInput: UserRegistrationInput!) {
  registerUser(UserRegistrationInput: $userRegistrationInput)
}
`
