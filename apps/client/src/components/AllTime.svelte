<script lang="ts">
  import { fade } from 'svelte/transition'
  import HistoryIcon from './iconography/History.svelte'
  import InfoIcon from './iconography/Info.svelte'
  import CloseIcon from './iconography/Close.svelte'
  import PreviousCampaignCard from './PreviousCampaignCard.svelte'
  import Card from './Card.svelte'
  import type { Campaign } from '../types/Campaign'

  /**
   * STATE
   */
  let allTimeInfoDisplayed = false

  const exampleBankCampaign = {
    id: '1',

    createdBy: {
      id: 'Jeff ID',
      email: 'jeff@jeff.com',
      emailVerified: true,
      isAdmin: true,
    },
    updatedBy: {
      id: 'Jeff ID',
      email: 'jeff@jeff.com',
      emailVerified: true,
      isAdmin: true,
    },
    createdAt: 'created at date',
    updatedAt: 'created at date',

    shortName: 'banks',
    title: 'Removal of personal funds from the for-profit banking system',
    description: 'Removal of personal funds from the for-profit banking system',
    goal: 120_000_000,
    goalUnit: 'dollars',
    goalVerb: 'transferred',

    goalStartDate: '2022-01-01T12:00:00-06:00',
    goalDeadline: '2022-05-01T12:00:00-06:00',

    realizedValue: 60_000_000,
  }

  const usersCampaign: Campaign = {
    id: '1',

    createdBy: {
      id: 'Jeff ID',
      email: 'jeff@jeff.com',
      emailVerified: true,
      isAdmin: true,
    },
    updatedBy: {
      id: 'Jeff ID',
      email: 'jeff@jeff.com',
      emailVerified: true,
      isAdmin: true,
    },
    createdAt: 'created at date',
    updatedAt: 'created at date',

    shortName: 'petitioners',
    title: 'Petitioners joining the platform',
    description: 'Petitioners joining the platform',
    goal: 100_000,
    goalVerb: 'petitioners',

    goalStartDate: '2022-01-01T12:00:00-06:00',
    goalDeadline: '2022-05-01T12:00:00-06:00',

    realizedValue: 49_006,
  }

  const subscriptionsCampaign: Campaign = {
    id: '1',

    createdBy: {
      id: 'Jeff ID',
      email: 'jeff@jeff.com',
      emailVerified: true,
      isAdmin: true,
    },
    updatedBy: {
      id: 'Jeff ID',
      email: 'jeff@jeff.com',
      emailVerified: true,
      isAdmin: true,
    },
    createdAt: 'created at date',
    updatedAt: 'created at date',

    shortName: 'subscriptions',
    title: 'Transfer from subscription services to one-time and buy-up services',
    description: 'Transfer from subscription services to one-time and buy-up services',
    goal: 100_000,
    goalUnit: 'subscriptions cancelled',

    goalStartDate: '2022-01-01T12:00:00-06:00',
    goalDeadline: '2022-05-01T12:00:00-06:00',

    realizedValue: 49_006,
  }
</script>

<section class="all-time">
  <div class="flex">
    <h2>
      <HistoryIcon />
      All Time
      <span class="info" on:click={() => (allTimeInfoDisplayed = !allTimeInfoDisplayed)}
        ><InfoIcon /></span
      >
    </h2>
  </div>

  {#if allTimeInfoDisplayed}
    <Card>
      <div in:fade out:fade>
        <button class="close-button" on:click={() => (allTimeInfoDisplayed = false)}
          ><CloseIcon /></button
        >
        <p>
          Campaigns exist to focus community attention on time-sensitive actions, but they remain
          open after their deadline expires. For example, you can still tally your removal of
          personal funds from for-profit banks.
        </p>

        <p>
          Participate anonymously or log in to participate as part of your Late-Stage Checklist.
        </p>
      </div>
    </Card>
  {/if}

  <div class="grid">
    <PreviousCampaignCard campaign={exampleBankCampaign} />
    <PreviousCampaignCard campaign={usersCampaign} />
    <PreviousCampaignCard campaign={subscriptionsCampaign} />
  </div>
</section>

<style>
  :global(.all-time h2 svg) {
    fill: var(--interactive-color);
    width: 40px;
    height: 40px;
    margin-bottom: -10px;
  }

  .all-time p {
    color: var(--text-color-subdued);
    letter-spacing: 0.01em;
    font-weight: 300;
    font-size: 0.8rem;
  }

  :global(.all-time .info-icon) {
    fill: var(--interactive-color);
    height: 20px;
    width: 20px;
    margin-bottom: -4px;
    cursor: pointer;
  }

  .flex {
    margin: 24px 0 16px;
    display: flex;
    gap: 16px;
    justify-content: flex-start;
    align-items: center;
  }

  .flex h2 {
    margin: 6px 0 0 0;
  }

  .grid {
    margin: 24px 0;
    width: 100%;

    display: grid;
    gap: 16px;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, minmax(140px, auto));
    grid-template-areas:
      'banks banks banks banks banks'
      'petitioners petitioners  subscriptions subscriptions subscriptions';
  }

  :global(.all-time .grid .card) {
    height: 100%;
  }

  @media screen and (max-width: 600px) {
    .grid {
      grid-template-rows: repeat(2, minmax(140px, auto));
      grid-template-areas:
        'banks banks banks banks banks'
        'petitioners petitioners petitioners petitioners petitioners'
        'subscriptions subscriptions subscriptions subscriptions subscriptions';
    }
  }
</style>
