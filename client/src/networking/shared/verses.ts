import { configGraphQLSSR } from '../configGraphQLSSR'
import { VERSES } from '../graphql/query/Verses'
import type { VerseWhereInput } from '../../types/keystone/VerseWhereInput'
import type { VerseOrderByInput } from '../../types/keystone/VerseOrderByInput'
import type { Verse } from '../../types/Verse'

export type VersesInput = {
	where?: VerseWhereInput
	orderBy?: VerseOrderByInput[]
	take?: number
	skip?: number
}

export const verses = async ({ where, orderBy, take, skip }: VersesInput): Promise<Verse[]> => {
	try {
		const {
			data: { verses },
		} = await fetch(
			'/keystone',
			configGraphQLSSR({
				query: VERSES,
				variables: JSON.stringify({
					where,
					orderBy,
					take,
					skip,
				}),
			}),
		).then(async (response) => await response.json())

		return verses
	} catch (error) {
		console.error(error)
	}
}
