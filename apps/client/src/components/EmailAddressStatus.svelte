<script lang="ts">
  import { session } from '$app/stores'

  import Card from '../components/Card.svelte'
  import ThumbsUp from '../components/iconography/ThumbsUp.svelte'
  import ThumbsDown from '../components/iconography/ThumbsDown.svelte'

  import { navigationStatePriorToLogin } from '../stores/NavigationPriorToLogin'
  import { popularEmailDomains } from '../config/popularEmailDomains'

  /**
   * REACTIVE
   */

  $: userHasCommonEmailAddress = popularEmailDomains.some((emailDomain) =>
    $session?.user?.email.includes(`@${emailDomain}.`),
  )
</script>

<Card>
  <h4>
    {#if $session.user && userHasCommonEmailAddress === false}
      <span class="success-svg">
        <ThumbsUp />
      </span>
    {:else if !$session.user}
      {''}
    {:else}
      <ThumbsDown />
    {/if} Email Status
  </h4>

  {#if !$session.user}
    <p class="info-text">
      Late-Stage determines whether your identity might be traceable based on whether your email
      domain is one of the most common email domains, as opposed to a throwaway email address. Log
      in or register to continue.
    </p>
    <a
      on:mousedown={() => ($navigationStatePriorToLogin = { url: '/privacy', isExternal: false })}
      sveltekit:prefetch
      href="/log-in">Log In</a
    >
    <a
      on:mousedown={() => ($navigationStatePriorToLogin = { url: '/privacy', isExternal: false })}
      sveltekit:prefetch
      href="/register">Register</a
    >
  {:else}
    {#if userHasCommonEmailAddress}
      <p class="info-text">
        You've used a common email address domain to register for Late-Stage, such as "@gmail.com"
        or "@yahoo.com."
      </p>

      <p class="info-text">
        If our servers were ever compromised, a bad actor might be able to single you out from an
        email address that might be tied to your identity on other platforms.
      </p>

      <p class="info-text">
        Please take a moment to change your email and username now, so that they can't be tied to
        your identity.
      </p>
    {:else}
      <p class="info-text success-text">
        You're not using a common email address domain to register for Late-Stage, such as
        "@gmail.com" or "@yahoo.com."
      </p>

      <p class="info-text">
        <strong>This isn't enough to prove that your identity is safe.</strong>
      </p>

      <p class="info-text">
        If our servers were ever compromised, a bad actor might be able to single you out from an
        email address that might be tied to your identity on other platforms.
      </p>
      <p class="info-text">
        Take a moment to change your email address and/or username, if it could be associated with
        any other accounts on the Internet.
      </p>
    {/if}

    <a href="/user-settings" class="button">Change Email / Username</a>
  {/if}

  <h4 class="info-text">Why even require an email address?</h4>
  <p class="info-text">
    Requiring an extra factor during user registration helps prevent spam accounts from being
    created, and prevents bots from registering.
  </p>
</Card>

<style>
  .info-text {
    margin-bottom: 16px;
    font-size: 0.9rem;
    color: var(--text-color-subdued);
  }

  .success-text {
    color: var(--success-color);
  }

  a {
    display: block;
  }

  a:first-of-type {
    margin-bottom: 8px;
  }

  h4.info-text {
    margin-top: 32px;
  }
</style>
