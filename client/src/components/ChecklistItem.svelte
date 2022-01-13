<script lang="ts">
  import { fade } from 'svelte/transition'
  import { prefetch, goto } from '$app/navigation'
  import Card from '../components/Card.svelte'
  import Checkbox from '../components/Checkbox.svelte'

  /**
   * PROPS
   */

  export let checked = true
  export let participationLink: string

  /**
   * STATE
   */

  export let shouldDisplayHoverEffect = false

  /**
   * METHODS
   */

  const handleHover = async () => {
    await prefetch(participationLink)
    shouldDisplayHoverEffect = true
  }

  const handleClick = async () => await goto(participationLink)
</script>

<div class="checklist-item" on:mouseenter={handleHover}>
  <Card>
    {#if !checked && shouldDisplayHoverEffect}
      <button
        in:fade={{ duration: 100 }}
        out:fade={{ duration: 100 }}
        class="hover-effect"
        on:click={handleClick}
        on:mouseleave={() => (shouldDisplayHoverEffect = false)}
      >
        <h1>Participate</h1>
      </button>
    {/if}

    <Checkbox {checked}>Remove your personal funds from the large, for-profit banks</Checkbox>

    <p>
      This is an ongoing campaign to prove to lawmakers and maintainers of the status-quo just how
      serious we are.
    </p>

    <p>
      We're collecting withdrawal receipts to create a public record of our dissent and tracking how
      much money we are collectively removing from their system.
    </p>
  </Card>
</div>

<style>
  .hover-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--interactive-color);
    z-index: 3;
    border-radius: var(--border-radius);
    opacity: 0.95;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    cursor: pointer;
    border: none;
  }

  p {
    font-size: 0.9rem;
    font-weight: 300;
    color: var(--text-color-subdued);
  }

  :global(.checklist-item label) {
    margin-top: 0;
  }

  :global(.checklist-item .card) {
    border: 1px solid var(--interactive-color);
  }
</style>
