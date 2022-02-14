<script lang="ts">
  import Card from '../../components/Card.svelte'
  import Controls from '../../components/Controls.svelte'
  import InfoIcon from '../../components/iconography/Info.svelte'
  import FlareIcon from '../../components/iconography/Flare.svelte'
  import WeightIcon from '../../components/iconography/Weight.svelte'
  import Tenet from '../../components/Tenet.svelte'
  import CurrentCampaign from '../../components/CurrentCampaign.svelte'
  import CampaignNotYetLiveModal from '../../assemblies/CampaignNotYetLiveModal.svelte'

  import type { SvelteComponent } from 'svelte'
  import type { Campaign } from '../../types/Campaign'

  /* Dynamic Components */
  import BankCampaignParticipationInput from '../../assemblies/BankCampaignParticipationInput.svelte'

  /**
   * STATE
   */

  let petitionInfoDisplayed = false
  let shouldDisplayExampleCampaignModal = true

  const componentOptions: { [key: Campaign['shortName']]: typeof SvelteComponent } = {
    banks: BankCampaignParticipationInput,
  }

  const campaign: Campaign = {
    id: '1',

    createdBy: {
      id: 'Jeff ID',
      email: 'jeff@jeff.com',
      emailIsVerified: true,
      isAdmin: true,
    },
    updatedBy: {
      id: 'Jeff ID',
      email: 'jeff@jeff.com',
      emailIsVerified: true,
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
      "In addition to historically denying home- and business loans to disadvantaged people and people of color, banks charge service fees to people that don't meet arbitrary standards for the amount of money held in accounts; they've even been known to create unauthorized accounts in your name to conjure new fee revenue streams out of thin air with your money.",
      'Rather than simply declining overdrafting transactions, they manufacture overdrafts as a means to prey on the poorest, and "overdraft protection" as a service to charge additional fees to the only slightly less disadvantaged.',
      'Banks routinely invest in student loan asset-backed securities (SLABS). They package the student loans you work ceaselessly to pay off into investments for banks that are virtually risk-free because of current student loan discharge policies.',
      'Worst of all, they take trillions of your dollars made from these machines and invest them into fossil fuels without your consent. They smother the financial freedoms of millions of people to line their pockets with the returns made from destroying the planet.',
    ],
    outcomes: [
      'Disable the use of our dollars in coal, oil, and gas',
      'Disable the use of our dollars in Student Loan Asset-Backed Securities (SLABS)',
      'You are likely to make more money from interest by moving your money from for-profit banking',
      'Encourage healthy competition for smaller financial institutions, and encourage large institutions to rethink their policies',
      "Late-Stage will create a digital mosaic mural of all of the community's withdrawal receipts from the major for-profit financial institutions as a collective receipt of our mass dissent of their policies.",
    ],
    goal: 120_000_000,
    goalUnit: 'dollars',
    goalVerb: 'transferred',

    goalStartDate: '2022-01-01T12:00:00-06:00',
    goalDeadline: '2022-05-01T12:00:00-06:00',

    realizedValue: 60_000_000,

    shortName: 'banks',
  }
</script>

<svelte:head>
  <title>Late-Stage: Campaign</title>
</svelte:head>

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

        <svelte:component this={componentOptions[campaign.shortName]} />
      </Card>
    </div>
  </div>
</main>

<style>
  main {
    margin: 0 auto 0 auto;
    padding: 72px 0;
    width: calc(100% - 160px);
    max-width: 1250px;
  }

  :global(.campaign-page .current-campaign .card:first-of-type) {
    padding: 24px 32px;
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
    grid-template-columns: 2fr 3fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      'how outcomes'
      'how what'
      'how why';
  }

  @media screen and (max-width: 900px) {
    main {
      padding-top: 72px;
      width: 100%;
    }

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
    main {
      padding-top: 72px;
    }
    h1 {
      font-size: 1.6rem;
    }

    :global(.campaign-page h1 svg) {
      height: 18px;
      width: 18px;
    }
  }
</style>
