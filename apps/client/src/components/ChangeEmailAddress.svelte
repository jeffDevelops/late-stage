<script lang="ts">
  import { fade } from 'svelte/transition'
  import validator from 'validator'
  import { session } from '$app/stores'
  import { goto, prefetch } from '$app/navigation'
  import Card from './Card.svelte'
  import Modal from './Modal.svelte'
  import EmailIcon from './iconography/Email.svelte'

  import { gqlRequest } from '../networking/gqlRequest'
  import { env } from '../networking/env'
  import { disableInteractablesWhile } from '../utility/disableInteractablesWhile'
  import { updateEmailAddress } from '../networking/graphql/mutation/UpdateEmailAddress'
  import { confirmUser } from '../networking/graphql/mutation/ConfirmUser'

  const { isEmail } = validator

  /**
   * STATE
   */

  let email = ''
  let honeypot = ''
  let didAttemptSubmit = false
  let errors = {
    email: '',
    form: '',
  }
  let loading = false

  /**
   * REACTIVE
   */

  // Email errors
  $: {
    errors = (() => {
      if (!email) {
        errors.email = 'Email address is required'
        return errors
      }

      if (!isEmail(email)) {
        errors.email = 'Email address format invalid'
        return errors
      }

      if (email === $session.user.email) {
        errors.email = 'This is already your current email address'
        return errors
      }

      errors.email = ''
      return errors
    })()
  }

  $: formContainsErrors = Object.values(errors).some((value) => !!value)

  /**
   * METHODS
   */
  const handleSubmit = async () => {
    didAttemptSubmit = true

    // Prevent submission if there are any errors
    if (formContainsErrors) return

    if (honeypot) {
      loading = true
      return await disableInteractablesWhile(async () => {
        setTimeout(async () => {
          loading = false
          await goto('/verify-email')
        }, 2000)
      })
    }

    loading = true

    let success = false
    await disableInteractablesWhile(async () => {
      try {
        const [_, response] = await Promise.all([
          prefetch('/verify-email'),
          fetch(
            `${env.viteSveltekitHost}/proxy/update-email-address`,
            gqlRequest({
              query: updateEmailAddress(`
                id
                email
                username
                emailIsVerified
                cred
                isAdmin
                banned
                createdAt
              `),
              variables: {
                newEmailAddress: email.trim(),
              },
            }),
          ).then(async (response) => await response.json()),
        ])

        await fetch(
          `${env.viteSveltekitHost}/proxy/confirm-user`,
          gqlRequest({
            query: confirmUser,
            variables: {
              email,
            },
          }),
        )

        if (response?.error?.message) throw response.error.message

        $session.user.email = email

        email = ''
        didAttemptSubmit = false
        loading = false
        success = true
      } catch (error) {
        errors.form = 'An unknown error occurred. Please try again later.'
      }
    })

    if (success) await goto('/verify-email')
  }
</script>

<main>
  <Card>
    <h4><EmailIcon /> Change Email Address</h4>
    <p>
      Use a throwaway email address, so that no one can single you out in the event that Late-Stage
      is compromised.
    </p>
    <p>
      Don't use an email address that might identify you in any way, including emails you've used on
      other platforms.
    </p>

    <form on:submit|preventDefault={handleSubmit}>
      <div class="old-email-address">
        <label for="old-email-address">Old Email Address</label>
        <input
          class:disabled={loading}
          id="old-email-address"
          autocomplete="off"
          bind:value={honeypot}
          aria-label="If you are reading this, do not fill this out."
        />
      </div>

      <label for="change-email-address">New Email Address</label>
      <input class:disabled={loading} id="change-email-address" bind:value={email} />

      {#if errors.email && didAttemptSubmit}
        <p in:fade out:fade class="error-message">{errors.email}</p>
      {/if}

      {#if errors.form}
        <p in:fade out:fade class="error-message">{errors.form}</p>
      {/if}

      <button
        class:disabled={loading || (didAttemptSubmit && formContainsErrors)}
        class="primary"
        type="submit">Change Email Address</button
      >
    </form>
  </Card>
</main>

<style>
  label {
    margin-top: 24px;
  }

  button {
    margin-top: 16px;
    width: 100%;
  }

  .old-email-address {
    position: absolute;
    top: 0px;
    opacity: 0;
    width: calc(100% - 96px);
  }
</style>
