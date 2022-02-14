<script lang="ts">
  import { fade } from 'svelte/transition'
  import { goto } from '$app/navigation'
  import { session } from '$app/stores'

  import VisibilityOnIcon from '../components/iconography/VisibilityOn.svelte'
  import VisibilityOffIcon from '../components/iconography/VisibilityOff.svelte'
  import Controls from '../components/Controls.svelte'
  import EmailIcon from '../components/iconography/Email.svelte'
  import AccountIcon from '../components/iconography/Account.svelte'

  import { navigationStatePriorToLogin } from '../stores/NavigationPriorToLogin'
  import { env } from '../networking/env'
  import { gqlRequest } from '../networking/gqlRequest'
  import { authenticateUser } from '../networking/graphql/mutation/AuthenticateUser'
  import { currentUser } from '../networking/graphql/query/CurrentUser'

  import { disableInteractablesWhile } from '../utility/disableInteractablesWhile'
  import { tick } from 'svelte'

  /**
   * STATE
   */

  /** Toggle to allow user to log in with username or email address */
  let loggingInWithEmail = false

  let username = ''
  let email = ''

  let password = ''
  let passwordMasked = true

  let loading = false

  let errors = {
    email: '',
    username: '',
    password: '',

    form: '',
  }

  let didAttemptSubmit = false

  /**
   * REACTIVE
   */

  $: formContainsErrors = Object.values(errors).some((value) => !!value)

  // Username errors
  $: {
    errors = (() => {
      if (!username && !loggingInWithEmail) {
        errors.username = 'Username is required'
        return errors
      }

      errors.username = ''
      return errors
    })()
  }

  // Email errors
  $: {
    errors = (() => {
      if (!email && loggingInWithEmail) {
        errors.email = 'Email address is required'
        return errors
      }

      if (
        loggingInWithEmail &&
        !email.match(
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        )
      ) {
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

      errors.password = ''
      return errors
    })()
  }

  /**
   * METHODS
   */

  const handleSubmit = async () => {
    errors.form = ''
    await tick()

    didAttemptSubmit = true

    // Prevent submission if there are any errors
    if (formContainsErrors) return

    loading = true

    const success = await disableInteractablesWhile<boolean>(async () => {
      try {
        const response = await fetch(
          `${env.viteSveltekitHost}/proxy/authenticate`,
          gqlRequest({
            query: authenticateUser,
            variables: {
              authenticateUserInput: {
                email: loggingInWithEmail ? email : undefined,
                username: loggingInWithEmail ? undefined : username,
                credential: loggingInWithEmail ? 'EMAIL' : 'USERNAME',
                password,
              },
            },
          }),
        ).then(async (response) => await response.json())

        if (response?.error?.message) throw response.error.message

        const currentUserResponse = await fetch(
          `/proxy/current-user`,
          gqlRequest({
            query: currentUser(`
              id
              username
              email
              emailIsVerified
              banned
              createdAt
              cred
              isAdmin
            `),
          }),
        )

        const deserialized = await currentUserResponse.json()

        session.update((previous) => ({ ...previous, user: deserialized }))

        return true

        /**
         * A reactive statement in __layout redirects when session is updated
         * and user is on a route that should not be accessible when logged in
         * (like this one!).
         */
      } catch (error) {
        console.log({ error })
        if (error === 'Unable to find user with provided credentials.') {
          errors.form = `${error} Please check your email and password, and try again.`
        }

        return false
      }
    })

    if (success) {
      await goto($navigationStatePriorToLogin?.url ?? '/')
    }
  }
</script>

<Controls />

<main>
  <section class="log-in">
    <h1>Log In</h1>

    <form on:submit|preventDefault={handleSubmit}>
      {#if loggingInWithEmail}
        <div class="column">
          <label for="log-in-email">Email Address</label>
          <div class="flex">
            <input type="text" id="log-in-email" bind:value={email} />
            <button
              class:disabled={loading}
              type="button"
              on:click={() => (loggingInWithEmail = !loggingInWithEmail)}
              class="secondary"
            >
              <AccountIcon />
            </button>
          </div>
        </div>
      {:else}
        <div class="column">
          <label for="log-in-password">Username</label>
          <div class="flex">
            <input type="text" id="log-in-username" bind:value={username} />
            <button
              class:disabled={loading}
              type="button"
              on:click={() => (loggingInWithEmail = !loggingInWithEmail)}
              class="secondary"
            >
              <EmailIcon />
            </button>
          </div>
        </div>
      {/if}

      {#if ((loggingInWithEmail && errors.email) || (!loggingInWithEmail && errors.username)) && didAttemptSubmit}
        <p in:fade out:fade class="error-message">
          {loggingInWithEmail ? errors.email : errors.username}
        </p>
      {/if}

      <label for="log-in-password">Password</label>
      <div class="flex">
        {#if passwordMasked}
          <input type="password" id="log-in-password" bind:value={password} />
        {:else}
          <input type="text" id="log-in-password" bind:value={password} />
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

      {#if errors.form}
        <p in:fade out:fade class="error-message">{errors.form}</p>
      {/if}

      <div class="actions">
        <a href="/register"
          ><button type="button" class="secondary"><span>Not registered yet?</span> Register</button
          ></a
        >
        <button
          disabled={loading || (didAttemptSubmit && formContainsErrors)}
          class:disabled={loading || (didAttemptSubmit && formContainsErrors)}
          type="submit"
          class="primary">Log In</button
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
    padding: 40px 48px 0;
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

  :global(.log-in h3 svg) {
    height: 24px;
    width: 24px;
    margin-bottom: -6px;
    margin-right: 8px;
  }

  :global(.log-in .card) {
    margin-top: 40px;
  }

  :global(.log-in svg) {
    fill: var(--interactive-color);
    height: 16px;
    width: 16px;
  }

  :global(.log-in label svg) {
    margin-bottom: -3px;
    cursor: pointer;
  }

  form {
    width: 100%;
    max-width: 550px;
    margin: 0 auto;
  }

  a {
    text-shadow: 1px 1px 1px var(--app-background);
  }

  button.secondary {
    padding: 0 16px;
    text-shadow: 1px 1px 1px var(--app-background);
    font-size: 0.75rem;
  }

  button.secondary span {
    text-transform: none;
  }

  .error-message {
    margin-top: 16px;
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

  .column {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  @media screen and (min-width: 1500px) {
    section {
      height: auto;
      position: absolute;
      bottom: 14vh;
      right: 16vw;
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
      bottom: 18vh;
      right: 17vw;
    }
  }

  @media screen and (max-width: 700px) {
    .actions {
      flex-direction: column-reverse;
    }

    .actions a {
      width: 100%;
    }

    button.primary,
    button.secondary {
      display: block;
      width: 100%;
      margin-bottom: 16px;
    }
  }

  @media screen and (max-width: 600px) {
    section {
      max-width: 400px;
      padding: 80px 0px 0;
    }
  }
</style>
