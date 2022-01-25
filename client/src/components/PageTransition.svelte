<script>
  import { fade } from 'svelte/transition'
  export let refresh = ''
</script>

{#key refresh}
  <div in:fade|local={{ duration: 500, delay: 500 }} out:fade|local={{ duration: 500 }}>
    <slot />
  </div>
{/key}

<style>
  div {
    width: 100vw;
    height: calc(100vh - 72px);
  }
</style>
