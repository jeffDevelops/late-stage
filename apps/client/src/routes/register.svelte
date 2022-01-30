<script lang="ts">
  import { fade } from 'svelte/transition'
  import lodash from 'lodash'
  import isEmail from 'validator/lib/isEmail'

  import InfoIcon from '../components/iconography/Info.svelte'
  import VisibilityOnIcon from '../components/iconography/VisibilityOn.svelte'
  import VisibilityOffIcon from '../components/iconography/VisibilityOff.svelte'
  import Controls from '../components/Controls.svelte'

  import { env } from '../networking/env'
  import { gqlRequest } from '../networking/gqlRequest'
  import { userWhereUniqueInput } from '../networking/graphql/query/UserWhereUniqueInput'
  import { registerUser } from '../networking/graphql/mutation/RegisterUser'

  import { disableInteractablesWhile } from '../utility/disableInteractablesWhile'
  import { goto, prefetch } from '$app/navigation'

  const { debounce } = lodash

  /**
   * STATE
   */

  let username = ''
  let usernameTaken = false

  let email = ''

  let password = ''
  let passwordWarning = ''
  let passwordMasked = true

  let honeypot = ''

  let loading = false

  let errors = {
    username: '',
    email: '',
    password: '',

    form: '',
  }

  let didAttemptSubmit = false

  /**
   * REACTIVE
   */

  $: formContainsErrors = Object.values(errors).some((value) => !!value)

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

      errors.email = ''
      return errors
    })()
  }

  // Password errors
  $: {
    errors = (() => {
      if (!password) {
        errors.password = 'Password is required'
        return errors
      }

      if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters in length'
        return errors
      }

      errors.password = ''
      passwordWarning = ''
      return errors
    })()
  }

  $: {
    passwordWarning = (() => {
      if (password.trim() !== password) {
        return 'Did you mean to add whitespace to the beginning or end of your password?'
      }

      return ''
    })()
  }

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
            `${env.viteSveltekitHost}/proxy/register`,
            gqlRequest({
              query: registerUser,
              variables: {
                userRegistrationInput: {
                  username: username.trim(),
                  email: email.trim(),
                  password,
                },
              },
            }),
          ).then(async (response) => await response.json()),
        ])

        if (response?.error?.message) throw response.error.message

        success = true
      } catch (error) {
        if (error === 'A user with that username already exists. Please try another.') {
          usernameTaken = true
          return
        }

        errors.form = 'An unknown error occurred. Please try again later.'
      }
    })

    if (success) {
      await goto('/verify-email')
    }
  }

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
</script>

<Controls />

<main>
  <section in:fade out:fade class="register">
    <h1>Register</h1>

    <form on:submit|preventDefault={handleSubmit}>
      <label for="register-username">Username</label>
      <input class:disabled={loading} id="register-username" bind:value={username} />
      {#if errors.username && (didAttemptSubmit || usernameTaken)}
        <p in:fade out:fade class="error-message">{errors.username}</p>
      {/if}

      <label for="register-email"
        >Email <span
          class="tooltip-container"
          title="Your email is used log in and recover your account if your forget your password."
          ><InfoIcon /></span
        ></label
      >
      <input class:disabled={loading} id="register-email" bind:value={email} />
      {#if errors.email && didAttemptSubmit}
        <p in:fade out:fade class="error-message">{errors.email}</p>
      {/if}

      <div class="zip-code">
        <label for="zip-code">Zip code</label>
        <input
          class:disabled={loading}
          id="zip-code"
          autocomplete="off"
          bind:value={honeypot}
          aria-label="If you are reading this, do not fill this out."
        />
      </div>

      <label class:disabled={loading} for="register-password">Password</label>
      <div class="flex">
        {#if passwordMasked}
          <input type="password" id="register-password" bind:value={password} />
        {:else}
          <input type="text" id="register-password" bind:value={password} />
        {/if}

        <button
          class:disabled={loading}
          type="button"
          on:click={() => (passwordMasked = !passwordMasked)}
          class="secondary"
        >
          {#if passwordMasked}
            <VisibilityOnIcon />
          {:else}
            <VisibilityOffIcon />
          {/if}
        </button>
      </div>
      {#if errors.password && didAttemptSubmit}
        <p in:fade out:fade class="error-message">{errors.password}</p>
      {/if}

      {#if passwordWarning}
        <p in:fade out:fade class="password-warning">{passwordWarning}</p>
      {/if}

      {#if errors.form}
        <p in:fade out:fade class="error-message">{errors.form}</p>
      {/if}

      <div class="actions">
        <a class="secondary" href="/log-in"
          ><button class="secondary"><span>Already a member?</span> Log In</button></a
        >
        <button
          class:disabled={didAttemptSubmit && formContainsErrors}
          type="submit"
          class="primary">Register</button
        >
      </div>
    </form>
  </section>
</main>

<style>
  main {
    height: calc(100vh - 140px);
    width: 100%;
  }

  section {
    width: 100%;
    max-width: 550px;
    padding: 50px 48px 0;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
    margin-bottom: 40px;
  }

  p {
    color: var(--text-color-subdued);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  :global(.register h3 svg) {
    height: 24px;
    width: 24px;
    margin-bottom: -6px;
    margin-right: 8px;
  }

  :global(.register .card) {
    margin-top: 40px;
  }

  :global(.register svg) {
    fill: var(--interactive-color);
    height: 16px;
    width: 16px;
  }

  :global(.register .secondary svg) {
    fill: var(--interactive-color);
  }

  :global(.register label svg) {
    margin-bottom: -3px;
    cursor: pointer;
  }

  form {
    width: 100%;
    max-width: 550px;
    margin: 0 auto;
  }

  .password-warning {
    color: var(--text-color-subdued);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.05em;
    margin-top: 8px;
  }

  .zip-code {
    position: absolute;
    top: 0px;
    opacity: 0;
    width: calc(100% - 96px);
  }

  button.primary {
    padding: 0 24px;
    min-width: 0;
    width: auto;
  }

  button.secondary {
    padding: 0 16px;
    text-shadow: 1px 1px 1px var(--app-background);
  }

  button.secondary span {
    text-transform: none;
  }

  .actions {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  .flex input {
    width: calc(100% - 16px - 40px);
  }

  .flex button.secondary {
    width: 40px;
    min-width: 0;
    margin-bottom: 0;
    padding: 3px 0 0 0;
  }

  @media screen and (min-width: 1500px) {
    section {
      height: auto;
      position: absolute;
      bottom: 14vh;
      right: 15vw;
    }
  }

  @media screen and (min-width: 800px) and (min-height: 800px) {
    section {
      height: auto;
      position: absolute;
      bottom: 14vh;
      right: 15vw;
    }
  }

  @media screen and (min-width: 700px) and (min-height: 800px) {
    section {
      height: auto;
      position: absolute;
      bottom: 16vh;
      right: 13vw;
    }
  }

  @media screen and (max-width: 700px) {
    section {
      padding: 160px 0px 0;
    }
  }

  @media screen and (max-width: 600px) {
    section {
      max-width: 400px;
      padding: 140px 0px 0;
    }

    .actions {
      flex-direction: column-reverse;
    }

    button.primary,
    a,
    button.secondary {
      display: block;
      width: 100%;
      margin-bottom: 16px;
    }
  }
</style>
