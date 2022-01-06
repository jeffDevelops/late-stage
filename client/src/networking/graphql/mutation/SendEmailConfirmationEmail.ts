import { gql } from '@urql/core'

export const SEND_EMAIL_CONFIRMATION_EMAIL = gql`
	mutation SendUserMagicAuthLink($email: String!) {
		sendUserMagicAuthLink(email: $email)
	}
`
