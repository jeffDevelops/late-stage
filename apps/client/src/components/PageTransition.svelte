<script>
  import { fade } from 'svelte/transition'
  export let refresh = ''
</script>

{#key refresh}
  <div in:fade|local={{ duration: 200, delay: 800 }} out:fade|local={{ duration: 200 }}>
    <slot />
  </div>
{/key}

<style>
  div {
    width: 100vw;
    /* height: calc(100vh - 72px); */
  }
</style>
