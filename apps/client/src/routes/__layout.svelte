<script context="module">
  export const load = async ({ url, session }) => {
    if (!session.apiHealthy && !healthcheckExemptRoutes.includes(url.pathname)) {
      return {
        redirect: '/__error',
        status: 303,
      }
    }

    return {
      props: {
        key: url.pathname,
      },
    }
  }
</script>

<script lang="ts">
  import '../reset.css'
  import '../app.css'

  import { onMount } from 'svelte'
  import { browser } from '$app/env'
  import { session, navigating, page } from '$app/stores'

  import PageTransition from '../components/PageTransition.svelte'
  import Background from '../components/Background.svelte'
  import Header from '../components/Header.svelte'

  import { healthcheckExemptRoutes } from '../config/healthcheckExemptRoutes'
  import { shouldDisplayControls } from '../stores/Controls'
  import { beforeNavigate, goto, prefetch } from '$app/navigation'
  import { navigationStatePriorToLogin } from '../stores/NavigationPriorToLogin'

  export let key: string

  /**
   * LIFECYCLE
   */

  onMount(async () => {
    await prefetch($navigationStatePriorToLogin ? $navigationStatePriorToLogin.url : '/')
  })

  /**
   * REACTIVE
   */

  // Navigation Interception

  $: authRoutes = [
    '/log-in',
    '/register',
    '/confirm-user-callback',
    ...($session?.user?.emailIsVerified ? ['/verify-user'] : []), // make '/verify-user' inaccessible only when user has verified their email
  ]

  $: shouldNotBeAccessibleWhileLoggedIn = (pathname: string = $page.url.pathname) =>
    $session.user && authRoutes.some((route) => pathname === route)

  $: if (browser && $session.user && shouldNotBeAccessibleWhileLoggedIn()) {
    goto($navigationStatePriorToLogin ? $navigationStatePriorToLogin.url : '/')
  }

  $: if (browser && !$session.apiHealthy && !healthcheckExemptRoutes.includes($page.url.pathname)) {
    goto('/__error')
  }

  beforeNavigate(({ to, cancel }) => {
    if (shouldNotBeAccessibleWhileLoggedIn(to?.pathname)) cancel()
  })

  $: if ($navigating) $shouldDisplayControls = true
</script>

<div class="background-color" />

<div class="background" style="position: {$page.url.pathname === '/' ? 'absolute' : 'fixed'};">
  <Background />
</div>

<div class="container">
  <Header />
  <PageTransition refresh={key}>
    <main>
      <slot />
    </main>
  </PageTransition>
</div>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .background {
    height: auto;
    width: 100%;
    z-index: 0;
    background-color: transparent;
  }

  .background-color {
    height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: 0;
    background-image: linear-gradient(
      to bottom right,
      var(--app-background-dark) 0%,
      var(--app-background) 60%
    );
    animation: fade-in 1s forwards ease-in;
  }

  .container {
    z-index: 1;
    position: relative;
  }

  @media screen and (max-width: 1100px) {
    .background {
      right: 0;
      height: 100vh;
    }

    main {
      position: relative;
      padding: 80px 48px 64px;
      overflow-x: hidden;
    }
  }

  @media screen and (max-width: 600px) {
    main {
      padding: 80px 24px 64px 24px;
    }
  }
</style>
