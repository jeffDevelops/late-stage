<script lang="ts" context="module">
  export const load = async ({ session }) => {
    if (!session.user) {
      return {
        redirect: '/log-in',
        status: 303,
      }
    }

    return {
      status: 200,
    }
  }
</script>

<script lang="ts">
  import Controls from '../components/Controls.svelte'
  import GearIcon from '../components/iconography/Gear.svelte'
  import ChangeEmailAddress from '../components/ChangeEmailAddress.svelte'
  import ChangeUsername from '../components/ChangeUsername.svelte'
</script>

<Controls />

<main class="user-settings">
  <h1><GearIcon /> User Settings</h1>
  <ChangeUsername />
  <ChangeEmailAddress />
</main>

<style>
  main {
    max-width: 750px;
    margin: 0 auto;
    padding: 72px 0;
    width: calc(100% - 24px);
    height: calc(100vh - 72px - 74px);
  }

  :global(.user-settings > .card:not(:last-of-type)) {
    margin-bottom: 16px;
  }

  :global(.user-settings h1 svg) {
    height: 40px;
    width: 40px;
    margin-right: 8px;
    margin-bottom: -4px;
  }

  :global(.user-settings h4 svg) {
    height: 28px;
    width: 28px;
    margin-right: 8px;
    margin-bottom: -8px;
  }

  :global(.user-settings svg) {
    fill: var(--interactive-color);
  }

  :global(.user-settings .card) {
    margin-bottom: 16px;
  }

  @media screen and (max-width: 600px) {
    main {
      width: 100%;
    }
  }
</style>
