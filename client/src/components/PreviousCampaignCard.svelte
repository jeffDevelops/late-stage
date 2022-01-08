<script lang="ts">
  import Card from './Card.svelte'
  import type { Campaign } from '../types/Campaign'

  /**
   * PROPS
   */

  export let campaign: Campaign
</script>

<div style="grid-area: {campaign.shortName};">
  <Card>
    <h1>
      {campaign.goalUnit === 'dollars' ? '$' : ''}{campaign.goal
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      <span class="unit"
        >{campaign.goalUnit === 'dollars' || !campaign.goalUnit ? '' : campaign.goalUnit}</span
      >
      <span class="verb">{campaign.goalVerb ?? ''}</span>
    </h1>

    <p class="description">{campaign.description}</p>
  </Card>
</div>

<style>
  h1 {
    font-size: 2rem;
    margin-top: 16px;
    margin-bottom: 16px;
    line-height: 1rem;
  }

  .verb,
  .unit {
    display: block;
    margin-top: 12px;
    font-size: 0.75rem;
    text-transform: none;
    letter-spacing: 0.01em;
    font-weight: 400;
    margin-bottom: 0;
  }

  .description {
    font-weight: 400;
    font-size: 1rem;
    letter-spacing: 0.01em;
    margin-bottom: 0;
  }
</style>
