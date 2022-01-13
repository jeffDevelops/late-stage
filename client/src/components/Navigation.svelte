<script lang="ts">
  import { fly } from 'svelte/transition'
  import { shouldDisplayNav } from '../stores/Navigation'
  import { clickOutside } from '../directives/clickOutside'

  import Logo from './Logo.svelte'
  import NotionLogo from './iconography/Notion.svelte'
  import RedditLogo from './iconography/Reddit.svelte'
  import OpenInNew from './iconography/OpenInNew.svelte'

  const handleClickOutside = () => shouldDisplayNav.update(() => false)
</script>

{#if $shouldDisplayNav}
  <nav
    id="main-navigation"
    out:fly={{ x: -window.innerWidth / 3, duration: 200 }}
    in:fly={{ x: -window.innerWidth / 3, duration: 200 }}
    use:clickOutside
    on:click-outside={handleClickOutside}
  >
    <header>
      <Logo />
    </header>

    <a
      on:mouseup={handleClickOutside}
      sveltekit:prefetch
      href="/"
      class:active={typeof window !== 'undefined' && window?.location.pathname === '/'}>Petition</a
    >

    <a
      on:mouseup={handleClickOutside}
      sveltekit:prefetch
      href="/checklist"
      class:active={window?.location.pathname === '/checklist'}>Checklist</a
    >

    <a
      on:mouseup={handleClickOutside}
      sveltekit:prefetch
      href="/about"
      class:active={typeof window !== 'undefined' && window?.location.pathname === '/about'}
      >About</a
    >

    <a
      on:mouseup={handleClickOutside}
      target="_blank"
      rel="noopener noreferrer"
      href="https://late-stage.notion.site/f8709ff5bbed4fcb9bda3d802fabdac0?v=86dd875520eb4384a8a01424da6ad666"
      >Roadmap <div><NotionLogo /> <OpenInNew /></div>
    </a>

    <a
      on:mouseup={handleClickOutside}
      sveltekit:prefetch
      href="/audit"
      class:active={window?.location.pathname === '/audit'}>Audit</a
    >

    <a
      on:mouseup={handleClickOutside}
      sveltekit:prefetch
      href="/sponsor"
      class:active={window?.location.pathname === '/sponsor'}>Sponsor</a
    >

    <!-- {#if $currentUser}
        <button on:click={logOut} class="log-out-button">Log Out</button>
        {:else}
        <a
        sveltekit:prefetch
        class:active={typeof window !== 'undefined' &&
        (window?.location.pathname === '/log-in' ||
        window?.location.pathname === '/sign-up' ||
        window?.location.pathname === '/forgot-password' ||
        window?.location.pathname === '/reset-password' ||
        window?.location.pathname === '/confirm-email' ||
        window?.location.pathname === '/confirming-email')}
        href="/sign-up">Sign Up / Log In</a
        >
        {/if} -->

    <section class="secondary-navigation">
      <h4>Requests For Comment</h4>

      <a
        on:mouseup={handleClickOutside}
        sveltekit:prefetch
        href="/campaign-rfcs"
        class:active={window?.location.pathname === '/campaign-rfcs'}>Campaigns</a
      >

      <a
        on:mouseup={handleClickOutside}
        sveltekit:prefetch
        href="/checklist-rfcs"
        class:active={window?.location.pathname === '/checklist-rfcs'}>Checklist Items</a
      >
    </section>

    <section class="secondary-navigation">
      <h4>Community</h4>

      <a on:mouseup={handleClickOutside} href="https://www.reddit.com/r/latestage/"
        >r/latestage <div><RedditLogo /> <OpenInNew /></div></a
      >
      <a on:mouseup={handleClickOutside} href="https://www.reddit.com/r/antiwork/"
        >r/antiwork <div><RedditLogo /> <OpenInNew /></div></a
      >
      <a on:mouseup={handleClickOutside} href="https://www.reddit.com/r/lostgeneration/"
        >r/lostgeneration <div><RedditLogo /> <OpenInNew /></div></a
      >
    </section>
  </nav>
{/if}

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    height: calc(100vh - 24px);
    width: calc(100% / 3);
    background-color: var(--card-background);
    box-shadow: var(--page-shadow);
    border: 1px solid #55555522;
    z-index: 6;
    margin: 12px 21px;
    padding: 24px;
    border-radius: var(--border-radius);
    max-width: 400px;
    min-width: 275px;
    overflow-y: auto;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    height: auto;
    padding: 12px 0;
    margin-bottom: 24px;
    z-index: 7;
  }

  :global(nav header svg) {
    width: 40px;
    height: auto;
    margin-right: 16px;
  }

  .secondary-navigation {
    margin-top: 16px;
    padding: 16px 0px;
  }

  h4 {
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 16px;
  }

  a,
  .log-out-button {
    letter-spacing: 0.05em;
    font-size: 14px;
    margin-bottom: 4px;
    text-decoration: none;
    height: auto;
    min-height: 32px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    border-radius: var(--border-radius);
    transition: background-color 0.25s, color 0.25s;
    color: var(--text-color);
  }

  a:hover,
  a.active,
  .log-out-button:hover {
    background-color: var(--interactive-color);
    transition: background-color 0.2s, color 0.2s;
  }

  .log-out-button {
    background-color: transparent;
    border: 0;
    color: var(--interactive-color);
    text-transform: none;
    font-weight: 300;
    padding: 0;
    cursor: pointer;
    transform: none;
    justify-content: flex-start;
    padding-left: 16px;
  }

  .log-out-button:hover {
    box-shadow: none;
    transform: none;
  }

  .log-out-button:focus {
    box-shadow: none;
    transform: none;
  }

  :global(a svg) {
    height: 20px;
    width: 20px;
  }

  :global(a svg.notion, a svg.reddit) {
    fill: var(--text-color);
    margin-left: 4px;
  }

  :global(a svg.open-in-new) {
    fill: var(--interactive-color);
    margin-left: 4px;
    margin-bottom: -1px;
    transition: color 0.2s;
  }

  :global(a:hover svg.open-in-new) {
    fill: var(--text-color);
    transition: color 0.2s;
  }
</style>
