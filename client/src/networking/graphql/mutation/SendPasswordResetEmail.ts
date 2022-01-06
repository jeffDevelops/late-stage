export const SEND_PASSWORD_RESET_EMAIL = `#graphql
  mutation SendPasswordResetEmail($email: String!) {
    sendUserPasswordResetLink(email: $email)
  }
`
