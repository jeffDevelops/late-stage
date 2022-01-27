<script lang="ts">
  import { fade } from 'svelte/transition'
  import { prefetch, goto } from '$app/navigation'

  import FloatingActionButton from './FloatingActionButton.svelte'
  import UserNavigation from './UserNavigation.svelte'
  import AccountIcon from './iconography/Account.svelte'
  import { currentUser } from '../stores/CurrentUser'

  /**
   * STATE
   */
  let shouldShowUserNavigation = false

  const toggleUserNav = () => (shouldShowUserNavigation = !shouldShowUserNavigation)
</script>

<div in:fade={{ delay: 400 }} out:fade={{ delay: 400 }}>
  <FloatingActionButton on:click={toggleUserNav}>
    {#if !!$currentUser}
      <!-- TODO: Avatar -->
      Avatar goes here
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
</style>
