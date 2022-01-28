<script lang="ts">
  import { fade } from 'svelte/transition'
  import CurrentCampaigns from '../components/CurrentCampaigns.svelte'
  import AllTime from '../components/AllTime.svelte'
  import Card from '../components/Card.svelte'
  import Controls from '../components/Controls.svelte'
  import InfoIcon from '../components/iconography/Info.svelte'

  import type { Campaign } from '../types/Campaign'

  /**
   * STATE
   */

  let petitionInfoDisplayed = false

  const example: Campaign = {
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

    description: 'Removal of personal funds from the for-profit banking system',
    goal: 120_000_000,
    goalUnit: 'dollars',
    goalVerb: 'transferred',

    goalStartDate: '2022-01-01T12:00:00-06:00',
    goalDeadline: '2022-05-01T12:00:00-06:00',

    realizedValue: 60_000_000,
  }
</script>

<svelte:head>
  <title>Late-Stage</title>
</svelte:head>

<Controls />

<main>
  <header class="petition-info">
    <h1>
      Petition <span on:click={() => (petitionInfoDisplayed = !petitionInfoDisplayed)}
        ><InfoIcon /></span
      >
    </h1>

    {#if petitionInfoDisplayed}
      <Card>
        <div in:fade out:fade>
          <button class="close-button" on:click={() => (petitionInfoDisplayed = false)}>×</button>
          <p>
            Petitions mean nothing when your representation don't represent you, so this petition
            isn't one you sign&mdash;it's one you act upon.
          </p>

          <p>
            This dashboard is a public record of the proven, measurable acts petitioners have taken
            against institutionalized extractive capitalism.
          </p>
        </div>
      </Card>
    {/if}
  </header>

  <main>
    <CurrentCampaigns campaign={example} />
    <AllTime />
  </main>
</main>

<style>
  header,
  main {
    margin: 0 auto 0 auto;
    padding: 0 0 24px 0;
    width: 100%;
    max-width: 750px;
  }

  header {
    padding-top: 72px;
  }

  :global(.petition-info svg) {
    fill: var(--interactive-color);
    height: 20px;
    width: 20px;
    margin-bottom: -4px;
    cursor: pointer;
  }

  .petition-info p {
    font-weight: 300;
    font-size: 0.8rem;
    color: var(--text-color-subdued);
    letter-spacing: 0.025em;
  }

  main {
    padding: 0;
  }

  p:last-of-type {
    margin-bottom: 0;
  }
</style>
