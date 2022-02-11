<script lang="ts">
  import Card from '../components/Card.svelte'
  import ThumbsUp from '../components/iconography/ThumbsUp.svelte'
  import ThumbsDown from '../components/iconography/ThumbsDown.svelte'

  import { popularEmailDomains } from '../config/popularEmailDomains'
  import { session } from '$app/stores'

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
    <p class="info-text">Not logged in</p>
    <a sveltekit:prefetch href="/log-in">Log In</a>
    <a sveltekit:prefetch href="/register">Register</a>
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
</style>
