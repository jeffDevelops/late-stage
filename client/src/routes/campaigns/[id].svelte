<script lang="ts">
  import { fade } from 'svelte/transition'
  import Card from '../../components/Card.svelte'
  import Controls from '../../components/Controls.svelte'
  import InfoIcon from '../../components/iconography/Info.svelte'
  import FlareIcon from '../../components/iconography/Flare.svelte'
  import WeightIcon from '../../components/iconography/Weight.svelte'
  import Tenet from '../../components/Tenet.svelte'
  import BankCampaignParticipationInput from '../../assemblies/BankCampaignParticipationInput.svelte'

  import type { Campaign } from '../../types/Campaign'
  import CurrentCampaign from '../../components/CurrentCampaign.svelte'
  import CampaignNotYetLiveModal from '../../assemblies/CampaignNotYetLiveModal.svelte'

  /**
   * STATE
   */

  let petitionInfoDisplayed = false
  let shouldDisplayExampleCampaignModal = false

  const campaign: Campaign = {
    id: '1',

    createdBy: {
      id: 'Jeff ID',
      email: 'jeff@jeff.com',
      emailVerified: true,
      isAdmin: true,
    },
    updatedBy: {
      id: 'Jeff ID',
      email: 'jeff@jeff.com',
      emailVerified: true,
      isAdmin: true,
    },
    createdAt: 'created at date',
    updatedAt: 'created at date',

    description: 'Mass removal of personal funds from the for-profit banking system',
    what: [
      "We're calling on the community to remove personal funds from the large for-profit banks.",
      "We aren't asking for your money! All of the funds reflected here stay in your pocket.",
    ],
    why: [
      'Banks create leveraged positions for themselves with your money by lending your funds to other people and corporations.',
      "You don't get to choose which types of businesses the bank invests in, and you don't have a say in stopping the banks from preying on young people and people with poor credit histories (disproportionately, people of color) with high-interest loans.",
      "In addition to historically denying home and business loans to disadvantaged people and people of color, they charge service fees to people that don't meet arbitrary standards for the amount of money held in accounts, and they allow overdrafts to occur, rather than simply declining transactions, to further extract wealth from the lower class.",
    ],
    outcomes: [
      'You are likely to make more money from interest by moving your money from for-profit banking',
      'Encourage healthy competition for smaller financial institutions, and encourage large institutions to rethink their policies',
      "Late-Stage will create a digital mosiac mural of all of the community's withdrawal receipts from the major for-profit financial institutions as a collective receipt of our mass dissent of their policies.",
    ],
    goal: 120_000_000,
    goalUnit: 'dollars',
    goalVerb: 'transferred',

    goalStartDate: '2022-01-01T12:00:00-06:00',
    goalDeadline: '2022-05-01T12:00:00-06:00',

    realizedValue: 60_000_000,
  }
</script>

<Controls />

<CampaignNotYetLiveModal
  on:click={() => (shouldDisplayExampleCampaignModal = false)}
  isDisplayed={shouldDisplayExampleCampaignModal}
/>

<main class="campaign-page">
  <h1>
    Campaign [EXAMPLE <button
      class="info-button"
      on:click={() => (shouldDisplayExampleCampaignModal = true)}><InfoIcon /></button
    > ]
  </h1>

  <CurrentCampaign {campaign} />

  <div class="grid">
    <div class="outcomes" style="grid-area: outcomes;">
      <Card>
        <h4><FlareIcon /> Outcomes and Impact</h4>
        {#each campaign.outcomes as outcome}
          <Tenet>{outcome}</Tenet>
        {/each}
      </Card>
    </div>

    <div class="what" style="grid-area: what;">
      <Card>
        <h2><InfoIcon /> What</h2>
        {#each campaign.what as paragraph}
          <p>{paragraph}</p>
        {/each}
      </Card>
    </div>

    <div class="why" style="grid-area: why;">
      <Card>
        <h2><InfoIcon /> Why?</h2>
        {#each campaign.why as paragraph}
          <p>{paragraph}</p>
        {/each}
      </Card>
    </div>

    <div class="how" style="grid-area: how;">
      <Card>
        <h2><WeightIcon /> How?</h2>

        <BankCampaignParticipationInput />
      </Card>
    </div>
  </div>
</main>

<style>
  main {
    margin: 0 auto 0 auto;
    padding: 40px 0 24px 0;
    width: 100%;
    max-width: 950px;
  }

  :global(.campaign-page .current-campaign .card:first-of-type) {
    padding: 24px 32px 8px;
  }

  :global(.campaign-page .current-campaign .deadline-card .card) {
    padding: 16px 32px 16px;
  }

  :global(.campaign-page svg) {
    fill: var(--interactive-color);
    margin-bottom: -2px;
    margin-right: 4px;
  }

  :global(.campaign-page .how .card:first-of-type:first-child) {
    border: 1px solid var(--interactive-color);
  }

  :global(.campaign-page .what .card, .campaign-page .how .card) {
    height: 100%;
  }

  :global(.campaign-page .outcomes .tenet:last-of-type) {
    margin-bottom: 0 !important;
  }

  .grid {
    display: grid;
    margin-top: 16px;
    gap: 16px;
    grid-template-columns: 3fr 2fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      'how outcomes'
      'how what'
      'how why';
  }

  @media screen and (max-width: 900px) {
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

  @media screen and (max-width: 600px) {
    h1 {
      font-size: 1.4rem;
    }

    :global(.campaign-page h1 svg) {
      height: 18px;
      width: 18px;
    }
  }
</style>
