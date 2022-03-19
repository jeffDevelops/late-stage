<script lang="ts" context="module">
  import { env } from '../../networking/env'
  import { gqlRequest } from '../../networking/gqlRequest'
  import { campaignWhereUniqueInput } from '../../networking/graphql/query/CampaignWhereUniqueInput'

  export const load = async ({ params, fetch }) => {
    const response = await fetch(
      `${env.viteSveltekitHost}/proxy/unique-campaign`,
      gqlRequest({
        variables: {
          where: {
            id: params.id,
          },
        },
        query: campaignWhereUniqueInput(
          `
            id
            createdAt
            updatedAt
            status
            title
            checklistTitle # needed for success modal
            goal
            goalUnit
            goalVerb
            goalStartDate
            goalDeadline
            what
            why
            outcomes
            shortName
            tags {
              id
              name
            }
            worksCited {
              id
              title
              authorFirstInitial
              authorLastName
              authorFirstInitial2
              authorLastName2
              authorFirstInitial3
              authorLastName3
              publicationDate
              publicationMonth
              publicationYear
              publicationName
              hyperlink
            }
            _count {
              usersThatDidCompleteCampaign
            }
            stats {
              ... on AggregateBankExodusCompletion {
                _sum {
                  withdrawalAmount
                }
              }
              ... on AggregateAmazonPrimeCompletion {
                _sum {
                  cancellationAmount
                }
              }
            }
          `,
        ),
      }),
    )

    const campaign = await response.json()

    if (!campaign) {
      return {
        status: 404,
        error: 'The campaign that you are looking for does not exist or has been closed.',
      }
    }

    return {
      status: 200,
      props: {
        campaign,
      },
    }
  }
</script>

<script lang="ts">
  import { fade } from 'svelte/transition'
  import dayjs from 'dayjs'
  import Controls from '../../components/Controls.svelte'
  import InfoIcon from '../../components/iconography/Info.svelte'
  import CurrentCampaign from '../../components/CurrentCampaign.svelte'
  import CampaignNotYetLiveModal from '../../assemblies/CampaignNotYetLiveModal.svelte'
  import CampaignNav from '../../components/CampaignNav.svelte'
  import CampaignPageGrid from '../../assemblies/CampaignPageGrid.svelte'
  import CampaignFeed from '../../assemblies/CampaignFeed.svelte'

  import type { Campaign } from '../../types/Campaign'
  import { CampaignStatuses } from '../../types/CampaignStatuses'

  /**
   * PROPS
   */

  export let campaign: Campaign

  /**
   * STATE
   */

  let shouldDisplayNotYetLiveModal = campaign.status === CampaignStatuses.NotStarted
  let currentRoute = 'Campaign'
</script>

<svelte:head>
  <title>Late-Stage: Campaign</title>
</svelte:head>

<Controls />

{#if dayjs().isBefore(dayjs(campaign.goalStartDate)) || campaign.status === CampaignStatuses.NotStarted}
  <CampaignNotYetLiveModal
    on:dismiss={() => (shouldDisplayNotYetLiveModal = false)}
    on:click={() => (shouldDisplayNotYetLiveModal = false)}
    isDisplayed={shouldDisplayNotYetLiveModal}
  />
{/if}

<main class="campaign-page">
  <h2>
    {campaign.title}
    {#if dayjs().isBefore(dayjs(campaign.goalStartDate)) || campaign.status === CampaignStatuses.NotStarted}
      (Launching Soon <button
        class="info-button"
        on:click={() => (shouldDisplayNotYetLiveModal = true)}><InfoIcon /></button
      > ){/if}
  </h2>

  <CurrentCampaign {campaign} />
  <CampaignNav on:change={(e) => (currentRoute = e.detail)} />

  {#if currentRoute === 'Campaign'}
    <div in:fade={{ delay: 400, duration: 200 }} out:fade={{ duration: 200 }}>
      <CampaignPageGrid {campaign} />
    </div>
  {:else}
    <div in:fade={{ delay: 400, duration: 200 }} out:fade={{ duration: 200 }}>
      <CampaignFeed {campaign} />
    </div>
  {/if}
</main>

<style>
  main {
    margin: 0 auto 0 auto;
    padding: 72px 0 24px;
    width: calc(100% - 120px);
    max-width: 1450px;
  }

  :global(.campaign-page .current-campaign .card:first-of-type) {
    padding: 24px 32px;
  }

  :global(.campaign-page .current-campaign .deadline-card .card) {
    padding: 16px 32px 16px;
  }

  :global(.campaign-page h4 svg, .campaign-page h2 svg) {
    fill: var(--interactive-color);
    margin-bottom: -2px;
    margin-right: 4px;
  }

  @media screen and (max-width: 1100px) {
    main {
      padding-top: 72px;
      width: 100%;
      max-width: 750px;
    }
  }

  @media screen and (max-width: 600px) {
    main {
      padding-top: 72px;
    }

    :global(.campaign-page .current-campaign .card:first-of-type) {
      padding: 16px 16px;
    }

    :global(.campaign-page h1 svg) {
      height: 18px;
      width: 18px;
    }
  }
</style>
