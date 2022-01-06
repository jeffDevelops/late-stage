<script lang="ts">
  import { fade } from 'svelte/transition'
  import { prefersColorScheme } from '../stores/Theme'
  import FloatingActionButton from './FloatingActionButton.svelte'
  import Sun from './iconography/Sun.svelte'
  import Moon from './iconography/Moon.svelte'

  const handleClick = () => {
    $prefersColorScheme === 'dark'
      ? prefersColorScheme.setToLight()
      : prefersColorScheme.setToDark()
  }
</script>

<div in:fade={{ delay: 200 }} out:fade={{ delay: 200 }}>
  <FloatingActionButton on:click={handleClick}>
    {#if $prefersColorScheme === 'dark'}
      <Sun />
    {:else}
      <Moon />
    {/if}
  </FloatingActionButton>
</div>

<style>
  div {
    position: fixed;
    top: 56px;
    left: 8px;
  }
</style>
