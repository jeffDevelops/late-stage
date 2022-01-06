import { client } from '../../networking/Client'
import { SEND_PASSWORD_RESET_EMAIL } from '../../networking/graphql/mutation/SendPasswordResetEmail'
import type { Request, EndpointOutput } from '@sveltejs/kit/types'

export const post = async ({
	body: { email },
}: Request<Record<string, unknown>, { email: string }>): Promise<EndpointOutput> => {
	try {
		const mutationResult = await client
			.mutation(SEND_PASSWORD_RESET_EMAIL, {
				email,
			})
			.toPromise()

		return {
			status: 200,
			body: mutationResult.data,
		}
	} catch (error) {
		console.error({ error })
		console.error(error.networkError.result)

		return {
			status: 500,
			body: {
				error,
			},
		}
	}
}
