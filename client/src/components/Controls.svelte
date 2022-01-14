<script lang="ts">
  import { fade } from 'svelte/transition'
  import Navigation from '../components/Navigation.svelte'
  import NavigationButton from '../components/NavigationButton.svelte'
  import DarkModeButton from '../components/DarkModeButton.svelte'
  import PublicAlphaModal from '../assemblies/PublicAlphaModal.svelte'
  import { shouldDisplayControls } from '../stores/Controls'
</script>

{#if $shouldDisplayControls}
  <div in:fade out:fade id="controls">
    <Navigation />
    <NavigationButton />
    <DarkModeButton />
    <PublicAlphaModal />
  </div>
{/if}

<style>
  div {
    z-index: 6;
    position: relative;
  }
</style>
