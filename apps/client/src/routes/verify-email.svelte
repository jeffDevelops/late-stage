<script lang="ts">
  import { fade } from 'svelte/transition'
  import { disableInteractablesWhile } from '../utility/disableInteractablesWhile'
  import { env } from '../networking/env'
  import { gqlRequest } from '../networking/gqlRequest'
  import { confirmUser } from '../networking/graphql/mutation/ConfirmUser'
  import CheckIcon from '../components/iconography/Checkmark.svelte'
  import EmailIcon from '../components/iconography/Email.svelte'
  import Card from '../components/Card.svelte'

  /**
   * STATE
   */

  let email = ''
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

  const handleSendConfirmationEmailAgain = async () => {
    didAttemptSubmit = true

    if (emailError) return

    await disableInteractablesWhile(async () => {
      await fetch(
        `${env.viteSveltekitHost}/proxy/confirm-user`,
        gqlRequest({
          query: confirmUser,
          variables: {
            email,
          },
        }),
      )
    })

    didRequestResend = true
  }
</script>

<main class="verify-email">
  <h1><EmailIcon /> Check Your Email</h1>

  <Card>
    <h4>Thank you for signing up!</h4>

    <p>
      An email was sent to the email address you provided. You'll need to click the confirmation
      link in that email to confirm your email address.
    </p>

    <p>For your security, it expires in five minutes.</p>

    <p>You may now close this tab in your browser.</p>
  </Card>

  {#if !didRequestResend}
    <div out:fade in:fade>
      <Card>
        <h4>Didn't get an email?</h4>
        <form on:submit|preventDefault={handleSendConfirmationEmailAgain} class="flex">
          <div>
            <label for="verify-email-input">Email Address</label>
            <input id="verify-email-input" type="text" bind:value={email} />

            {#if emailError && didAttemptSubmit}
              <p class="error-message">{emailError}</p>
            {/if}
          </div>

          <button
            style="margin-bottom: {emailError && didAttemptSubmit ? '37px' : '0'};"
            type="submit"
            class:disabled={didRequestResend}
            class="secondary">Send It Again</button
          >
        </form>
      </Card>
    </div>
  {:else}
    <div out:fade in:fade>
      <Card>
        <h4 class="sent" in:fade={{ delay: 400 }} out:fade>
          <CheckIcon /> Verification email sent!
        </h4>
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

  .verify-email h4.sent {
    margin-bottom: 0;
  }

  :global(.verify-email h4 svg) {
    fill: var(--interactive-color);
    margin-bottom: -6px;
    margin-right: 8px;
  }

  :global(.verify-email .card) {
    margin-bottom: 16px;
  }

  .verify-email .flex {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16px;
  }

  .flex div {
    width: calc(100% - 16px - 172px); /* 100% - gap - button width */
  }

  form {
    margin: 0;
  }

  label {
    margin-top: 0;
  }

  :global(.verify-email h1 svg) {
    height: 32px;
    width: 32px;
    fill: var(--interactive-color);
    margin-right: 8px;
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
