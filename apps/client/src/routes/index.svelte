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
   * STATE
   */

  const example: Campaign = {
    id: '1',

    createdBy: {
      id: 'Jeff ID',
      email: 'jeff@jeff.com',
      emailIsVerified: true,
      isAdmin: true,
    },
    updatedBy: {
      id: 'Jeff ID',
      email: 'jeff@jeff.com',
      emailIsVerified: true,
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
  <section>
    <CurrentCampaigns campaign={example} />
    <AllTime />
  </section>
</main>

<SprayPaint />
<LessUpdooting />
<ProveTheMovement />
<CommunityBuilt />

<style>
  main {
    margin: 0 auto 0 auto;
    padding: 72px 0 24px 0;
    width: 100%;
    max-width: 750px;
    overflow-x: hidden;
  }

  :global(.petition-info svg) {
    fill: var(--interactive-color);
    height: 20px;
    width: 20px;
    margin-bottom: -4px;
    cursor: pointer;
  }
</style>
