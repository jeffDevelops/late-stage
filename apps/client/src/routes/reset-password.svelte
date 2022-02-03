<script lang="ts">
  import { fade } from 'svelte/transition'
  import { session } from '$app/stores'
  import Controls from '../components/Controls.svelte'
  import Card from '../components/Card.svelte'
  import CheckIcon from '../components/iconography/Checkmark.svelte'
  import LockIcon from '../components/iconography/Lock.svelte'

  import { disableInteractablesWhile } from '../utility/disableInteractablesWhile'
  import { env } from '../networking/env'
  import { gqlRequest } from '../networking/gqlRequest'
  import { sendPasswordResetEmail } from '../networking/graphql/mutation/SendPasswordResetEmail'

  /**
   * STATE
   */

  let email = $session?.user?.email ?? ''
  let emailWasLoadedFromSession = !!$session?.user?.email
  let didRequestResend = false

  let emailError = ''
  let didAttemptSubmit = false

  /**
   * REACTIVE
   */

  // Email errors
  $: emailError = (() => {
    if (!email) {
      return 'Email address is required'
    }

    if (
      !email.match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      )
    ) {
      return 'Email address format invalid'
    }

    return ''
  })()

  /**
   * METHODS
   */

  const handleSendConfirmationEmail = async () => {
    didAttemptSubmit = true

    if (emailError) return

    await disableInteractablesWhile(async () => {
      await fetch(
        `${env.viteSveltekitHost}/proxy/send-password-reset-email`,
        gqlRequest({
          query: sendPasswordResetEmail,
          variables: {
            email,
          },
        }),
      )
    })

    didRequestResend = true
  }
</script>

<Controls />

<main class="password-reset-email-verification">
  <h1>Reset Password</h1>
  <h4>(Step 1 of 2)</h4>

  {#if !didRequestResend}
    <div in:fade out:fade>
      <Card>
        <h4><LockIcon /> Verify Your Identity</h4>
        <p>Before we reset your password, we need to make sure it's really you.</p>
        <p>
          Enter your email below. If an account with that email address exists, we'll send a magic
          link to that email inbox with instructions on how to reset your password.
        </p>
        <form on:submit|preventDefault={handleSendConfirmationEmail} out:fade in:fade class="flex">
          <div>
            <label for="password-reset-email-verification-input">Email Address</label>
            <input
              class:disabled={emailWasLoadedFromSession}
              disabled={emailWasLoadedFromSession}
              title={emailWasLoadedFromSession
                ? `You are currently logged in with email ${email} and can only reset that account's password unless you log out.`
                : 'Enter the email associated with your account'}
              id="password-reset-email-verification-input"
              type="text"
              bind:value={email}
            />

            {#if emailError && didAttemptSubmit}
              <p class="error-message">{emailError}</p>
            {/if}
          </div>

          <button
            style="margin-bottom: {emailError && didAttemptSubmit ? '37px' : '0'};"
            type="submit"
            class:disabled={didRequestResend}
            class="secondary">Send</button
          >
        </form>
      </Card>
    </div>
  {:else}
    <div in:fade={{ delay: 400 }} out:fade>
      <Card>
        <h4><CheckIcon /> Verification request sent!</h4>
        <p>
          If your email address exists in our system, we send you a magic link to reset your
          password. That link will take you to the next step.
        </p>
        <p>Feel free to close this tab in your browser.</p>
      </Card>
    </div>
  {/if}
</main>

<style>
  main {
    padding: 72px 48px 0;
    max-width: 750px;
    width: 100%;
    margin: 0 auto;
  }

  :global(.password-reset-email-verification h4 svg) {
    fill: var(--interactive-color);
    margin-bottom: -6px;
  }

  .password-reset-email-verification .flex {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16px;
  }

  .flex div {
    width: calc(100% - 16px - 172px); /* 100% - gap - button width */
  }

  form {
    margin: 24px 0 0;
  }

  label {
    margin-top: 0;
  }

  :global(.card h4:last-child) {
    margin-bottom: 0;
  }

  :global(.card h4 svg) {
    margin-right: 4px;
  }

  @media screen and (max-width: 730px) {
    .flex {
      flex-direction: column;
    }

    .flex button {
      width: 100%;
    }

    .flex div {
      width: 100%;
    }
  }

  @media screen and (max-width: 600px) {
    main {
      padding: 72px 0px 0;
    }
  }
</style>
