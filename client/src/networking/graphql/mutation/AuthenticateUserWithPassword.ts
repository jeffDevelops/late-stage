export const AUTHENTICATE_USER_WITH_PASSWORD = `#graphql
mutation authenticateUserWithPassword($email: String!, $password: String!) {
	authenticateUserWithPassword(email: $email, password: $password) {
		... on UserAuthenticationWithPasswordFailure {
			message
		}

		... on UserAuthenticationWithPasswordSuccess {
			sessionToken
			item {
				id
				email
				emailConfirmed
				username
			}
		}
	}
}`
