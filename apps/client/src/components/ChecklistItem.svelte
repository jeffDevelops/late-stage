<script lang="ts">
  import { fade } from 'svelte/transition'
  import { prefetch, goto } from '$app/navigation'
  import Card from '../components/Card.svelte'
  import Checkbox from '../components/Checkbox.svelte'
  import CampaignTags from '../components/CampaignTags.svelte'

  /**
   * PROPS
   */

  export let checked = true
  export let participationLink: string
  export let text: string
  export let tags: { name: string }[]

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

  const handleClick = async () => {
    await goto(participationLink)
  }
</script>

<div class="checklist-item" on:mouseenter={handleHover}>
  <Card>
    {#if shouldDisplayHoverEffect}
      <button
        in:fade={{ duration: 50 }}
        out:fade={{ duration: 50 }}
        class="hover-effect"
        on:click={handleClick}
        on:mouseleave={() => (shouldDisplayHoverEffect = false)}
      >
        <h1>
          {#if checked}Participate Again{:else}Participate{/if}
        </h1>
      </button>
    {/if}

    <Checkbox {checked}>{text}</Checkbox>

    <CampaignTags wrap={true} {tags} />
  </Card>
</div>

<style>
  :global(.checklist-item .card) {
    padding-bottom: 16px;
    background-color: var(--interactive-card-color) !important;
  }

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

  .hover-effect h1 {
    margin-bottom: 0;
    font-size: 1.4rem;
    color: var(--button-text-color);
  }

  :global(.checklist-item label) {
    color: var(--interactive-color);
    margin-top: 0;
    margin-bottom: 0;
    text-decoration: underline;
  }

  :global(.checklist-item .card) {
    /* border: 1px solid var(--interactive-color); */
    position: relative;
  }

  @media screen and (max-width: 600px) {
    .hover-effect h1 {
      font-size: 1.2rem;
    }
  }
</style>
