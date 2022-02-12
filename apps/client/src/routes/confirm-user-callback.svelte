<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit'
  import { verifyEmailAddress } from '../networking/graphql/mutation/VerifyUserEmailAddress'
  import { gqlRequest } from '../networking/gqlRequest'
  import { env } from '../networking/env'

  export async function load({ fetch, url, session }: LoadInput): Promise<LoadOutput> {
    const email = url.searchParams.get('email')
    const token = url.searchParams.get('token')

    if (!token || !email) {
      return {
        redirect: '/__error',
        status: 303,
      }
    }

    const response = await fetch(
      `${env.viteHostAddress}/proxy/verify-email-address`,
      gqlRequest({
        query: verifyEmailAddress(`
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
          token,
          email,
        },
      }),
    )

    const deserialized = await response.json()

    if (deserialized.error) {
      return {
        props: {
          error: deserialized.error.message,
        },
      }
    }

    if (!!session.user) {
      return {
        status: 200,
      }
    }

    return {
      status: 303,
      redirect: '/log-in',
    }
  }
</script>

<script lang="ts">
  import { session } from '$app/stores'
  import { navigationStatePriorToLogin } from '../stores/NavigationPriorToLogin'
  import Card from '../components/Card.svelte'
  import DangerTriangle from '../components/iconography/DangerTriangle.svelte'
  import EmailIcon from '../components/iconography/Email.svelte'

  /**
   * PROPS
   */

  export let error: string
</script>

{#if error}
  <main class="confirm-user-callback">
    <Card>
      <h2><DangerTriangle /> Hmm, that magic link didn't work</h2>

      <p>{error}</p>

      {#if error === 'Magic link expired. Please send yourself another confirmation email and try again.'}
        <p>
          You can you send yourself another one <a href="/verify-email" sveltekit:prefetch>here</a>.
        </p>
      {/if}
    </Card>
  </main>
{:else if $session.user && !!$navigationStatePriorToLogin}
  <main class="confirm-user-callback">
    <Card>
      <h2><EmailIcon /> You're all set!</h2>

      <p>Redirecting to where you left off...</p>
    </Card>
  </main>
{/if}

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 24px);
    max-width: 750px;
    margin: 0 auto;
  }

  :global(.confirm-user-callback h2 svg) {
    fill: var(--error-color);
    width: 24px;
    height: 24px;
    margin-bottom: -2px;
    margin-right: 4px;
  }

  :global(.confirm-user-callback .card) {
    width: 100%;
    background-color: var(--interactive-card-color);
  }
</style>
