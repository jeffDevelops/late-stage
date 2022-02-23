<script lang="ts">
  import Card from '../components/Card.svelte'
  import FlareIcon from '../components/iconography/Flare.svelte'
  import ProtestIcon from '../components/iconography/Protest.svelte'
  import InfoIcon from '../components/iconography/Info.svelte'
  import Tenet from '../components/Tenet.svelte'

  import type { SvelteComponent } from 'svelte'
  import type { Campaign } from '../types/Campaign'

  /* Dynamic Components */
  import BankCampaignParticipationInput from '../assemblies/BankCampaignParticipationInput.svelte'

  /**
   * PROPS
   */

  export let campaign: Campaign

  /** Determine which campaign to display from the campaign shortname */
  const components: { [key: Campaign['shortName']]: typeof SvelteComponent } = {
    banks: BankCampaignParticipationInput,
  }
</script>

<div class="campaign-section grid">
  <div class="outcomes grid-area" style="grid-area: outcomes;">
    <Card>
      <h4><FlareIcon /> Outcomes and Impact</h4>
      {#each campaign.outcomes as outcome}
        <Tenet>{outcome}</Tenet>
      {/each}
    </Card>
  </div>

  <div class="what grid-area" style="grid-area: what;">
    <Card>
      <h2><InfoIcon /> What</h2>
      {#each campaign.what as paragraph}
        <p>{paragraph}</p>
      {/each}
    </Card>
  </div>

  <div class="why grid-area" style="grid-area: why;">
    <Card>
      <h2><InfoIcon /> Why?</h2>
      {#each campaign.why as paragraph}
        <p>{paragraph}</p>
      {/each}
    </Card>
  </div>

  <div class="how grid-area" style="grid-area: how;">
    <Card>
      <h2><ProtestIcon /> How?</h2>

      <svelte:component this={components[campaign.shortName]} {campaign} />
    </Card>
  </div>
</div>

<style>
  :global(.campaign-section.grid .grid-area > .card) {
    height: 100%;
  }

  .grid {
    display: grid;
    margin-top: 16px;
    gap: 16px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
      'how outcomes'
      'how what'
      'how why';
  }

  :global(.campaign-section.grid .how .card:first-of-type:first-child) {
    border: 1px solid var(--interactive-color);
  }

  :global(.campaign-section .what .card, .campaign-page .how .card) {
    height: 100%;
  }

  :global(.campaign-section .how h2 svg) {
    height: 72px;
    width: 72px;
    margin: -16px -16px -24px -16px;
  }

  :global(.campaign-section .what .card p, .campaign-page .why .card p) {
    color: var(--text-color-subdued);
    font-size: 0.9rem;
  }

  :global(.campaign-section .outcomes .tenet:last-of-type) {
    margin-bottom: 0 !important;
  }

  .why {
    align-self: start;
  }

  @media screen and (max-width: 1100px) {
    .grid {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto;
      grid-template-areas:
        'what'
        'how'
        'outcomes'
        'why';
    }
  }
</style>
