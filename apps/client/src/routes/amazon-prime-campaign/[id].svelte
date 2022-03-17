<script lang="ts" context="module">
  import { gqlRequest } from '../../networking/gqlRequest'
  import { uniqueAmazonPrimeCompletion } from '../../networking/graphql/query/UniqueAmazonPrimeCompletion'
  import { env } from '../../networking/env'

  export const load = async ({ params, session, fetch }) => {
    const { id } = params

    try {
      const response = await fetch(
        `${env.viteSveltekitHost}/proxy/unique-amazon-prime-completion`,
        gqlRequest({
          query: uniqueAmazonPrimeCompletion(
            `
            id
            ${session.user ? `belongsToUser { username id }` : ''}
            wasApprovedByAdmin
            wasReviewedByAdmin
            ${
              session.user?.isAdmin
                ? `reviewedByUser {
              username
              id
            }`
                : ''
            }
            createdAt
            updatedAt
            cancellationImageURL
            isAnonymous
            cancellationAmount
            membershipSelection
            environmentalConcerns
            antiCompetitionConcerns
            workersRightsConcerns
            marketplaceAntitrustConcerns
            otherInfo
            `,
          ),
          variables: {
            where: {
              id,
            },
          },
        }),
      )

      const deserialized = await response.json()

      if (deserialized.error) {
        return {
          redirect: '/__error',
          status: 303,
        }
      }

      /** If the completion doesn't belong to the user and the user is not an admin, don't show the completion */
      if (
        !session.user?.isAdmin &&
        !deserialized.wasApprovedByAdmin &&
        session.user?.id !== deserialized.belongsToUser?.id
      ) {
        return {
          redirect: '/__error',
          status: 303,
        }
      }

      return {
        props: {
          amazonPrimeCampaignCompletion: deserialized,
        },
      }
    } catch (error) {
      console.error('error')
      console.log({ error })

      return {
        status: 500,
      }
    }
  }
</script>

<script lang="ts">
  import dayjs from 'dayjs'
  import { session } from '$app/stores'

  import CompletionModeration from '../../assemblies/AmazonPrimeCampaign/CompletionModeration.svelte'
  import Controls from '../../components/Controls.svelte'
  import Card from '../../components/Card.svelte'
  import Tenet from '../../components/Tenet.svelte'
  import Avatar from '../../components/Avatar.svelte'
  import ReceiptIcon from '../../components/iconography/Receipt.svelte'
  import CheckboxIcon from '../../components/iconography/Checkbox.svelte'
  import Idea from '../../components/iconography/Idea.svelte'
  import InfoIcon from '../../components/iconography/Info.svelte'

  import type { AmazonPrimeCampaignCompletion } from '../../types/AmazonPrimeCampaign/AmazonPrimeCampaignCompletion'

  /**
   * PROPS
   */

  export let amazonPrimeCampaignCompletion: AmazonPrimeCampaignCompletion

  /**
   * LIFECYCLE
   */
</script>

<Controls />

<main class="amazon-prime-campaign-completion">
  <h1><ReceiptIcon /> Pledge</h1>
  <h2>Mass Cancellation of Amazon Prime Membership</h2>

  <section class="flex">
    <img
      src={amazonPrimeCampaignCompletion.cancellationImageURL}
      alt="Bank exodus withdrawal receipt"
    />

    <section class="pledge">
      <Card>
        <header>
          <p class="overline">
            {dayjs(amazonPrimeCampaignCompletion.createdAt).format('MMM D, YYYY')}
          </p>
        </header>

        <!-- Avatar / User info -->
        <header>
          {#if amazonPrimeCampaignCompletion.belongsToUser && $session.user && !amazonPrimeCampaignCompletion.isAnonymous}
            <div class="user">
              <Avatar size="small" user={amazonPrimeCampaignCompletion.belongsToUser} />
              <p class="username">{amazonPrimeCampaignCompletion.belongsToUser.username}</p>
            </div>
          {:else}
            <div class="user">
              <Avatar size="small" anonymous={true} />
              <p class="username">Anonymous</p>
            </div>
          {/if}
          <p>cancelled their</p>
        </header>

        <h2>{amazonPrimeCampaignCompletion.membershipSelection} Membership</h2>
        <p>As a result, Amazon is losing out on</p>
        <h2 class="amount">${amazonPrimeCampaignCompletion.cancellationAmount} / month</h2>

        {#if amazonPrimeCampaignCompletion.environmentalConcerns || amazonPrimeCampaignCompletion.workersRightsConcerns || amazonPrimeCampaignCompletion.antiCompetitionConcerns || amazonPrimeCampaignCompletion.marketplaceAntitrustConcerns}
          <p class="checkboxes-heading">
            <strong>This participant cancelled their membership on account of:</strong>
          </p>
          {#if amazonPrimeCampaignCompletion.environmentalConcerns}
            <p class="checklist-item"><CheckboxIcon /> Environmental concerns</p>
          {/if}

          {#if amazonPrimeCampaignCompletion.workersRightsConcerns}
            <p class="checklist-item">
              <CheckboxIcon /> Workers rights concerns
            </p>
          {/if}

          {#if amazonPrimeCampaignCompletion.antiCompetitionConcerns}
            <p class="checklist-item"><CheckboxIcon /> Anti-competition concerns</p>
          {/if}

          {#if amazonPrimeCampaignCompletion.marketplaceAntitrustConcerns}
            <p class="checklist-item"><CheckboxIcon /> Marketplace antitrust concerns</p>
          {/if}
        {/if}
      </Card>
    </section>
  </section>

  {#if amazonPrimeCampaignCompletion.otherInfo}
    <Card>
      <h4>
        <Idea /> Here's what they had to say about cancelling Amazon Prime:
      </h4>
      <p class="other-info">{amazonPrimeCampaignCompletion.otherInfo}</p>
    </Card>
  {/if}

  <Card>
    <h4><InfoIcon /> Pledges are a bit different on Late-Stage</h4>
    <p>
      Rather than being a promise of donation or participation, they're artifacts to prove that
      activism was already done. This serves two purposes:
    </p>
    <Tenet>
      <strong>We are our own enemies</strong>: we need to assuage doubt in our own communuty by
      proving that other members are taking part.
    </Tenet>
    <Tenet>
      To <strong>prove the movement</strong> to our adversaries and those that maintain the status quo.
    </Tenet>
  </Card>

  {#if $session.user?.isAdmin}
    <CompletionModeration {amazonPrimeCampaignCompletion} />
  {/if}
</main>

<style>
  main {
    padding: 72px 48px 72px;
    margin: 0 auto;
    width: calc(100% - 64px);
    max-width: 1300px;
  }

  .amazon-prime-campaign-completion :global(h1 svg) {
    fill: var(--interactive-color);
    height: 40px;
    width: 40px;
    margin-right: 8px;
    margin-bottom: -4px;
  }

  .amazon-prime-campaign-completion :global(.tenet:last-of-type) {
    margin-bottom: 0;
  }

  .amazon-prime-campaign-completion :global(.card) {
    margin-top: 16px;
  }

  .flex {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 16px;
    margin-top: 16px;
    height: auto;
  }

  :global(.amazon-prime-campaign-completion .flex .card) {
    margin: 0;
  }

  img {
    height: auto;
    width: calc(50% - 16px);
    border-radius: var(--border-radius);
    border: 1px solid var(--visualization-color);
    display: block;
  }

  .pledge {
    width: 50%;
    height: 100%;
  }

  header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 24px;
    margin-bottom: 16px;
  }

  .user {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
  }

  .user p {
    margin-bottom: 0;
  }

  .pledge h2 {
    margin: 16px 0 16px;
  }

  .checkboxes-heading {
    margin-top: 32px;
  }

  .overline {
    margin-bottom: 0;
  }

  .amount {
    line-height: 0.75em;
    margin-bottom: -16px;
  }

  .other-info {
    color: var(--text-color-subdued);
  }

  :global(.amazon-prime-campaign-completion > .card:last-of-type) {
    margin: 16px 0 72px;
  }

  .amazon-prime-campaign-completion :global(h4 svg) {
    fill: var(--interactive-color);
    height: 24px;
    width: 24px;
    margin-right: 8px;
    margin-bottom: -6px;
  }

  .amazon-prime-campaign-completion :global(p svg) {
    fill: var(--interactive-color);
    height: 20px;
    width: 20px;
    margin-right: 8px;
    margin-bottom: -4px;
  }

  @media screen and (max-width: 1300px) {
    main {
      padding: 72px 48px 72px;
    }

    .flex {
      flex-direction: column;
    }

    img {
      width: 100%;
    }

    .pledge {
      width: 100%;
    }

    .pledge h2 {
      margin: 24px 0 16px;
    }

    .overline {
      margin-bottom: 0;
    }

    :global(.amazon-prime-campaign-completion > .card:last-of-type) {
      margin: 16px 0;
    }

    .amazon-prime-campaign-completion :global(h4 svg) {
      fill: var(--interactive-color);
      height: 24px;
      width: 24px;
      margin-right: 8px;
      margin-bottom: -6px;
    }

    .amazon-prime-campaign-completion :global(p svg) {
      fill: var(--interactive-color);
      height: 20px;
      width: 20px;
      margin-right: 8px;
      margin-bottom: -4px;
    }
  }

  @media screen and (max-width: 900px) {
    main {
      padding: 72px 0 0;
      width: 100%;
    }
  }
</style>
