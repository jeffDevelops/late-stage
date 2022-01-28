export const confirmUser = `#graphql
	mutation ConfirmUser($email: String!) {
		sendUserConfirmationEmail(email: $email)
	}
`
