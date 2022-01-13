<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { goto, prefetch } from '$app/navigation'
  import Modal from '../components/Modal.svelte'
  import CheckmarkIcon from '../components/iconography/Checkmark.svelte'
  import Card from '../components/Card.svelte'
  import Checkbox from '../components/Checkbox.svelte'

  const dispatch = createEventDispatcher()

  /**
   * PROPS
   */

  export let isDisplayed = false

  /**
   * METHODS
   */

  const handlePetitionHover = async () => await prefetch('/')
  const goToPetition = async () => await goto('/')
</script>

<Modal {isDisplayed} on:dismiss={() => dispatch('dismiss')}>
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

    <Card>
      <Checkbox checked={true}>Remove your personal funds from the large, for-profit banks</Checkbox
      >
    </Card>
  </div>

  <div slot="actions">
    <button on:click={() => dispatch('dismiss')} class="secondary">Repeat with new bank</button>
    <button on:mouseenter={handlePetitionHover} on:click={goToPetition} class="primary"
      >Go to Petition</button
    >
  </div>
</Modal>

<style>
  .flex {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  :global(.bank-campaign-success-modal .flex svg) {
    width: 100px;
    height: 100px;
    margin: 0 auto 24px;
  }

  :global(.campaign-page .bank-campaign-success-modal .custom-checkbox svg) {
    margin-right: 0;
    margin-bottom: -4px;
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
  }

  :global(.bank-campaign-success-modal .card) {
    padding-bottom: 8px;
  }
</style>
