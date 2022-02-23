<script lang="ts">
  import { onMount, createEventDispatcher, tick } from 'svelte'
  import { page } from '$app/stores'

  const dispatch = createEventDispatcher()

  /**
   * STATE
   */
  let activeRoute

  /**
   * LIFECYCLE
   */
  onMount(async () => {
    activeRoute = (() => {
      if ($page.url.searchParams.get('subroute') === 'Feed') return 'Feed'
      return 'Campaign'
    })()

    await tick()

    dispatch('change', activeRoute)
  })
</script>

<nav>
  <div
    class:position0={activeRoute === 'Campaign'}
    class:position1={activeRoute === 'Feed'}
    class="highlight"
  />
  <ul>
    <li class:active={activeRoute === 'Campaign'}>
      <button
        on:click={() => {
          window.history.pushState(null, null, '?subroute=Campaign')
          activeRoute = 'Campaign'
          dispatch('change', 'Campaign')
        }}>Campaign</button
      >
    </li>
    <li class:active={activeRoute === 'Feed'}>
      <button
        on:click={() => {
          window.history.pushState(null, null, '?subroute=Feed')
          activeRoute = 'Feed'
          dispatch('change', 'Feed')
        }}>Feed</button
      >
    </li>
  </ul>
</nav>

<style>
  nav {
    margin: 16px auto 0;
    width: 100%;
    height: 40px;
    z-index: 5;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-radius: var(--border-radius);
    overflow: hidden;
    border: 1px solid var(--visualization-color);
    position: relative;
  }

  ul {
    width: 100%;
    height: 100%;
    list-style: none;
    display: flex;
    justify-content: flex-start;
    padding: 6px;
    background-color: var(--interactive-card-color);
  }

  li {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
  }

  li.active button {
    color: var(--button-text-color);
    transition: 0.4s color ease;
    transition-delay: 0.2s;
  }

  .highlight {
    top: 6px;
    left: 8px;
    position: absolute;
    width: calc(50% - 16px);
    height: calc(100% - 12px);
    background-color: var(--interactive-color);
    border-radius: 4px;
  }

  .highlight.position0 {
    top: 6px;
    left: 6px;
    right: auto;
    transition: left 0.2s ease-in-out;
  }

  .highlight.position1 {
    top: 6px;
    left: calc(50% + 10px);
    transition: left 0.2s ease-in-out;
  }

  button {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: transparent;
    border: none;
    color: var(--text-color);
    font-size: 0.9em;
    font-family: var(--font-sans);
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 0.1em;
    line-height: 1.3em;
  }
</style>
