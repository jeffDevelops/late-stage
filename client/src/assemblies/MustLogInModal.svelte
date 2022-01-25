<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Modal from '../components/Modal.svelte'

  const dispatch = createEventDispatcher()

  /**
   * PROPS
   */

  export let isDisplayed
</script>

<Modal on:dismiss={() => dispatch('dismiss')} isBlurDismissable={true} {isDisplayed}>
  <div slot="content">
    <h2>You'll need to log in first.</h2>

    <p>This action requires a free account.</p>
  </div>

  <div slot="actions">
    <a href="/log-in" sveltekit:prefetch><button class="secondary">Log In</button></a>
    <a href="/register" sveltekit:prefetch><button class="primary">Register</button></a>
  </div>
</Modal>

<style>
</style>
