<script lang="ts" context="module">
  import { aggregateBankExodusCompletion } from '../networking/graphql/query/AggregateBankExodusCompletion'
  import { findManyCampaigns } from '../networking/graphql/query/FindManyCampaigns'
  import { gqlRequest } from '../networking/gqlRequest'
  import { env } from '../networking/env'
  import { CampaignStatuses } from '../types/CampaignStatuses'

  export const load = async ({ session, fetch }) => {
    const [campaigns, bankExodusCampaignCompletions] = await Promise.all([
      fetch(
        `${env.viteSveltekitHost}/proxy/campaigns`,
        gqlRequest({
          query: findManyCampaigns(
            `
              id
              checklistTitle
              tags {
                id
                name
              }
            `,
          ),
          variables: {
            where: {
              OR: [
                // Only display campaigns that are active, or that have been completed by the user
                {
                  status: {
                    equals: CampaignStatuses.Active,
                  },
                },
                {
                  status: {
                    equals: CampaignStatuses.Open,
                  },
                },
                // If the user is logged in, also grab the ones they completed, even if they're closed
                ...(session?.user
                  ? [
                      {
                        status: {
                          equals: CampaignStatuses.Closed,
                        },
                        usersThatDidCompleteCampaign: {
                          some: {
                            id: {
                              equals: session?.user?.id,
                            },
                          },
                        },
                      },
                    ]
                  : []),
              ],
            },
          },
        }),
      ).then(async (response) => await response.json()),

      ...(session.user
        ? [
            fetch(
              `${env.viteSveltekitHost}/proxy/aggregate-bank-exodus-completion`,
              gqlRequest({
                variables: {
                  where: {
                    userId: session.user.id,
                  },
                },
                query: aggregateBankExodusCompletion(
                  `
            _count {
              _all
            }
            `,
                ),
              }),
            ).then(async (response) => await response.json()),
          ]
        : []),
    ])

    return {
      props: {
        campaigns,
        bankExodusCampaignChecked: bankExodusCampaignCompletions
          ? bankExodusCampaignCompletions._count._all > 0
          : false,
      },
    }
  }
</script>

<script lang="ts">
  import ChecklistItem from '../components/ChecklistItem.svelte'
  import ChecklistIcon from '../components/iconography/Checklist.svelte'
  import Controls from '../components/Controls.svelte'
  import Card from '../components/Card.svelte'
  import IdeaIcon from '../components/iconography/Idea.svelte'
  import InfoIcon from '../components/iconography/Info.svelte'
  import type { Campaign } from '../types/Campaign'

  /**
   * PROPS
   */
  export let campaigns: Campaign[]
  export let bankExodusCampaignChecked: boolean
</script>

<Controls />

<main class="checklist">
  <section>
    <h1><ChecklistIcon /> Checklist</h1>
    <p>
      These are things you can do today to limit your participation in extractive capitalism, wealth
      inequality, insititutional racism, and human rights violations:
    </p>

    <section class="checklist-section">
      {#each campaigns as campaign}
        <ChecklistItem
          text={campaign.checklistTitle}
          tags={campaign.tags}
          participationLink={`/campaigns/${campaign.id}`}
          checked={bankExodusCampaignChecked}
        />
      {/each}
    </section>
  </section>

  <div class="disclosure">
    <Card>
      <h4><InfoIcon /> That's it? It's not much of a checklist...</h4>
      <p>
        Development of the platform is a volunteer effort (what corporation is going to pay for
        something like this?), and development of new features takes time.
      </p>
    </Card>
  </div>

  <div class="disclosure">
    <Card>
      <h4><IdeaIcon /> Have an idea for the checklist?</h4>
      <p>
        We're looking to field ideas from passionate advocates and subject-matter experts like you.
        The roadmap for the platform consists of input from the r/latestage community on Reddit; the
        following template helps us nail down specifics for your idea and allows for easy posting on
        Reddit for the community to see:
      </p>

      <a href="/checklist-rfcs#checklist-idea-template">Checklist Idea Template</a>
    </Card>
  </div>
</main>

<style>
  main {
    padding-top: 72px;
    max-width: 750px;
    width: 100%;
    margin: 0 auto;
  }

  :global(.checklist h1 svg) {
    fill: var(--interactive-color);
    margin-right: 8px;
    height: 32px;
    width: 32px;
  }

  .checklist-section {
    margin: 64px 0;
  }

  .disclosure {
    margin-top: 16px;
  }

  :global(.checklist .checklist-item:last-of-type .card) {
    margin-bottom: 64px !important;
  }

  .disclosure *:not(a) {
    font-size: 90%;
    color: var(--text-color-subdued);
  }

  .disclosure p {
    font-weight: 400;
  }

  :global(.checklist .disclosure:last-of-type .card) {
    padding-bottom: 24px;
  }

  :global(.checklist .disclosure h4 svg) {
    fill: var(--interactive-color);
    margin-bottom: -6px;
    margin-right: 4px;
  }

  @media screen and (max-width: 600px) {
    h1 {
      font-size: 2rem;
    }

    .disclosure h4 {
      line-height: 1.6em;
    }

    :global(.checklist .disclosure h4 svg) {
      width: 18px;
      height: 18px;
      margin-bottom: -4px;
      margin-right: 2px;
    }
  }
</style>
