<script lang="ts">
  import { fade } from 'svelte/transition'
  import { session } from '$app/stores'

  import Avatar from '../../components/Avatar.svelte'
  import Checkbox from '../../components/Checkbox.svelte'
  import Card from '../../components/Card.svelte'
  import ModeratorIcon from '../../components/iconography/Moderator.svelte'
  import Spinner from '../../components/iconography/Spinner.svelte'

  import { env } from '../../networking/env'
  import { gqlRequest } from '../../networking/gqlRequest'
  import { approveAmazonPrimeCompletion } from '../../networking/graphql/mutation/ApproveAmazonPrimeCompletion'
  import { unapproveAmazonPrimeCompletion } from '../../networking/graphql/mutation/UnapproveAmazonPrimeCompletion'
  import { markAmazonPrimeCompletionReviewed } from '../../networking/graphql/mutation/MarkAmazonPrimeCompletionReviewed'
  import { unmarkAmazonPrimeCompletionReviewed } from '../../networking/graphql/mutation/UnmarkAmazonPrimeCompletionReviewed'
  import { banUser } from '../../networking/graphql/mutation/BanUser'
  import { disableInteractablesWhile } from '../../utility/disableInteractablesWhile'

  import type { AmazonPrimeCampaignCompletion } from '../..//types/AmazonPrimeCampaign/AmazonPrimeCampaignCompletion'

  /**
   * PROPS
   */

  export let amazonPrimeCampaignCompletion: AmazonPrimeCampaignCompletion

  /**
   * STATE
   */

  /* Moderation state fields */
  let imageIsAPrimeCancellation: boolean = false
  let imageDoesNotReturnReverseImageSearchResults: boolean = false
  let cancellationDateMakesSense: boolean = false
  let amountMatchesImage: boolean = false
  let contentNotInappropriate: boolean = false

  let loading = false
  let banError = ''

  /**
   * METHODS
   */

  const resetModerationState = () => {
    imageIsAPrimeCancellation = false
    imageDoesNotReturnReverseImageSearchResults = false
    cancellationDateMakesSense = false
    amountMatchesImage = false
    contentNotInappropriate = false
  }

  const approve = async () => {
    loading = true

    await disableInteractablesWhile(async () => {
      await fetch(
        `${env.viteSveltekitHost}/proxy/approve-amazon-prime-completion`,
        gqlRequest({
          query: approveAmazonPrimeCompletion,
          variables: {
            amazonPrimeCompletionId: amazonPrimeCampaignCompletion.id,
          },
        }),
      )
    })

    // Optimistic update
    amazonPrimeCampaignCompletion = {
      ...amazonPrimeCampaignCompletion,
      wasApprovedByAdmin: true,
      wasReviewedByAdmin: true,
      reviewedByUser: $session.user,
    }

    resetModerationState()

    loading = false
  }

  const unapprove = async () => {
    loading = true

    await disableInteractablesWhile(async () => {
      await fetch(
        `${env.viteSveltekitHost}/proxy/unapprove-amazon-prime-completion`,
        gqlRequest({
          query: unapproveAmazonPrimeCompletion,
          variables: {
            amazonPrimeCompletionId: amazonPrimeCampaignCompletion.id,
          },
        }),
      )
    })

    // Optimistic update
    amazonPrimeCampaignCompletion = {
      ...amazonPrimeCampaignCompletion,
      wasApprovedByAdmin: false,
      wasReviewedByAdmin: true,
      reviewedByUser: $session.user,
    }

    loading = false
  }

  const markReviewed = async () => {
    loading = true

    await disableInteractablesWhile(async () => {
      await fetch(
        `${env.viteSveltekitHost}/proxy/mark-amazon-prime-completion-reviewed`,
        gqlRequest({
          query: markAmazonPrimeCompletionReviewed,
          variables: {
            amazonPrimeCompletionId: amazonPrimeCampaignCompletion.id,
          },
        }),
      )
    })

    // Optimistic update
    amazonPrimeCampaignCompletion = {
      ...amazonPrimeCampaignCompletion,
      wasReviewedByAdmin: true,
      reviewedByUser: $session.user,
    }

    loading = false
  }

  const unmarkReviewed = async () => {
    loading = true

    await disableInteractablesWhile(async () => {
      await fetch(
        `${env.viteSveltekitHost}/proxy/unmark-amazon-prime-completion-reviewed`,
        gqlRequest({
          query: unmarkAmazonPrimeCompletionReviewed,
          variables: {
            amazonPrimeCompletionId: amazonPrimeCampaignCompletion.id,
          },
        }),
      )
    })

    // Optimistic update
    amazonPrimeCampaignCompletion = {
      ...amazonPrimeCampaignCompletion,
      wasReviewedByAdmin: false,
      reviewedByUser: null,
    }

    loading = false
  }

  const ban = async () => {
    loading = true
    banError = ''

    try {
      await disableInteractablesWhile(async () => {
        const response = await fetch(
          `${env.viteSveltekitHost}/proxy/ban-user`,
          gqlRequest({
            query: banUser,
            variables: {
              userId: amazonPrimeCampaignCompletion.belongsToUser.id,
            },
          }),
        )

        await response.json()
      })
    } catch (error) {
      banError = 'Unable to ban this user'
    }

    // Optimistic update
    amazonPrimeCampaignCompletion = {
      ...amazonPrimeCampaignCompletion,
    }

    loading = false
  }
</script>

{#if amazonPrimeCampaignCompletion.wasApprovedByAdmin}
  <div
    class="bank-campaign-completion-moderation"
    in:fade={{ duration: 200, delay: 900 }}
    out:fade={{ duration: 200 }}
  >
    <Card>
      <h4>
        <ModeratorIcon /> Approved
        <span class="subdued">(Only moderators can see this)</span>
      </h4>

      <div class="user">
        <div class="flex">
          <p>Approved by</p>
          <Avatar size="small" user={$session.user} />
          <p class="username">{$session.user?.username}</p>
        </div>
      </div>

      <div class="actions">
        <button on:click={unapprove} class:disabled={loading} disabled={loading} class="secondary">
          {#if loading}
            <Spinner />
          {:else}
            Unapprove
          {/if}
        </button>
      </div>
    </Card>
  </div>
{:else if amazonPrimeCampaignCompletion.wasReviewedByAdmin}
  <div
    class="bank-campaign-completion-moderation"
    in:fade={{ duration: 200, delay: 900 }}
    out:fade={{ duration: 200 }}
  >
    <Card>
      <h4>
        <ModeratorIcon /> Reviewed, But Not Approved
        <span class="subdued">(Only moderators can see this)</span>
      </h4>

      <div class="user">
        <div class="flex">
          <p>Reviewed by:</p>
          <Avatar size="small" user={$session.user} />
          <p class="username">{$session.user.username}</p>
        </div>
      </div>

      <div class="actions">
        <button
          on:click={approve}
          class:disabled={loading}
          disabled={loading}
          in:fade={{ duration: 200, delay: 400 }}
          out:fade={{ duration: 200 }}
          class="secondary"
          >{#if loading}
            <Spinner />
          {:else}
            Approve
          {/if}</button
        >

        <button
          on:click={unmarkReviewed}
          class:disabled={loading}
          disabled={loading}
          in:fade={{ duration: 200, delay: 400 }}
          out:fade={{ duration: 200 }}
          class="secondary"
          >{#if loading}
            <Spinner />
          {:else}
            Unmark As Reviewed
          {/if}</button
        >

        {#if amazonPrimeCampaignCompletion.belongsToUser.banned}
          <p>{amazonPrimeCampaignCompletion.belongsToUser} was banned</p>
        {:else}
          <button
            on:click={ban}
            class:disabled={loading}
            disabled={loading}
            in:fade={{ duration: 200, delay: 400 }}
            out:fade={{ duration: 200 }}
            class="secondary"
          >
            {#if loading}
              <Spinner />
            {:else}
              Ban User
            {/if}
          </button>
        {/if}

        {#if banError}
          <p class="error-message">{banError}</p>
        {/if}
      </div>
    </Card>
  </div>
{:else}
  <div
    class="bank-campaign-completion-moderation"
    in:fade={{ duration: 200, delay: 900 }}
    out:fade={{ duration: 200 }}
  >
    <Card>
      <h4>
        <ModeratorIcon /> Approve this pledge
        <span class="subdued">(Only moderators can see this)</span>
      </h4>

      <Checkbox
        on:change={() => (imageIsAPrimeCancellation = !imageIsAPrimeCancellation)}
        checked={imageIsAPrimeCancellation}
        >The image in some way, shape, or form proves that an Amazon Prime membership was cancelled.
      </Checkbox>
      <Checkbox
        checked={imageDoesNotReturnReverseImageSearchResults}
        on:change={() =>
          (imageDoesNotReturnReverseImageSearchResults =
            !imageDoesNotReturnReverseImageSearchResults)}
        ><span
          >The image does not appear in <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://images.google.com/"
          >
            reverse image search</a
          > in a way that would indicate a false positive.</span
        ></Checkbox
      >
      <Checkbox
        on:change={() => (amountMatchesImage = !amountMatchesImage)}
        checked={amountMatchesImage}
        >If the image includes the user's prior membership before cancelling (only shown in
        confirmation email), the membership selection matches that in the image.</Checkbox
      >
      <Checkbox
        on:change={() => (cancellationDateMakesSense = !cancellationDateMakesSense)}
        checked={cancellationDateMakesSense}
        >The date of the cancellation, if shown, is on (or within a few days of) the date of
        submission.</Checkbox
      >
      <Checkbox
        on:change={() => (contentNotInappropriate = !contentNotInappropriate)}
        checked={contentNotInappropriate}
        >The pledge does not contain explicit, illegal, violence-inciting, or otherwise
        inappropriate content.</Checkbox
      >

      <div class="actions">
        {#if imageIsAPrimeCancellation && amountMatchesImage && cancellationDateMakesSense && contentNotInappropriate}
          <button
            on:click={approve}
            class:disabled={loading}
            disabled={loading}
            in:fade={{ duration: 200, delay: 400 }}
            out:fade={{ duration: 200 }}
            class="primary"
          >
            {#if loading}
              <Spinner />
            {:else}
              Approve Pledge{/if}</button
          >
        {:else}
          <button
            on:click={markReviewed}
            class:disabled={loading}
            disabled={loading}
            in:fade={{ duration: 200, delay: 400 }}
            out:fade={{ duration: 200 }}
            class="primary"
          >
            {#if loading}
              <Spinner />
            {:else}
              Mark Reviewed, But Don't Approve{/if}</button
          >
          <button
            on:click={async () => {
              await markReviewed()
              await ban()
            }}
            class:disabled={loading}
            disabled={loading}
            in:fade={{ duration: 200, delay: 400 }}
            out:fade={{ duration: 200 }}
            class="secondary"
          >
            {#if loading}
              <Spinner />
            {:else}
              Mark Reviewed, Don't Approve, and Ban User
            {/if}
          </button>
        {/if}
      </div>
    </Card>
  </div>
{/if}

<style>
  .subdued {
    color: var(--text-color-subdued);
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
  }

  .actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
    margin-top: 16px;
  }

  .user p {
    margin-bottom: 0px;
  }

  button :global(svg) {
    width: 18px;
    height: 18px;
  }
</style>
