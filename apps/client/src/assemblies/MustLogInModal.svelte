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
  :global(.must-log-in-actions .actions) {
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }
</style>
