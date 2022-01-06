export const REDEEM_MAGIC_LINK = `#graphql
  mutation RedeemUserMagicAuthToken($email: String!, $token: String!) {
    redeemUserMagicAuthToken(email: $email, token: $token) {
      ... on RedeemUserMagicAuthTokenSuccess {
        token
        item {
          id
          email
          emailConfirmed
          username
        }
      }

      ... on RedeemUserMagicAuthTokenFailure {
        code
        message
      }
    }
  }
`
