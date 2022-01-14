<script lang="ts">
  import Logo from './Logo.svelte'
</script>

<header>
  <a sveltekit:prefetch href="/">
    <Logo />
  </a>
</header>

<div class="spacer" />

<style>
  header {
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    padding: 16px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-bottom-left-radius: var(--border-radius);
    z-index: 4;
  }

  a {
    text-decoration: none;
    color: var(--text-color);
  }

  .spacer {
    height: 56px;
    margin-bottom: 16px;
  }
</style>
