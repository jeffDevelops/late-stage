<script lang="ts">
  import { fade } from 'svelte/transition'
  import dayjs from 'dayjs'
  import { session } from '$app/stores'

  import Card from '../components/Card.svelte'
  import Avatar from '../components/Avatar.svelte'
  import Checkbox from '../components/Checkbox.svelte'
  import ThumbsUpIcon from '../components/iconography/ThumbsUp.svelte'
  import ThumbsDownIcon from '../components/iconography/ThumbsDown.svelte'

  import type { BankExodusCampaignCompletion } from '../types/BankExodusCampaignCompletion'

  /**
   * PROPS
   */

  export let bankExodusCampaignCompletion: BankExodusCampaignCompletion
  export let index: number
</script>

<a href={`/bank-exodus-campaign/${bankExodusCampaignCompletion.id}`}>
  <div in:fade={{ delay: index * 50 }} out:fade class="bank-campaign-repeating-element">
    <Card>
      <article>
        <div
          style="background-image: url('{bankExodusCampaignCompletion.withdrawalReceiptImageURL}');"
          class="withdrawal-receipt"
        />
        <section>
          <p class="overline">
            {dayjs(bankExodusCampaignCompletion.createdAt).format('MMM D, YYYY')}
          </p>

          <h2>
            ${bankExodusCampaignCompletion.withdrawalAmount} Removed
          </h2>

          <h4>From {bankExodusCampaignCompletion.originInstitutionName}</h4>

          <!-- Avatar / User info -->
          {#if bankExodusCampaignCompletion.belongsToUser && $session.user && !bankExodusCampaignCompletion.isAnonymous}
            <div class="user">
              <Avatar user={bankExodusCampaignCompletion.belongsToUser} />
              <p class="username">{bankExodusCampaignCompletion.belongsToUser.username}</p>
            </div>
          {:else}
            <div class="user">
              <Avatar anonymous={true} />
              <p class="username">Anonymous</p>
            </div>
          {/if}

          {#if $session.user?.isAdmin}
            <Checkbox checked={bankExodusCampaignCompletion.wasReviewedByAdmin}>
              {#if bankExodusCampaignCompletion.wasReviewedByAdmin && !bankExodusCampaignCompletion.wasApprovedByAdmin}
                <ThumbsDownIcon />
              {:else if bankExodusCampaignCompletion.wasReviewedByAdmin && bankExodusCampaignCompletion.wasApprovedByAdmin}
                <span class="green"><ThumbsUpIcon /></span>
              {/if}

              {#if bankExodusCampaignCompletion.wasReviewedByAdmin && bankExodusCampaignCompletion.reviewedByUser}
                <div class="user">
                  <Avatar user={bankExodusCampaignCompletion.reviewedByUser} />
                  <p>{bankExodusCampaignCompletion.reviewedByUser.username}</p>
                </div>
              {/if}

              {bankExodusCampaignCompletion.wasApprovedByAdmin
                ? 'Approved by '
                : bankExodusCampaignCompletion.wasReviewedByAdmin
                ? 'Reviewed by'
                : 'Pending approval'}
            </Checkbox>
          {:else}
            <p class="subdued">Pending Review</p>
          {/if}
        </section>
      </article>
    </Card>
  </div>
</a>

<style>
  a {
    display: block;
    text-decoration: none;
    margin-top: 16px;
    overflow: hidden;
    border-radius: var(--border-radius);
  }

  a:first-of-type {
    margin-top: 0;
  }

  a:hover .bank-campaign-repeating-element {
    transform: perspective(1000px) translateZ(10px);
    background-color: var(--interactive-card-color-opaque);
    transition: transform 0.1s, background-color 0.1s;
    border-radius: var(--border-radius);
    overflow: hidden;
  }

  .bank-campaign-repeating-element {
    min-height: 160px;
    height: auto;
    width: 100%;
    transform: perspective(1000px) translateZ(0px);
    transition: transform 0.1s, background-color 0.1s;
    border-radius: var(--border-radius);
    overflow: hidden;
  }

  .bank-campaign-repeating-element :global(.card) {
    padding-left: 0;
    padding-top: 0;
    padding-bottom: 0;
    height: 100%;
    overflow: hidden;
  }

  article {
    display: flex;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
    gap: 24px;
  }

  .withdrawal-receipt {
    width: calc(40% - 24px);
    background-repeat: no-repeat;
    background-size: cover;
  }

  section {
    padding: 16px 0 16px;
    width: 60%;
  }

  h2,
  h4 {
    margin: 2px 0 4px;
  }

  .user {
    margin-top: 8px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
  }

  .bank-campaign-repeating-element :global(label) {
    flex-direction: row-reverse;
    font-size: 0.75rem;
    align-items: center;
    margin: 4px 0;
  }

  .bank-campaign-repeating-element :global(label *:not(.border)) {
    color: var(--text-color-subdued);
  }

  .bank-campaign-repeating-element :global(label svg) {
    fill: var(--interactive-color);
  }

  .bank-campaign-repeating-element :global(label .green svg) {
    fill: var(--success-color);
    margin-bottom: -4px;
  }

  .bank-campaign-repeating-element :global(label .user) {
    margin-top: 0;
  }

  .bank-campaign-repeating-element :global(label .user p) {
    color: var(--interactive-color);
    font-weight: 700;
    font-size: 0.75rem;
  }

  .subdued {
    color: var(--text-color-subdued);
  }

  @media screen and (max-width: 1200px) {
    h2 {
      font-size: 1.3rem;
    }
  }

  @media screen and (max-width: 600px) {
    .bank-campaign-repeating-element {
      min-height: auto;
    }

    .withdrawal-receipt {
      width: 40%;
    }

    .overline {
      font-size: 0.75rem;
    }

    h2 {
      font-size: 0.75rem;
      font-weight: 500;
    }

    h4 {
      font-size: 0.6rem;
    }

    .bank-campaign-repeating-element :global(label) {
      margin-top: 6px;
    }
  }
</style>
