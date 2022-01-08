<script lang="ts">
  import { fade } from 'svelte/transition'
  import FloatingActionButton from './FloatingActionButton.svelte'
  import Menu from './iconography/Menu.svelte'
  import { shouldDisplayNav } from '../stores/Navigation'

  const openNav = () => {
    shouldDisplayNav.update(() => true)
  }
</script>

<div in:fade out:fade>
  <FloatingActionButton on:click={openNav}><Menu /></FloatingActionButton>
</div>

<style>
  div {
    position: fixed;
    top: 6px;
    left: 8px;
    z-index: 4;
  }
</style>
