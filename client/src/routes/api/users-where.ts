import { client } from '../../networking/Client'
import { USERS_WHERE } from '../../networking/graphql/query/UsersWhere'
import type { Request, EndpointOutput } from '@sveltejs/kit/types'
import type { UserWhereInput } from '../../types/keystone/UserWhereFilter'

export const post = async ({
	body,
}: Request<Record<string, unknown>, UserWhereInput>): Promise<EndpointOutput> => {
	try {
		const queryResult = await client
			.query(
				USERS_WHERE,
				{
					where: body,
				},
				{
					requestPolicy: 'network-only',
				},
			)
			.toPromise()

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
