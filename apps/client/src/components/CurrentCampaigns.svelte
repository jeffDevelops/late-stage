<script lang="ts">
  import CampaignIcon from './iconography/Campaign.svelte'
  import CurrentCampaign from './CurrentCampaign.svelte'
  import Card from './Card.svelte'

  import type { Campaign } from '../types/Campaign'

  export let campaigns: Campaign[]
</script>

<section class="current-campaigns">
  <Card>
    <h2><CampaignIcon /> Current Campaigns</h2>

    {#each campaigns as campaign}
      <CurrentCampaign {campaign} />
    {/each}
  </Card>
</section>

<style>
  :global(.current-campaigns h2 svg) {
    fill: var(--interactive-color);
    width: 40px;
    height: 40px;
    margin-bottom: -8px;
    margin-right: 8px;
  }

  .current-campaigns:first-child {
    border-radius: var(--border-radius);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
</style>
