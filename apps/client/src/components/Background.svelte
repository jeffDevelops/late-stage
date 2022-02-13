<script lang="ts">
  import BackgroundSvg from './BackgroundSvg.svelte'
  import { page, url } from '$app/stores'

  const accentuatedBackgroundRoutes = ['/', '/log-in', '/register']
</script>

<div class="background">
  <BackgroundSvg />
</div>

<div
  class:disabled={accentuatedBackgroundRoutes.includes($page.url.pathname)}
  class="frosted-glass"
/>

<style>
  :global(.background svg path) {
    fill: var(--interactive-color);
  }

  .frosted-glass {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    z-index: 1;
    transition: backdrop-filter 0.5s ease-in-out, -webkit-backdrop-filter 0.5s ease-in-out;
  }

  .disabled {
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    transition: backdrop-filter 0.5s ease-in-out, -webkit-backdrop-filter 0.5s ease-in-out;
  }
</style>
