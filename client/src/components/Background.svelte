<script lang="ts">
  import BackgroundSvg from './BackgroundSvg.svelte'
</script>

<div class="background">
  <BackgroundSvg fill="#ff5964" />
</div>

<style>
  :global(.background svg path) {
    fill: var(--interactive-color);
  }
</style>
