<script lang="ts">
  import { prefetch, goto } from '$app/navigation'
  import { fade } from 'svelte/transition'
  import { prefersColorScheme } from '../stores/Theme'
  import FloatingActionButton from './FloatingActionButton.svelte'
  import Account from './iconography/Account.svelte'
  import { currentUser } from '../stores/CurrentUser'

  const handleClick = async () => await goto('/register')
  const handleMouseover = async () => await prefetch('/register')
</script>

<div in:fade={{ delay: 200 }} out:fade={{ delay: 200 }}>
  <FloatingActionButton on:click={handleClick}>
    {#if !!$currentUser}
      <!-- TODO: Avatar -->
      Avatar goes here
    {:else}
      <Account />
    {/if}
  </FloatingActionButton>
</div>

<style>
  div {
    position: fixed;
    top: 108px;
    left: 8px;
  }
</style>
