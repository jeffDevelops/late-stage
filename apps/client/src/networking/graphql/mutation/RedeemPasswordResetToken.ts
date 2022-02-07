export const REDEEM_PASSWORD_RESET_TOKEN = `#graphql
  mutation RedeemPasswordResetToken ($email: String!, $token: String!, $password: String!) {
    redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
      code
      message
    }
  }
`
