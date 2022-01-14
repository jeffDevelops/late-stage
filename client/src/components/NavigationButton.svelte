<script lang="ts">
  import { fade } from 'svelte/transition'
  import FloatingActionButton from './FloatingActionButton.svelte'
  import Menu from './iconography/Menu.svelte'
  import { shouldDisplayNav } from '../stores/Navigation'

  const openNav = () => {
    shouldDisplayNav.update(() => true)
  }
</script>

<div class="navigation-button" in:fade out:fade>
  <FloatingActionButton on:click={openNav}><Menu /></FloatingActionButton>
</div>

<style>
  div {
    position: fixed;
    top: 4px;
    left: 4px;
    z-index: 6;
  }

  :global(.navigation-button svg) {
    fill: var(--interactive-color);
  }
</style>
