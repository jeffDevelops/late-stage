export const sendPasswordResetEmail = `#graphql
  mutation SendPasswordResetEmail($email: String!) {
    sendPasswordResetEmail(email: $email)
  }
`
