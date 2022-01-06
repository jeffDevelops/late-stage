import { client } from '../../networking/Client'
import { AUTHENTICATED_ITEM } from '../../networking/graphql/query/AuthenticatedItem'
import type { EndpointOutput } from '@sveltejs/kit/types'
import { config as loadEnvVars } from 'dotenv'

const env = loadEnvVars()

export const post = async (): Promise<EndpointOutput> => {
	try {
		const queryResult = await client
			.query(
				AUTHENTICATED_ITEM,
				{},
				{
					fetchOptions: () => {
						const apiKey = env.parsed.KEYSTONE_API_KEY
						return {
							credentials: 'include',
							sameSite: 'lax',
							headers: {
								Authorization: `Bearer ${apiKey}`,
							},
						}
					},
				},
			)
			.toPromise()

		console.log({ queryResult })

		return {
			status: 200,
			body: queryResult.data.users,
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
