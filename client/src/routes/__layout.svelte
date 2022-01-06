<script context="module">
  // import { currentUser } from '../stores/User'

  export const load = async ({ url, session }) => {
    // currentUser.set(session)

    return {
      props: {
        // session,
        key: url.pathname,
      },
    }
  }
</script>

<script lang="ts">
  import '../reset.css'
  import '../app.css'

  import { onMount } from 'svelte'
  import PageTransition from '../components/PageTransition.svelte'
  import Background from '../components/Background.svelte'
  import Header from '../components/Header.svelte'

  import { prefersColorScheme } from '../stores/Theme'
  import type { User } from '../types/User'

  export let key
  export let session: User

  // onMount(() => {
  // 	// Called in load, yes, but this updates localStorage as well
  // 	currentUser.setUser(session)
  // })
</script>

<div class="background">
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
  .background {
    height: auto;
    width: 100vw;
    position: fixed;
    z-index: 0;
  }

  .container {
    z-index: 1;
    position: relative;
  }

  @media screen and (max-width: 1100px) {
    .background {
      right: 0;
      width: auto;
      height: 100vh;
    }
  }

  main {
    padding: 0 64px 64px;
  }
</style>
