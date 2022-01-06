import { configGraphQLSSR } from '../configGraphQLSSR'
import { HANDLE_VERSE_VOTE } from '../graphql/mutation/HandleVerseVote'
import { VoteTypes } from '../../types/VoteTypes'
import type { Verse } from '../../types/Verse'
import type { VerseVariant } from '../../types/VerseVariant'

export type HandleVerseVoteResponse<T extends Verse | VerseVariant> = {
	userIsNeutral: boolean
	upvotesCount: number
} & T

export const handleVerseVote = async <T extends Verse | VerseVariant>(
	verseId: string,
	voteType: VoteTypes = VoteTypes.Upvote,
	isOriginal = false,
): Promise<HandleVerseVoteResponse<T>> => {
	try {
		const {
			data: { handleVerseVote },
		} = await fetch(
			'/keystone',
			configGraphQLSSR({
				query: HANDLE_VERSE_VOTE,
				variables: JSON.stringify({
					verseId,
					voteType,
					isOriginal,
				}),
			}),
		).then(async (response) => await response.json())

		return handleVerseVote
	} catch (error) {
		console.error(error)
	}
}
