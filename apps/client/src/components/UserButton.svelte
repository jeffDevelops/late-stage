<script lang="ts">
  import { session } from '$app/stores'
  import { fade } from 'svelte/transition'
  import { prefetch, goto } from '$app/navigation'

  import FloatingActionButton from './FloatingActionButton.svelte'
  import UserNavigation from './UserNavigation.svelte'
  import AccountIcon from './iconography/Account.svelte'

  /**
   * STATE
   */
  let shouldShowUserNavigation = false

  const toggleUserNav = () => (shouldShowUserNavigation = !shouldShowUserNavigation)

  $: initials = $session.user?.username
    .split(/([\-|_|.])/) // Split on separators
    .filter((char) => !char.match(/([\-|_|.])/)) // Remove separators
    .reduce((acc, word) => acc + word[0].toUpperCase(), '') // Concatenate
    .substring(0, 2) // Limit to 2 characters
</script>

<div in:fade={{ delay: 400 }} out:fade={{ delay: 400 }}>
  <FloatingActionButton on:click={toggleUserNav}>
    {#if !!$session.user}
      {initials}
    {:else}
      <AccountIcon />
    {/if}
  </FloatingActionButton>

  {#if shouldShowUserNavigation}
    <UserNavigation on:dismiss={toggleUserNav} />
  {/if}
</div>

<style>
  div {
    position: fixed;
    top: 92px;
    left: 4px;
  }

  :global(.fab) {
    color: var(--interactive-color);
    font-size: 1rem;
  }
</style>
