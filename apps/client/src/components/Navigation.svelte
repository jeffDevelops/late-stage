<script lang="ts">
  import { fly } from 'svelte/transition'
  import { page, session } from '$app/stores'
  import { browser } from '$app/env'

  import Logo from './Logo.svelte'
  import NotionLogo from './iconography/Notion.svelte'
  import RedditLogo from './iconography/Reddit.svelte'
  import DiscordLogo from './iconography/Discord.svelte'
  import OpenInNew from './iconography/OpenInNew.svelte'

  import { shouldDisplayNav } from '../stores/Navigation'
  import { ip } from '../stores/IP'
  import { clickOutside } from '../directives/clickOutside'
  import { logOut } from '../networking/shared/logout'
  import { popularEmailDomains } from '../config/popularEmailDomains'

  const handleClickOutside = () => shouldDisplayNav.update(() => false)

  /**
   * REACTIVE
   */
  $: userHasCommonEmailAddress = popularEmailDomains.some((emailDomain) =>
    $session.user?.email.includes(`@${emailDomain}.`),
  )
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
      class:active={typeof window !== 'undefined' && $page.url.pathname === '/'}>Home</a
    >

    <a
      on:mouseup={handleClickOutside}
      sveltekit:prefetch
      href="/checklist"
      class:active={$page.url.pathname === '/checklist'}>Checklist</a
    >

    <a
      on:mouseup={handleClickOutside}
      sveltekit:prefetch
      href="/about"
      class:active={typeof window !== 'undefined' && $page.url.pathname === '/about'}>About</a
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
      class:active={$page.url.pathname === '/audit'}>Audit</a
    >

    <a
      on:mouseup={handleClickOutside}
      sveltekit:prefetch
      href="/resources"
      class:active={$page.url.pathname === '/resources'}>Resources</a
    >

    <a
      on:mouseup={handleClickOutside}
      sveltekit:prefetch
      href="/privacy"
      class:active={$page.url.pathname === '/privacy'}
      >Privacy & Anonymity {#if userHasCommonEmailAddress || (typeof $ip === 'object' && !$ip.didConfirmBrowsingWithVPN)}
        <div class="notification">!</div>
      {/if}</a
    >

    {#if $session.user}
      <button on:click={logOut} class="log-out-button">Log Out</button>
    {:else}
      <a
        on:mouseup={handleClickOutside}
        sveltekit:prefetch
        class:active={browser &&
          ($page.url.pathname === '/log-in' ||
            $page.url.pathname === '/sign-up' ||
            $page.url.pathname === '/forgot-password' ||
            $page.url.pathname === '/reset-password' ||
            $page.url.pathname === '/confirm-email' ||
            $page.url.pathname === '/confirm-user-callback')}
        href="/register">Register / Log In</a
      >
    {/if}

    <section class="secondary-navigation">
      <h4>Requests For Comment</h4>

      <a
        on:mouseup={handleClickOutside}
        sveltekit:prefetch
        href="/campaign-rfcs"
        class:active={$page.url.pathname === '/campaign-rfcs'}>Campaigns</a
      >

      <a
        on:mouseup={handleClickOutside}
        sveltekit:prefetch
        href="/checklist-rfcs"
        class:active={$page.url.pathname === '/checklist-rfcs'}>Checklist Items</a
      >
    </section>

    <section class="secondary-navigation">
      <h4>Community</h4>

      <a on:mouseup={handleClickOutside} href="https://www.reddit.com/r/latestage/"
        >r/latestage <div><RedditLogo /> <OpenInNew /></div></a
      >
      <a on:mouseup={handleClickOutside} href="https://discord.gg/DAa7mCae"
        >Discord <div><DiscordLogo /> <OpenInNew /></div></a
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
    top: 16px;
    left: 0;
    height: calc(100vh - 48px);
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
    transition: background-color 0.1s, color 0.1s;
    color: var(--text-color);
  }

  a:hover,
  a.active,
  .log-out-button:hover {
    background-color: var(--interactive-color);
    transition: background-color 0.1s, color 0.1s;
    color: var(--button-text-color);
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

  .notification {
    border-radius: 50%;
    height: 20px;
    width: 20px;
    max-height: 20px;
    min-height: 20px;
    max-width: 20px;
    min-width: 20px;
    background-color: var(--interactive-color);
    color: var(--button-text-color);
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    font-family: var(--font-display);
    padding-top: 3px;
    padding-left: 1px;
  }

  a:hover .notification,
  a.active .notification {
    background-color: var(--button-text-color);
    transition: background-color 0.1s, color 0.1s;
    color: var(--interactive-color);
  }

  :global(a svg) {
    height: 20px;
    width: 20px;
  }

  :global(#main-navigation a svg.notion, a svg.reddit) {
    fill: var(--text-color);
    margin-left: 4px;
  }

  :global(#main-navigation a svg.open-in-new) {
    fill: var(--interactive-color);
    margin-left: 4px;
    margin-bottom: -1px;
    transition: color 0.1s;
  }

  :global(#main-navigation a:hover svg.open-in-new) {
    fill: var(--text-color);
    transition: color 0.1s;
  }
</style>
