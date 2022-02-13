<script lang="ts">
  import { browser } from '$app/env'

  import ProveTheMovementArt from './iconography/ProveTheMovementMagenta.svelte'
</script>

<section class="prove-the-movement">
  <div class="container">
    <ProveTheMovementArt />

    <p>Late-Stage makes individuals prove their solidarity.</p>
    <p>
      When you cross something off your list, the rest of the community knows you did it, and
      maintainers of the status quo can quantify our dissent.
    </p>

    <div class="actions">
      <a sveltekit:prefetch href="/checklist"
        ><button class="secondary">Get started on the checklist</button></a
      >
      <button
        class="secondary"
        on:click={() =>
          browser &&
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })}>View Metrics</button
      >
    </div>
  </div>
</section>

<style>
  .prove-the-movement {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .container {
    height: auto;
    width: 100%;
    max-width: 600px;
  }

  :global(.prove-the-movement svg) {
    margin-bottom: 32px;
  }

  .actions {
    margin-top: 32px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media screen and (max-width: 600px) {
    .actions {
      flex-direction: column;
      align-items: flex-start;
    }

    .actions a,
    .actions a button,
    .actions button {
      width: 100%;
    }

    .actions button:first-of-type {
      margin-bottom: 8px;
    }
  }
</style>
