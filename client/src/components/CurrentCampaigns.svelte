<script lang="ts">
  import CampaignIcon from './iconography/Campaign.svelte'
  import CurrentCampaign from './CurrentCampaign.svelte'
  import Card from './Card.svelte'

  import type { Campaign } from '../types/Campaign'

  export let campaign: Campaign
</script>

<section class="current-campaigns">
  <Card>
    <div class="flex">
      <CampaignIcon />
      <h2>Current Campaigns</h2>
    </div>

    <CurrentCampaign {campaign} />
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
</style>
