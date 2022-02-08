export const verifyEmailAddress = (subfields: string): string => `#graphql
mutation VerifyEmailAddress ($email: String!, $token: String!) {
  verifyEmailAddress(token: $token, email: $email) {
    ${subfields}
  }
}`
