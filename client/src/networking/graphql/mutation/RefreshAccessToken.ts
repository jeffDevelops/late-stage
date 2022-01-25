export const refreshAccessToken = (subfields: string): string => `#graphql
mutation RefreshAccessToken {
  refreshAccessToken {
    ${subfields}
	}
}
`
