<script lang="ts">
  import { fade } from 'svelte/transition'
  import Navigation from '../components/Navigation.svelte'
  import NavigationButton from '../components/NavigationButton.svelte'
  import DarkModeButton from '../components/DarkModeButton.svelte'
  import UserButton from '../components/UserButton.svelte'
  import PersonalSecurityButton from '../components/PersonalSecurityButton.svelte'
  import PublicAlphaModal from '../assemblies/PublicAlphaModal.svelte'
  import { shouldDisplayControls } from '../stores/Controls'
</script>

{#if $shouldDisplayControls}
  <div in:fade out:fade id="controls">
    <Navigation />
    <NavigationButton />
    <DarkModeButton />
    <UserButton />
    <PersonalSecurityButton />
    <PublicAlphaModal />
  </div>
{/if}

<style>
  div {
    z-index: 6;
    position: relative;
  }
</style>
