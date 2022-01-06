import { configGraphQLSSR } from '../configGraphQLSSR'
import { VERSE } from '../graphql/query/Verse'
import type { VerseWhereUniqueInput } from '../../types/keystone/VerseWhereUniqueInput'
import type { Verse } from '../../types/Verse'

export const verse = async (where: VerseWhereUniqueInput): Promise<Verse> => {
	try {
		const {
			data: { verse },
		} = await fetch(
			'/keystone',
			configGraphQLSSR({
				query: VERSE,
				variables: JSON.stringify({
					where,
				}),
			}),
		).then(async (response) => await response.json())

		return verse
	} catch (error) {
		console.error(error)
	}
}
