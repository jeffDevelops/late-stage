import { client } from '../../networking/Client'
import { CREATE_USER } from '../../networking/graphql/mutation/CreateUser'
import type { Request, EndpointOutput } from '@sveltejs/kit/types'

export interface CreateUserInput {
	name: string
	email: string
	password: string
}

export const post = async ({
	body: { name, email, password }
}: Request<Record<string, unknown>, CreateUserInput>): Promise<EndpointOutput> => {
	try {
		const mutationResult = await client
			.mutation(CREATE_USER, {
				data: {
					name,
					email,
					password
				}
			})
			.toPromise()

		return {
			status: 200,
			body: mutationResult.data.createUser
		}
	} catch (error) {
		console.log({ error })
		console.log(error.networkError.result)

		return {
			status: 500,
			body: {
				error
			}
		}
	}
}
