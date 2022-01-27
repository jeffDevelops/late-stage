<script lang="ts">
  import BackgroundSvg from './BackgroundSvg.svelte'
</script>

<div class="background">
  <BackgroundSvg />
</div>

<style>
  :global(.background svg path) {
    fill: var(--interactive-color);
  }
</style>
