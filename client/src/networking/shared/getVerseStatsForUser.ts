import { configGraphQLSSR } from '../configGraphQLSSR'
import { GET_VERSE_STATS_FOR_USER } from '../graphql/query/VerseStatsForUser'

export type GetVerseStatsForUser = {
	userDidUpvote: boolean
	userDidDownvote: boolean
}

export const getVerseStatsForUser = async (
	verseId: string,
	isOriginal = false,
): Promise<GetVerseStatsForUser> => {
	try {
		const {
			data: { verseStatsForUser },
		} = await fetch(
			'/keystone',
			configGraphQLSSR({
				query: GET_VERSE_STATS_FOR_USER,
				variables: JSON.stringify({
					verseId,
					isOriginal,
				}),
			}),
		).then(async (response) => await response.json())

		return verseStatsForUser
	} catch (error) {
		console.error(error)
	}
}
