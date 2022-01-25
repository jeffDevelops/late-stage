<script lang="ts">
  import { prefetch, goto } from '$app/navigation'
  import { fade } from 'svelte/transition'
  import { session } from '$app/stores'
  import dayjs from 'dayjs'

  import MustLogInModal from '../assemblies/MustLogInModal.svelte'
  import Card from './Card.svelte'
  import Hourglass from './Hourglass.svelte'
  import type { Campaign } from '../types/Campaign'

  /**
   * PROPS
   */

  export let campaign: Campaign

  /**
   * STATE
   */

  let shouldDisplayHoverEffect = false
  let shouldDisplayMustLogInModal = false

  /**
   * REACTIVE
   */

  $: realizedValuePercentage = (campaign.realizedValue / campaign.goal) * 100

  /**
   * METHODS
   */

  const handleCampaignHover = async () => {
    await prefetch(`/campaigns/${campaign.id}`)
    shouldDisplayHoverEffect = true
  }

  const handleCampaignClick = async () => {
    if (!$session.user) return (shouldDisplayMustLogInModal = true)
    await goto(`/campaigns/${campaign.id}`)
  }
</script>

<MustLogInModal
  on:dismiss={() => (shouldDisplayMustLogInModal = false)}
  isDisplayed={shouldDisplayMustLogInModal}
/>

<div on:mouseenter={handleCampaignHover} class="current-campaign grid">
  {#if shouldDisplayHoverEffect}
    <button
      in:fade={{ duration: 100 }}
      out:fade={{ duration: 100 }}
      class="hover-effect"
      on:click={handleCampaignClick}
      on:mouseleave={() => (shouldDisplayHoverEffect = false)}
    >
      <h1>Participate</h1>
    </button>
  {/if}

  <div class="goal-card">
    <Card>
      <p class="goal-description">{campaign.description}</p>
      <p class="goal">
        {campaign.goalUnit === 'dollars' ? '$' : ''}{campaign.goal
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        {campaign.goalUnit === 'dollars' ? '' : campaign.goalUnit}
        {campaign.goalVerb} by {dayjs(campaign.goalDeadline).format('MMM D, YYYY')}
      </p>

      <div class="goal-visualization">
        <div style="width: {realizedValuePercentage}%;" class="realized-value" />
      </div>

      <p class="goal-visualization-description">
        {campaign.goalUnit === 'dollars' ? '$' : ''}{campaign.realizedValue
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} / {campaign.goalUnit === 'dollars'
          ? '$'
          : ''}{campaign.goal
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{campaign.goalUnit === 'dollars'
          ? ''
          : campaign.goalUnit} goal
      </p>
    </Card>
  </div>

  <div class="deadline-card">
    <Card>
      <div class="time-container">
        <Hourglass startDate={campaign.goalStartDate} endDate={campaign.goalDeadline} />
        <div class="deadline">
          <h4>Deadline</h4>
          <p>{dayjs(campaign.goalDeadline).format('MMM D, YYYY')}</p>
        </div>

        <p class="days-remaining">
          {dayjs(campaign.goalDeadline).diff(dayjs(), 'day')} days remaining
        </p>
      </div></Card
    >
  </div>
</div>

<style>
  .grid {
    position: relative;
    display: grid;
    gap: 16px;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: minmax(180px, auto);
    margin: 16px 0;
    width: 100%;
    z-index: -1;
  }

  .goal-description {
    font-size: 1.1rem;
    font-weight: 400;
    letter-spacing: 0.01em;
  }
  .goal {
    font-weight: 500;
    letter-spacing: 0.01em;
    font-size: 0.9em;
    margin-bottom: 0;
  }

  .goal-visualization,
  .realized-value {
    border-radius: 8px;
    height: 16px;
  }

  .goal-visualization {
    margin-top: 24px;
    background-color: var(--visualization-color);
    position: relative;
    width: 100%;
  }

  .realized-value {
    background-color: var(--interactive-color);
  }

  .goal-visualization-description {
    font-weight: 700;
    letter-spacing: 0.025em;
    font-size: 0.75em;
    margin-top: 8px;
    margin-bottom: 0;
  }

  .time-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    height: 100%;
  }

  .deadline {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 50px;
    width: 100%;
  }

  .deadline * {
    text-align: center;
  }

  .deadline-card {
    height: 100%;
  }

  :global(.deadline-card .card, .goal-card .card) {
    padding: 12px;
    height: 100%;
  }

  .days-remaining {
    justify-self: flex-end;
    margin-top: 8px;
    margin-bottom: 0;
    text-align: center;
  }

  .hover-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--interactive-color);
    z-index: 3;
    border-radius: var(--border-radius);
    opacity: 0.95;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    cursor: pointer;
    border: none;
  }

  .hover-effect h1 {
    color: var(--button-text-color);
  }

  @media screen and (max-width: 600px) {
    .grid {
      grid-template-columns: 3fr 1fr;
      grid-template-rows: minmax(180px, auto);
      margin: 16px 0 0;
      width: 100%;
    }

    .deadline * {
      text-align: center;
      font-size: 0.8rem;
    }

    :global(.current-campaigns .card:first-child) {
      padding: 12px;
    }

    .hover-effect h1 {
      font-size: 1.5em;
      font-weight: 400;
    }
  }

  @media screen and (max-width: 450px) {
    .grid {
      grid-template-columns: 1fr;
      grid-template-rows: minmax(180px, auto) minmax(180px, auto);
      margin: 16px 0 0;
      width: 100%;
    }
  }
</style>
