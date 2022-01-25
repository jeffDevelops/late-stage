<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import { page, session } from '$app/stores'
  import { logOut } from '../networking/shared/logOut'
  import { disableInteractablesWhile } from '../utility/disableInteractablesWhile'
  import { clickOutside } from '../directives/clickOutside'

  /**
   * LIFECYCLE
   */

  const dispatch = createEventDispatcher()
  onMount(async () => {
    const handleDismiss = () => dispatch('dismiss')

    window.addEventListener('sveltekit:navigation-end', handleDismiss)
    return () => {
      window.removeEventListener('sveltekit:navigation-end', handleDismiss)
    }
  })

  /**
   * METHODS
   */
  const handleLogOut = async () => {
    return await disableInteractablesWhile(async () => {
      await logout()
      return session.update((previous) => ({ ...previous, user: null }))
    })
  }

  const handleClickOutside = () => dispatch('dismiss')
</script>

<nav use:clickOutside on:click-outside={handleClickOutside} in:fade out:fade class="user-nav">
  {#if $session.user}
    <a sveltekit:prefetch href="/forgot-password">Reset Password</a>
    <button class="button" on:click={handleLogOut}>Log Out</button>
  {:else}
    <a sveltekit:prefetch href="/register" class:active={$page.url.pathname === '/register'}
      >Register</a
    >
    <a sveltekit:prefetch href="/log-in" class:active={$page.url.pathname === '/log-in'}>Log In</a>
  {/if}
</nav>

<style>
  .user-nav {
    position: absolute;
    top: 0;
    left: 48px;
    z-index: 3;
    background-color: var(--card-background);
    width: 150px;
    border-radius: var(--border-radius);
    padding: 16px;
    border: 1px solid #55555522;
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  a,
  .button {
    background-color: transparent;
    border: 0;
    color: var(--text-color);
    text-transform: none;
    cursor: pointer;
    transform: none;
    justify-content: flex-start;
    padding: 8px 16px;
    margin-top: 8px;
    border-radius: var(--border-radius);
    position: relative;
    text-decoration: none;
    letter-spacing: 0.01em;
  }

  .button:first-of-type {
    margin: 0;
  }

  .button:hover,
  a:hover,
  a.active {
    box-shadow: none;
    transform: none;
    background-color: var(--interactive-color);
    color: var(--button-text-color);
    transition: background-color 0.5s, color 0.5s;
    text-decoration: none;
  }

  .button:focus,
  a.active {
    box-shadow: none;
    transform: none;
  }
</style>
