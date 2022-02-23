<script lang="ts">
  import BankCampaignFeed from './BankCampaignFeed.svelte'

  import type { SvelteComponent } from 'svelte'
  import type { Campaign } from '../types/Campaign'

  /**
   * PROPS
   */

  export let campaign: Campaign

  /** Determine which repeating element to display based on the campaign shortname */
  const components: { [key: string]: typeof SvelteComponent } = {
    banks: BankCampaignFeed,
  }
</script>

<div class="campaign-feed">
  <svelte:component this={components[campaign.shortName]} />
</div>

<style>
  :global(.campaign-feed) {
    margin-top: 16px;
  }
</style>
