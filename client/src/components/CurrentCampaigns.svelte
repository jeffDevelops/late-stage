<script lang="ts">
  import Hourglass from './Hourglass.svelte'
  import CampaignIcon from './iconography/Campaign.svelte'
  import Card from './Card.svelte'
  import dayjs from 'dayjs'
  import type { Campaign } from '../types/Campaign'

  export let campaign: Campaign

  $: realizedValuePercentage = (campaign.realizedValue / campaign.goal) * 100
</script>

<section class="current-campaigns">
  <Card>
    <div class="flex">
      <CampaignIcon />
      <h2>Current Campaigns</h2>
    </div>

    <div class="grid">
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
  </Card>
</section>

<style>
  :global(.current-campaigns svg) {
    fill: var(--interactive-color);
    width: 40px;
    height: 40px;
  }

  .current-campaigns:first-child {
    border: 1px solid var(--interactive-color);
    border-radius: var(--border-radius);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
  }

  .flex {
    display: flex;
    gap: 16px;
    justify-content: flex-start;
    align-items: center;
  }

  .flex h2 {
    margin: 6px 0 0 0;
  }

  .grid {
    display: grid;
    gap: 16px;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: minmax(180px, auto);
    margin: 16px 0;
    width: 100%;
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
  }
</style>
