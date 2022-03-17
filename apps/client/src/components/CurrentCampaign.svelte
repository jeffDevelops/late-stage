<script lang="ts">
  import { prefetch } from '$app/navigation'
  import { page } from '$app/stores'
  import dayjs from 'dayjs'

  import Card from './Card.svelte'
  import Hourglass from './Hourglass.svelte'
  import CampaignTags from './CampaignTags.svelte'

  import type { Campaign } from '../types/Campaign'

  /**
   * PROPS
   */

  export let campaign: Campaign

  /**
   * REACTIVE
   */

  // Handle stats union type
  $: campaignRealizedValue = (() => {
    if (!campaign?.stats?._sum) return 0

    switch (true) {
      case 'withdrawalAmount' in campaign.stats._sum:
        return campaign.stats._sum.withdrawalAmount
      case 'cancellationAmount' in campaign.stats._sum:
        return campaign.stats._sum.cancellationAmount
      default:
        throw new Error(`Unhandled realized value type`)
    }
  })()

  $: realizedValuePercentage = campaign.stats ? (campaignRealizedValue / campaign.goal) * 100 : 0
</script>

<a
  sveltekit:prefetch
  href={`/campaigns/${campaign.id}`}
  style="cursor: {$page.url.pathname.startsWith('/campaigns') ? 'default' : 'pointer'};"
  class="current-campaign"
>
  <div class="grid">
    <div class="goal-card">
      <Card>
        <p
          style={$page.url.pathname.startsWith('/campaigns')
            ? ''
            : 'color: var(--interactive-color); text-decoration: underline;'}
          class="goal-description"
        >
          {campaign.title}
        </p>
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
          {campaign.goalUnit === 'dollars' ? '$' : ''}{(campaignRealizedValue ?? 0)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} / {campaign.goalUnit === 'dollars'
            ? '$'
            : ''}{campaign.goal
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{campaign.goalUnit === 'dollars'
            ? ''
            : campaign.goalUnit} goal
        </p>

        <p class="participants">
          Unique participants: <span class="data"
            >{campaign._count.usersThatDidCompleteCampaign}</span
          >
        </p>
      </Card>
    </div>

    <div class="deadline-card">
      <Card>
        <div class="time-container">
          <Hourglass
            id={`${campaign.shortName}-hourglass`}
            startDate={campaign.goalStartDate}
            endDate={campaign.goalDeadline}
          />
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
</a>

<CampaignTags wrap={false} tags={campaign.tags} />

<style>
  a {
    text-decoration: none;
    color: inherit;
  }

  a:not(:last-child) {
    margin-bottom: 8px;
  }

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

  .grid:last-child {
    margin: 16px 0 0;
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
    overflow: hidden;
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
    text-shadow: 1px 1px 1px var(--card-background);
  }

  .deadline-card {
    height: 100%;
  }

  :global(.deadline-card .card, .goal-card .card) {
    padding: 12px 12px 8px 12px;
    height: 100%;
  }

  :global(.goal-card .card) {
    padding: 12px 12px 0px 12px;
    height: 100%;
  }

  .days-remaining {
    justify-self: flex-end;
    margin-top: 4px;
    margin-bottom: 0;
    text-align: center;
  }

  .participants {
    font-size: 0.8em;
    color: var(--text-color-subdued);
    margin-top: 16px;
  }

  .participants .data {
    font-weight: 400;
    color: var(--interactive-color);
  }

  @media screen and (max-width: 600px) {
    .grid {
      grid-template-columns: 3fr 1fr;
      grid-template-rows: minmax(180px, auto);
      margin: 16px 0 4px;
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

  @media screen and (max-width: 450px) {
    .grid {
      grid-template-columns: 1fr;
      grid-template-rows: minmax(180px, auto) minmax(180px, auto);
      margin: 16px 0 0;
      width: 100%;
    }
  }
</style>
