<script lang="ts">
  import { page } from '$app/stores'

  import { createEventDispatcher, onMount } from 'svelte'
  import Modal from '../components/Modal.svelte'
  import { navigationStatePriorToLogin } from '../stores/NavigationPriorToLogin'

  const dispatch = createEventDispatcher()

  /**
   * LIFECYCLE
   */
  onMount(() => {
    navigationStatePriorToLogin.set({
      url: $page.url.pathname,
      isExternal: false,
    })
  })

  /**
   * PROPS
   */

  export let isDisplayed
</script>

<Modal
  maxHeight={360}
  on:dismiss={() => dispatch('dismiss')}
  isBlurDismissable={true}
  {isDisplayed}
>
  <div slot="content">
    <h2>You'll need to be logged in first</h2>

    <p>To perform this action, you'll need to create a free account or log in.</p>
    <p>Don't worry. We've saved your place and we'll bring you right back when you're done.</p>
  </div>

  <div class="must-log-in-actions" slot="actions">
    <a href="/log-in" sveltekit:prefetch><button class="secondary">Log In</button></a>
    <a href="/register" sveltekit:prefetch><button class="primary">Register</button></a>
  </div>
</Modal>

<style>
  .must-log-in-actions a {
    display: inline-block;
    width: calc(50% - 8px) !important;
  }

  .must-log-in-actions a button {
    width: 100% !important;
    min-width: 0;
  }
</style>
