export const updateUsername = (subfields: string): string => `#graphql
  mutation UpdateUsername($newUsername: String!) {
    updateUsername(newUsername: $newUsername) {
      ${subfields}
    }
  }
`
