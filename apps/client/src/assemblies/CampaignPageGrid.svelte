<script lang="ts">
  import type { SvelteComponent } from 'svelte'
  import { session } from '$app/stores'

  import Card from '../components/Card.svelte'
  import FlareIcon from '../components/iconography/Flare.svelte'
  import InfoIcon from '../components/iconography/Info.svelte'
  import Tenet from '../components/Tenet.svelte'

  import type { Campaign } from '../types/Campaign'

  /* Dynamic Components */
  import BankCampaignParticipationInput from './BankCampaign/BankCampaignParticipationInput.svelte'
  import AmazonPrimeCampaignParticipationInput from './AmazonPrimeCampaign/ParticipationInput.svelte'
  import CampaignWorksCited from './CampaignWorksCited.svelte'

  /**
   * PROPS
   */

  export let campaign: Campaign

  /** Determine which campaign to display from the campaign shortname */
  const components: { [key: Campaign['shortName']]: typeof SvelteComponent } = {
    banks: BankCampaignParticipationInput,
    'amazon-prime': AmazonPrimeCampaignParticipationInput,
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
      <svelte:component
        this={components[campaign.shortName]}
        {campaign}
        hasCompletedCampaign={$session.user &&
          !!$session.user?.completedCampaigns.find(({ id }) => id === campaign.id)}
      />
    </Card>
  </div>

  {#if campaign.worksCited && campaign.worksCited.length > 0}
    <div class="works-cited grid-area" style="grid-area: works-cited;">
      <Card>
        <CampaignWorksCited worksCited={campaign.worksCited} />
      </Card>
    </div>
  {/if}
</div>

<style>
  :global(.campaign-section.grid .grid-area > .card) {
    height: 100%;
  }

  .grid {
    display: grid;
    margin-top: 16px;
    margin-bottom: 72px;
    gap: 16px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto 1fr auto;
    grid-template-areas:
      'how outcomes'
      'how what'
      'how why'
      'how works-cited';
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
      grid-template-rows: repeat(5, auto);
      grid-template-areas:
        'what'
        'how'
        'outcomes'
        'why'
        'works-cited';
    }
  }
</style>
