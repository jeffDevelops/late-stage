<script context="module">
  import { env } from '../networking/env'
  import { gqlRequest } from '../networking/gqlRequest'
  import { findManyCampaigns } from '../networking/graphql/query/FindManyCampaigns'
  import Logo from '../components/Logo.svelte'

  export const load = async ({ fetch }) => {
    const response = await fetch(
      `${env.viteSveltekitHost}/proxy/campaigns`,
      gqlRequest({
        variables: {
          where: {
            status: {
              equals: 'ACTIVE',
            },
            goalStartDate: {
              lt: new Date().toISOString(),
            },
            goalDeadline: {
              gt: new Date().toISOString(),
            },
          },
        },
        query: findManyCampaigns(
          `
            id
            createdAt
            updatedAt
            status
            title
            goal
            goalUnit
            goalVerb
            goalStartDate
            goalDeadline
            shortName
            tags {
              id
              name
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
            }
          `,
        ),
      }),
    )

    const campaigns = await response.json()

    return {
      status: 200,
      props: {
        campaigns,
      },
    }
  }
</script>

<script lang="ts">
  import CurrentCampaigns from '../components/CurrentCampaigns.svelte'
  import AllTime from '../components/AllTime.svelte'
  import Controls from '../components/Controls.svelte'
  import SprayPaint from '../components/SprayPaint.svelte'
  import LessUpdooting from '../components/LessUpdooting.svelte'
  import ProveTheMovement from '../components/ProveTheMovement.svelte'
  import CommunityBuilt from '../components/CommunityBuilt.svelte'

  import type { Campaign } from '../types/Campaign'

  /**
   * PROPS
   */

  export let campaigns: Campaign[]
</script>

<svelte:head>
  <title>Late-Stage</title>
</svelte:head>

<Controls />

<main class="homepage">
  <section>
    <Logo />
    <CurrentCampaigns {campaigns} />
    <!-- <AllTime /> -->
  </section>
</main>

<SprayPaint />
<LessUpdooting />
<ProveTheMovement />
<CommunityBuilt />

<style>
  main {
    margin: 0 auto 0 auto;
    padding: 24px 0;
    width: 100%;
    max-width: 750px;
    overflow-x: hidden;
  }

  section {
    margin: 160px 0;
  }

  :global(.homepage .logo) {
    font-size: 2rem;
    text-align: left;
    margin-bottom: 16px;
    padding: 16px;
    border-radius: var(--border-radius);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: inline-block;
    width: auto;
  }

  :global(.petition-info svg) {
    fill: var(--interactive-color);
    height: 20px;
    width: 20px;
    margin-bottom: -4px;
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    :global(.homepage .logo) {
      font-size: 2rem;
    }

    section {
      margin: 0 0 64px;
    }
  }
</style>
