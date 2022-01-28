<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import { goto, prefetch } from '$app/navigation'
  import Modal from '../components/Modal.svelte'
  import CheckmarkIcon from '../components/iconography/Checkmark.svelte'
  import Card from '../components/Card.svelte'
  import Checkbox from '../components/Checkbox.svelte'

  const dispatch = createEventDispatcher()

  /**
   * STATE
   */

  let shouldDisplayHoverEffect = false

  /**
   * PROPS
   */

  export let isDisplayed = false

  /**
   * METHODS
   */

  const handlePetitionHover = async () => await prefetch('/')
  const goToPetition = async () => await goto('/')

  const handleChecklistItemHover = async () => {
    await prefetch('/checklist')
    shouldDisplayHoverEffect = true
  }
  const handleChecklistItemClick = async () => await goto('/checklist')
</script>

<Modal {isDisplayed} on:dismiss={() => dispatch('dismiss')} zIndex={99}>
  <div class="bank-campaign-success-modal" slot="content">
    <div class="flex">
      <CheckmarkIcon />
    </div>

    <h2>Success</h2>

    <p>Thank you for your solidarity!</p>

    <p>
      If you have other bank accounts you'd like to withdraw from, feel free to submit this form
      again.
    </p>

    <p>
      We've updated your checklist to reflect your participation. Unless you create an account, this
      is only saved on-device in this browser.
    </p>

    <div class="hover-effect-container" on:mouseenter={handleChecklistItemHover}>
      <Card>
        {#if shouldDisplayHoverEffect}
          <button
            in:fade={{ duration: 100 }}
            out:fade={{ duration: 100 }}
            class="hover-effect"
            on:click={handleChecklistItemClick}
            on:mouseleave={() => (shouldDisplayHoverEffect = false)}
          >
            <h1>View My Checklist</h1>
          </button>
        {/if}

        <Checkbox checked={true}
          >Remove your personal funds from the large, for-profit banks</Checkbox
        >
      </Card>
    </div>
  </div>

  <div class="bank-campaign-success-modal" slot="actions">
    <button on:click={() => dispatch('dismiss')} class="secondary">Repeat with new bank</button>
    <button on:mouseenter={handlePetitionHover} on:click={goToPetition} class="primary"
      >Go to Petition</button
    >
  </div>
</Modal>

<style>
  :global(.hover-effect-container .card) {
    position: relative;
  }

  .hover-effect {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: var(--interactive-color);
    opacity: 0.9;
    border: 0;
    border-radius: var(--border-radius);
  }

  .hover-effect h1 {
    font-size: 1.4rem;
    margin-bottom: 0;
  }

  .flex {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  :global(.bank-campaign-success-modal .flex svg) {
    width: 80px;
    height: 80px;
    margin: 0 auto 24px;
  }

  :global(.campaign-page .bank-campaign-success-modal .custom-checkbox svg) {
    margin-right: 0;
    margin-bottom: -4px;
    margin-top: 0;
  }

  h2 {
    text-align: center;
  }

  p:first-of-type {
    text-align: center;
    margin-bottom: 32px;
  }

  :global(.bank-campaign-success-modal label) {
    margin: 0;
    color: var(--interactive-color);
  }

  :global(.bank-campaign-success-modal .card) {
    padding-top: 16px;
    padding-bottom: 8px;
    border: 1px solid var(--interactive-color);
    background-color: var(--interactive-card-color);
  }

  @media screen and (max-width: 500px) {
    :global(.actions .bank-campaign-success-modal) {
      flex-direction: column !important;
    }
  }
</style>
