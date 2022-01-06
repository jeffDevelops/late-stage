import { client } from '../../networking/Client'
import { SEND_EMAIL_CONFIRMATION_EMAIL } from '../../networking/graphql/mutation/SendEmailConfirmationEmail'
import type { Request, EndpointOutput } from '@sveltejs/kit/types'

export const post = async ({
	body: { email },
}: Request<Record<string, unknown>, { email: string }>): Promise<EndpointOutput> => {
	try {
		const mutationResult = await client
			.mutation(SEND_EMAIL_CONFIRMATION_EMAIL, {
				email,
			})
			.toPromise()

		console.log({ mutationResult })

		return {
			status: 200,
			body: mutationResult.data,
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
