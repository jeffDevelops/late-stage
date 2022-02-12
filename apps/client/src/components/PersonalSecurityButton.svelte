<script lang="ts">
  import { session } from '$app/stores'
  import { ip } from '../stores/IP'
  import FloatingActionButton from './FloatingActionButton.svelte'
  import Shield from './iconography/Shield.svelte'
  import { popularEmailDomains } from '../config/popularEmailDomains'

  /**
   * REACTIVE
   */
  $: userHasCommonEmailAddress = popularEmailDomains.some((emailDomain) =>
    $session.user?.email.includes(`@${emailDomain}.`),
  )
</script>

<a class="personal-security-button" sveltekit:prefetch href="/privacy">
  <FloatingActionButton type="button">
    {#if userHasCommonEmailAddress || (typeof $ip === 'object' && !$ip.didConfirmBrowsingWithVPN)}
      <div class="notification">!</div>
    {/if}

    <Shield />
  </FloatingActionButton>
</a>

<style>
  .personal-security-button {
    position: fixed;
    bottom: 48px;
    right: 4px;
  }

  .notification {
    border-radius: 50%;
    height: 28px;
    width: 28px;
    max-height: 28px;
    min-height: 28px;
    max-width: 28px;
    min-width: 28px;
    position: absolute;
    top: -16px;
    left: -16px;
    background-color: var(--interactive-color);
    color: var(--button-text-color);
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    font-family: var(--font-display);
    padding-top: 4px;
  }

  :global(.personal-security-button svg) {
    fill: var(--interactive-color);
    width: 22px !important;
    height: 22px !important;
  }
</style>
