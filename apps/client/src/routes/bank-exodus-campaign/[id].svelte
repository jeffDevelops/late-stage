<script lang="ts" context="module">
  import { gqlRequest } from '../../networking/gqlRequest'
  import { uniqueBankExodusCompletion } from '../../networking/graphql/query/UniqueBankExodusCompletion'
  import { env } from '../../networking/env'

  export const load = async ({ params, session, fetch }) => {
    const { id } = params

    try {
      const response = await fetch(
        `${env.viteSveltekitHost}/proxy/unique-bank-exodus-completion`,
        gqlRequest({
          query: uniqueBankExodusCompletion(
            `
            id
            ${session.user ? `belongsToUser { username id }` : ''}
            wasApprovedByAdmin
            wasReviewedByAdmin
            ${
              session.user?.isAdmin
                ? `reviewedByUser {
              username
              id
            }`
                : ''
            }
            createdAt
            updatedAt
            withdrawalReceiptImageURL
            isAnonymous
            withdrawalAmount
            originInstitutionName
            destinationInstitutionName
            dontInvestInFossilFuels
            dontInvestInSLABS
            dontChargeAccountFees
            offerFairRatesToAccountHolders
            conscientiousAboutHumanRights
            other
            otherInfo
            `,
          ),
          variables: {
            where: {
              id,
            },
          },
        }),
      )

      const deserialized = await response.json()

      if (deserialized.error) {
        return {
          redirect: '/__error',
          status: 303,
        }
      }

      /** If the completion doesn't belong to the user and the user is not an admin, don't show the completion */
      if (
        !session.user?.isAdmin &&
        !deserialized.wasApprovedByAdmin &&
        session.user?.id !== deserialized.belongsToUser?.id
      ) {
        return {
          redirect: '/__error',
          status: 303,
        }
      }

      return {
        props: {
          bankExodusCampaignCompletion: deserialized,
        },
      }
    } catch (error) {
      console.error('error')
      console.log({ error })

      return {
        status: 500,
      }
    }
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import dayjs from 'dayjs'
  import { session } from '$app/stores'

  import BankCampaignCompletionModeration from '../../assemblies/BankCampaign/BankCampaignCompletionModeration.svelte'
  import Controls from '../../components/Controls.svelte'
  import Card from '../../components/Card.svelte'
  import Tenet from '../../components/Tenet.svelte'
  import Avatar from '../../components/Avatar.svelte'
  import ReceiptIcon from '../../components/iconography/Receipt.svelte'
  import CheckboxIcon from '../../components/iconography/Checkbox.svelte'
  import Idea from '../../components/iconography/Idea.svelte'
  import InfoIcon from '../../components/iconography/Info.svelte'

  import type { BankExodusCampaignCompletion } from '../../types/BankCampaign/BankExodusCampaignCompletion'

  /**
   * PROPS
   */

  export let bankExodusCampaignCompletion: BankExodusCampaignCompletion

  $: withdrawalAmount = bankExodusCampaignCompletion.withdrawalAmount.toFixed(2).endsWith('.00')
    ? bankExodusCampaignCompletion.withdrawalAmount
    : bankExodusCampaignCompletion.withdrawalAmount.toFixed(2)

  /**
   * LIFECYCLE
   */

  let image: HTMLImageElement
  let imageHeight: string // CSS string

  onMount(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1300) {
        imageHeight = 'auto'
        return
      }

      imageHeight = `${Math.max(320, image.getBoundingClientRect().height)}px`
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
</script>

<Controls />

<main class="bank-exodus-campaign-completion">
  <h1><ReceiptIcon /> Pledge</h1>
  <h2>Exodus From For-Profit Banking</h2>

  <section class="flex">
    <img
      bind:this={image}
      src={bankExodusCampaignCompletion.withdrawalReceiptImageURL}
      alt="Bank exodus withdrawal receipt"
    />

    <section style="height: {imageHeight};" class="pledge">
      <Card>
        <header>
          <p class="overline">
            {dayjs(bankExodusCampaignCompletion.createdAt).format('MMM D, YYYY')}
          </p>

          <!-- Avatar / User info -->
          {#if bankExodusCampaignCompletion.belongsToUser && $session.user && !bankExodusCampaignCompletion.isAnonymous}
            <div class="user">
              <Avatar size="small" user={bankExodusCampaignCompletion.belongsToUser} />
              <p class="username">{bankExodusCampaignCompletion.belongsToUser.username}</p>
            </div>
          {:else}
            <div class="user">
              <Avatar size="small" anonymous={true} />
              <p class="username">Anonymous</p>
            </div>
          {/if}
        </header>

        <h1>${withdrawalAmount}</h1>

        <h4>Removed From</h4>
        <p class="data">{bankExodusCampaignCompletion.originInstitutionName}</p>

        <h4>Moved To</h4>
        <p class="data">
          {bankExodusCampaignCompletion.destinationInstitutionName}
        </p>
      </Card>
    </section>
  </section>

  {#if bankExodusCampaignCompletion.dontInvestInFossilFuels || bankExodusCampaignCompletion.dontInvestInSLABS || bankExodusCampaignCompletion.conscientiousAboutHumanRights || bankExodusCampaignCompletion.dontChargeAccountFees || bankExodusCampaignCompletion.offerFairRatesToAccountHolders || (bankExodusCampaignCompletion.otherInfo && bankExodusCampaignCompletion.other)}
    <Card>
      <h4 class="checkboxes-heading">They switched to this institution because:</h4>
      {#if bankExodusCampaignCompletion.dontInvestInFossilFuels}
        <p class="checklist-item"><CheckboxIcon /> It doesn't invest in fossil fuels</p>
      {/if}

      {#if bankExodusCampaignCompletion.dontInvestInSLABS}
        <p class="checklist-item">
          <CheckboxIcon /> It doesn't invest in Student Loan Asset-Backed Securities (SLABS)
        </p>
      {/if}

      {#if bankExodusCampaignCompletion.conscientiousAboutHumanRights}
        <p class="checklist-item"><CheckboxIcon /> It's conscientious about human rights</p>
      {/if}

      {#if bankExodusCampaignCompletion.dontChargeAccountFees}
        <p class="checklist-item"><CheckboxIcon /> It doesn't charge account fees</p>
      {/if}

      {#if bankExodusCampaignCompletion.offerFairRatesToAccountHolders}
        <p class="checklist-item"><CheckboxIcon /> It offers fairer rates to account holders</p>
      {/if}
    </Card>
  {/if}

  {#if bankExodusCampaignCompletion.otherInfo}
    <Card>
      <h4 class="checkboxes-heading"><Idea /> Here's what they had to say about their new bank:</h4>
      <p class="other-info">{bankExodusCampaignCompletion.otherInfo}</p>
    </Card>
  {/if}

  <Card>
    <h4><InfoIcon /> Pledges are a bit different on Late-Stage</h4>
    <p>
      Rather than being a promise of donation or participation, they're artifacts to prove that
      activism was already done. This serves two purposes:
    </p>
    <Tenet>
      <strong>We are our own enemies</strong>: we need to assuage doubt in our own communuty by
      proving that other members are taking part.
    </Tenet>
    <Tenet>
      To <strong>prove the movement</strong> to our adversaries and those that maintain the status quo.
    </Tenet>
  </Card>

  {#if $session.user?.isAdmin}
    <BankCampaignCompletionModeration {bankExodusCampaignCompletion} />
  {/if}
</main>

<style>
  main {
    padding: 72px 48px 72px;
    margin: 0 auto;
    width: calc(100% - 64px);
    max-width: 1300px;
  }

  .bank-exodus-campaign-completion :global(h1 svg) {
    fill: var(--interactive-color);
    height: 40px;
    width: 40px;
    margin-right: 8px;
    margin-bottom: -4px;
  }

  .bank-exodus-campaign-completion :global(.tenet:last-of-type) {
    margin-bottom: 0;
  }

  .bank-exodus-campaign-completion :global(.card) {
    margin-top: 16px;
  }

  .flex {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 16px;
    margin-top: 16px;
    height: auto;
  }

  :global(.bank-exodus-campaign-completion .flex .card) {
    margin: 0;
  }

  img {
    height: auto;
    width: calc(50% - 16px);
    border-radius: var(--border-radius);
    border: 1px solid var(--visualization-color);
    display: block;
  }

  .pledge {
    width: 50%;
    height: 100%;
  }

  header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 24px;
    margin-bottom: 24px;
  }

  .user {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
  }

  .user p {
    margin-bottom: 0;
  }

  .pledge h1 {
    margin: 32px 0 16px;
  }

  .pledge h4 {
    margin-bottom: 4px;
  }

  .overline {
    margin-bottom: 0;
  }

  .data {
    color: var(--interactive-color);
    margin-bottom: 16px;
  }

  .data:last-of-type {
    margin-bottom: 0;
  }

  .other-info {
    color: var(--text-color-subdued);
  }

  :global(.bank-exodus-campaign-completion > .card:last-of-type) {
    margin: 16px 0 72px;
  }

  .bank-exodus-campaign-completion :global(h4 svg) {
    fill: var(--interactive-color);
    height: 24px;
    width: 24px;
    margin-right: 8px;
    margin-bottom: -6px;
  }

  .bank-exodus-campaign-completion :global(p svg) {
    fill: var(--interactive-color);
    height: 20px;
    width: 20px;
    margin-right: 8px;
    margin-bottom: -4px;
  }

  @media screen and (max-width: 1300px) {
    main {
      padding: 72px 48px 72px;
    }

    .flex {
      flex-direction: column;
    }

    img {
      width: 100%;
    }

    .pledge {
      width: 100%;
    }

    .pledge h1 {
      margin: 24px 0 16px;
    }

    .pledge h4 {
      margin-bottom: 4px;
    }

    .overline {
      margin-bottom: 0;
    }

    .data {
      color: var(--interactive-color);
      margin-bottom: 16px;
    }

    :global(.bank-exodus-campaign-completion > .card:last-of-type) {
      margin: 16px 0;
    }

    .bank-exodus-campaign-completion :global(h4 svg) {
      fill: var(--interactive-color);
      height: 24px;
      width: 24px;
      margin-right: 8px;
      margin-bottom: -6px;
    }

    .bank-exodus-campaign-completion :global(p svg) {
      fill: var(--interactive-color);
      height: 20px;
      width: 20px;
      margin-right: 8px;
      margin-bottom: -4px;
    }
  }

  @media screen and (max-width: 900px) {
    main {
      padding: 72px 0 0;
      width: 100%;
    }
  }
</style>
