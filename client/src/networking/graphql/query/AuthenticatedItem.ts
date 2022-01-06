export const AUTHENTICATED_ITEM = `#graphql
query AuthenticatedItem {
	authenticatedItem {
		... on User {
			id
			email
			emailConfirmed
			name
			membership
		}
	}
}
`
