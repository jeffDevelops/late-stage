import { client } from '../../networking/Client'
import { REDEEM_MAGIC_LINK } from '../../networking/graphql/mutation/RedeemMagicLink'
import type { Request, EndpointOutput } from '@sveltejs/kit/types'
import type { RedeemUserMagicAuthTokenInput } from '../confirming-email/load'
import { config as loadEnvVars } from 'dotenv'

loadEnvVars()

export const post = async ({
	body: { email, token },
}: Request<Record<string, unknown>, RedeemUserMagicAuthTokenInput>): Promise<EndpointOutput> => {
	try {
		const mutationResult = await client
			.mutation(REDEEM_MAGIC_LINK, {
				email,
				token,
			})
			.toPromise()

		return {
			status: 200,
			body: mutationResult.data.redeemUserMagicAuthToken,
			headers: {
				'set-cookie': `keystone-session=${
					mutationResult.data.redeemUserMagicAuthToken.token
				}; HttpOnly; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''} Domain=${
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
