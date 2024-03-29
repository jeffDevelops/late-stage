<script lang="ts">
  import { onMount } from 'svelte'
  import { session } from '$app/stores'

  import InfiniteScroll from '../../components/InfiniteScroll.svelte'
  import Card from '../../components/Card.svelte'
  import CampaignFeedEmptyState from '../../components/CampaignFeedEmptyState.svelte'
  import FeedRepeatingElement from './FeedRepeatingElement.svelte'

  import { env } from '../../networking/env'
  import { gqlRequest } from '../../networking/gqlRequest'
  import { amazonPrimeCompletions } from '../../networking/graphql/query/AmazonPrimeCompletions'
  import BankExodusCompletionSkeletonLoader from '../BankCampaign/BankExodusCompletionSkeletonLoader.svelte'

  import type { AmazonPrimeCampaignCompletion } from '../../types/AmazonPrimeCampaign/AmazonPrimeCampaignCompletion'

  const PAGE_SIZE = 4
  const QUERY = amazonPrimeCompletions(
    `
      id
      ${
        $session.user
          ? `belongsToUser {
        id
        username
      }`
          : ''
      }
      ${
        $session.user?.isAdmin
          ? `
      reviewedByUser {
        id
        username
      }`
          : ''
      }
      wasReviewedByAdmin
      wasApprovedByAdmin
      createdAt
      cancellationImageURL
      membershipSelection
      cancellationAmount
      isAnonymous
    `,
  )

  /**
   * STATE
   */

  let loading = true
  let loadingMore = false

  // store all the data here.
  let data: AmazonPrimeCampaignCompletion[] = []
  // store the new batch of data here.
  let newBatch: AmazonPrimeCampaignCompletion[] = []

  let skip = 0

  onMount(async () => {
    const completions = await fetch(
      `${env.viteSveltekitHost}/proxy/amazon-prime-completions`,
      gqlRequest({
        query: QUERY,
        variables: {
          ...($session.user?.isAdmin
            ? {}
            : {
                where: {
                  OR: [
                    // Non-admin users can only see their own completions or ones that have been approved by an admin.
                    {
                      wasApprovedByAdmin: {
                        equals: true,
                      },
                    },
                    ...($session.user?.id
                      ? [
                          {
                            wasReviewedByAdmin: { equals: false },
                            belongsToUser: {
                              is: { id: { equals: $session.user?.id } },
                            },
                          },
                        ]
                      : []),
                  ],
                },
              }),
          take: PAGE_SIZE,
          skip,
          orderBy: [
            {
              createdAt: 'desc',
            },
          ],
        },
      }),
    ).then(async (response) => await response.json())

    data = completions
    loading = false
  })

  /**
   * REACTIVE
   */

  $: fetchMore = async () => {
    const newCompletions = await fetch(
      `${env.viteSveltekitHost}/proxy/amazon-prime-completions`,
      gqlRequest({
        query: QUERY,
        variables: {
          take: PAGE_SIZE,
          skip,
          orderBy: [
            {
              createdAt: 'desc',
            },
          ],
        },
      }),
    ).then(async (response) => await response.json())

    if (newCompletions.error) {
      loadingMore = false
      newBatch = []
      return
    }

    newBatch = newCompletions
    loadingMore = false
  }

  $: data = [...data, ...newBatch]
</script>

<main class="bank-campaign-feed">
  <Card>
    <section>
      {#if loading}
        <BankExodusCompletionSkeletonLoader />
        <BankExodusCompletionSkeletonLoader />
        <BankExodusCompletionSkeletonLoader />
      {:else if data.length === 0}
        <CampaignFeedEmptyState />
      {:else}
        {#each data as amazonPrimeCampaignCompletion, index}
          <FeedRepeatingElement index={index / skip} {amazonPrimeCampaignCompletion} />
        {/each}

        {#if loadingMore}
          <BankExodusCompletionSkeletonLoader />
          <BankExodusCompletionSkeletonLoader />
          <BankExodusCompletionSkeletonLoader />
        {/if}

        <InfiniteScroll
          hasMore={newBatch.length !== 0}
          threshold={50}
          on:loadMore={() => {
            loadingMore = true
            // Increment the page number
            skip += Math.min(data.length, PAGE_SIZE)
            // Fetch data
            fetchMore()
          }}
        />
      {/if}
    </section>
  </Card>
</main>

<style>
  section {
    height: calc(100vh - 516px);
    overflow: auto;
  }

  :global(.bank-campaign-feed .card) {
    padding: 16px;
  }

  @media only screen and (max-width: 1100px) {
    section {
      height: calc(100vh - 624px);
    }
  }

  @media screen and (max-width: 670px) {
    section {
      height: calc(100vh - 648px);
    }
  }

  @media screen and (max-width: 600px) {
    section {
      height: 100vh;
    }

    :global(.bank-campaign-feed > .card) {
      border-radius: 0;
      border-left: 0;
      border-right: 0;
      padding: 16px;
      width: calc(100% + 48px);
      margin: 0 auto;
      transform: translateX(-24px);
    }
  }
</style>
