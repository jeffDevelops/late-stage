export const authenticateUser = (subfields: string): string => `#graphql
mutation AuthenticateUser ($authenticateUserInput: AuthenticateUserInput!) {
  authenticateUser(AuthenticateUserInput: $authenticateUserInput) {
		${subfields}
	}
}`
