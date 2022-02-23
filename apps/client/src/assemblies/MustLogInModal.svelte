<script lang="ts">
  import { page } from '$app/stores'

  import { createEventDispatcher } from 'svelte'
  import Modal from '../components/Modal.svelte'
  import { navigationStatePriorToLogin } from '../stores/NavigationPriorToLogin'

  const dispatch = createEventDispatcher()

  /**
   * PROPS
   */

  export let isDisplayed

  const preserveNavState = () => {
    navigationStatePriorToLogin.write({ url: $page.url.pathname, isExternal: false })
  }
</script>

<Modal
  maxHeight={500}
  on:dismiss={() => dispatch('dismiss')}
  isBlurDismissable={true}
  {isDisplayed}
>
  <div slot="content">
    <h2>You'll need to log in first</h2>

    <p>To perform this action, you'll need to create a free, anonymous account or log in.</p>

    <p>
      You can register <strong>completely anonymously</strong> by using a throwaway email address and
      a username that isn't tied to any of your existing accounts.
    </p>

    <p>Don't worry. We've saved your place and we'll bring you right back here when you're done.</p>
  </div>

  <div class="must-log-in-actions" slot="actions">
    <a href="/log-in" on:mousedown={preserveNavState} sveltekit:prefetch
      ><button class="secondary">Log In</button></a
    >
    <a href="/register" on:mousedown={preserveNavState} sveltekit:prefetch
      ><button class="primary">Register</button></a
    >
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
