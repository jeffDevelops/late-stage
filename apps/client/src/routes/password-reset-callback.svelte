<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit'
  export async function load({ fetch, url, session }: LoadInput): Promise<LoadOutput> {
    const email = url.searchParams.get('email')
    const token = url.searchParams.get('token')

    // Loosely validate the url and prevent loading the page when the session email doesn't match the url email
    if (!token || !email || (session?.user?.email && session?.user?.email !== email)) {
      return {
        redirect: '/__error',
        status: 303,
      }
    }

    return {
      status: 200,
      props: {
        email,
        token,
      },
    }
  }
</script>

<script lang="ts">
  import { goto, prefetch } from '$app/navigation'
  import { session } from '$app/stores'
  import Card from '../components/Card.svelte'
  import VisibilityOnIcon from '../components/iconography/VisibilityOn.svelte'
  import VisibilityOffIcon from '../components/iconography/VisibilityOff.svelte'
  import LockIcon from '../components/iconography/Lock.svelte'

  import { gqlRequest } from '../networking/gqlRequest'
  import { updatePassword } from '../networking/graphql/mutation/UpdatePassword'
  import { currentUser } from '../networking/graphql/query/CurrentUser'
  import { disableInteractablesWhile } from '../utility/disableInteractablesWhile'
  import { navigationStatePriorToLogin } from '../stores/NavigationPriorToLogin'

  const EXPIRED_TOKEN_ERROR =
    'The magic link you used has expired. Magic links expire after 5 minutes for your security.'
  const SINGLE_USE_ERROR = 'Magic links are single use. Please request a new one.'

  /**
   * PROPS
   */
  export let token: string
  export let email: string

  /**
   * STATE
   */
  let password = ''
  let passwordMasked = true
  let didAttemptSubmit = false
  let loading = false
  let formError = ''

  /**
   * METHODS
   */

  const handleUpdatePassword = async () => {
    if (password.length < 8) {
      return
    }

    didAttemptSubmit = true

    const success = await disableInteractablesWhile<boolean>(async () => {
      const response = await fetch(
        `/proxy/update-password`,
        gqlRequest({
          query: updatePassword,
          variables: {
            password,
            token,
            email,
          },
        }),
      )

      const deserialized = await response.json()

      if (deserialized.error) {
        if (
          deserialized.error.message === EXPIRED_TOKEN_ERROR ||
          deserialized.error.message ===
            'Token in magic link does not match the one that was most recently issued'
        ) {
          formError = EXPIRED_TOKEN_ERROR
          return false
        }

        if (deserialized.error.message === SINGLE_USE_ERROR) {
          formError = SINGLE_USE_ERROR
          return false
        }

        formError = 'An unknown error occurred'
        return false
      }

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

      const currentUserDeserialized = await currentUserResponse.json()

      session.update((previous) => ({
        ...previous,
        user: currentUserDeserialized,
      }))

      return true
    })

    if (success) await goto($navigationStatePriorToLogin?.url ?? '/')
  }
</script>

<main id="password-reset">
  <h1>Reset Password</h1>
  <h4>(Step 2 of 2)</h4>

  <Card>
    <h4><LockIcon /> Enter your new password</h4>

    <form on:submit|preventDefault={handleUpdatePassword}>
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

      {#if didAttemptSubmit && password.length < 8}
        <p class="error">Password must be at least 8 characters</p>
      {/if}

      {#if formError}
        <p class="error-message">{formError}</p>
      {/if}

      {#if formError === EXPIRED_TOKEN_ERROR || formError === SINGLE_USE_ERROR}
        <p class="error">
          <a href="/reset-password">Try Again</a>
        </p>
      {/if}

      <div class="action">
        <button type="submit" class="primary">Update Password</button>
      </div>
    </form>
  </Card>
</main>

<style>
  main {
    max-width: 500px;
    margin: 72px auto;
  }

  form {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .flex {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }

  .action {
    display: flex;
    justify-content: flex-end;
    width: 100%;
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

  :global(#password-reset svg) {
    fill: var(--interactive-color);
    margin-bottom: -4px;
  }

  button {
    width: 100%;
  }
</style>
