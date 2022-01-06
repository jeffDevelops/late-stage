import { client } from '../../networking/Client'
import { AUTHENTICATE_USER_WITH_PASSWORD } from '../../networking/graphql/mutation/AuthenticateUserWithPassword'
import type { Request, EndpointOutput } from '@sveltejs/kit/types'
import type { AuthenticateUserWithEmailAndPasswordInput } from '../../types/keystone/AuthenticateUserWithEmailAndPasswordInput'
import { config as loadEnvVars } from 'dotenv'

loadEnvVars()

export const post = async ({
	body: { email, password },
}: Request<
	Record<string, unknown>,
	AuthenticateUserWithEmailAndPasswordInput
>): Promise<EndpointOutput> => {
	try {
		const mutationResult = await client
			.mutation(AUTHENTICATE_USER_WITH_PASSWORD, {
				email,
				password,
			})
			.toPromise()

		console.log(mutationResult.data.authenticateUserWithPassword)

		return {
			status: 200,
			body: mutationResult.data,
			headers: {
				'set-cookie': `keystone-session=${
					mutationResult.data.authenticateUserWithPassword.sessionToken
				}; HttpOnly; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}; Domain=${
					process.env.VITE_DOMAIN
				};`,
			},
		}
	} catch (error) {
		console.log({ error })
		console.log(error.networkError.result)

		return {
			status: 500,
			body: {
				error,
			},
		}
	}
}
