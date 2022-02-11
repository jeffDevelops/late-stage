<script lang="ts">
  import { fade } from 'svelte/transition'
  import lodash from 'lodash'
  import { goto, prefetch } from '$app/navigation'
  import Card from '../components/Card.svelte'
  import AccountIcon from '../components/iconography/Account.svelte'
  import Modal from '../components/Modal.svelte'
  import Checkmark from './iconography/Checkmark.svelte'

  import { userWhereUniqueInput } from '../networking/graphql/query/UserWhereUniqueInput'
  import { updateUsername } from '../networking/graphql/mutation/UpdateUsername'
  import { env } from '../networking/env'
  import { gqlRequest } from '../networking/gqlRequest'
  import { disableInteractablesWhile } from '../utility/disableInteractablesWhile'

  const { debounce } = lodash

  /**
   * STATE
   */

  let username = ''
  let usernameTaken = false

  let honeypot = ''

  let loading = false

  let success = false
  let errors = {
    username: '',
    form: '',
  }

  let didAttemptSubmit = false

  // User identity
  $: if (username) verifyUsernameUniqueness()

  // Username errors
  $: {
    errors = (() => {
      if (!username) {
        errors.username = 'Username is required'
        return errors
      }

      if (username.length < 2) {
        errors.username = 'Username must be at least 2 characters'
        return errors
      }

      const unacceptableLeadingAndTrailingCharacters = ['-', '_', '.']
      const startsWithOrEndsWithUnacceptableCharacter =
        unacceptableLeadingAndTrailingCharacters.some(
          (character) => username.startsWith(character) || username.endsWith(character),
        )

      if (!username.match(/^[a-zA-Z0-9_\.\-]*$/) || startsWithOrEndsWithUnacceptableCharacter) {
        errors.username =
          'Username must be alphanumeric. Periods, hyphens, and underscores may only be used as separators.'
        return errors
      }

      if (usernameTaken) {
        errors.username = 'Username is taken. Please choose another.'
        return errors
      }

      errors.username = ''
      return errors
    })()
  }

  $: formContainsErrors = Object.values(errors).some((value) => !!value)

  /**
   * METHODS
   */

  const verifyUsernameUniqueness = debounce(async () => {
    const result = await fetch(
      `${env.viteSveltekitHost}/proxy/user-where`,
      gqlRequest({
        query: userWhereUniqueInput('id'),
        variables: {
          where: {
            username,
          },
        },
      }),
    ).then(async (response) => await response.json())

    usernameTaken = !!result
  }, 500)

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

    await disableInteractablesWhile(async () => {
      try {
        const response = await fetch(
          `${env.viteSveltekitHost}/proxy/update-username`,
          gqlRequest({
            query: updateUsername(`
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
              newUsername: username.trim(),
            },
          }),
        ).then(async (response) => await response.json())

        if (response?.error?.message) throw response.error.message

        success = true
        didAttemptSubmit = false
        username = ''
      } catch (error) {
        if (error === 'A user with that username already exists. Please try another.') {
          usernameTaken = true
          return
        }

        errors.form = 'An unknown error occurred. Please try again later.'
      }
    })
  }
</script>

<Modal
  on:dismiss={() => (success = false)}
  isAnimated={true}
  isBlurDismissable={true}
  isDisplayed={success}
  maxWidth={400}
>
  <section class="modal" slot="content">
    <div class="modal-checkmark">
      <Checkmark />
    </div>

    <h1>Success</h1>

    <p>You have successfully changed your username.</p>

    <p>Your old username has been completely deleted from the system.</p>

    <p>You'll need to log in with this new username from here on out.</p>
  </section>
  <section slot="actions">
    <button on:click={() => (success = false)} class="primary">Done</button>
  </section>
</Modal>

<Card>
  <h4><AccountIcon /> Change Username</h4>
  <p>
    Don't use a username that might identify you in any way, including using a username (or
    variation on a username) you've used on other platforms.
  </p>

  <form on:submit|preventDefault={handleSubmit}>
    <div class="old-username">
      <label for="old-username">Old Username</label>
      <input
        class:disabled={loading}
        id="old-username"
        autocomplete="off"
        bind:value={honeypot}
        aria-label="If you are reading this, do not fill this out."
      />
    </div>

    <label for="register-username">Username</label>
    <input class:disabled={loading} id="register-username" bind:value={username} />

    {#if errors.username && (didAttemptSubmit || usernameTaken)}
      <p in:fade out:fade class="error-message">{errors.username}</p>
    {/if}

    {#if errors.form}
      <p in:fade out:fade class="error-message">{errors.form}</p>
    {/if}

    <button
      class:disabled={loading || (didAttemptSubmit && formContainsErrors)}
      class="primary"
      type="submit">Change Username</button
    >
  </form>
</Card>

<style>
  .modal-checkmark {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
  }

  :global(.modal-checkmark svg) {
    width: 60px;
    height: 60px;
    fill: var(--success-color) !important;
  }

  .modal h1 {
    text-align: center;
  }

  label {
    margin-top: 24px;
  }

  button {
    margin-top: 16px;
    width: 100%;
  }

  .old-username {
    position: absolute;
    top: 0px;
    opacity: 0;
    width: calc(100% - 96px);
  }
</style>
