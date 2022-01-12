<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'

  /**
   * REACTIVE
   */

  const enableScrollLock = () => {
    const scrollingNode: Element = document?.scrollingElement
    ;(scrollingNode as HTMLElement).style.overflow = 'hidden'
    document.querySelector('html').style.overflow = 'hidden'
  }

  const disableScrollLock = () => {
    const scrollingNode: Element = document?.scrollingElement
    ;(scrollingNode as HTMLElement).style.overflow = 'auto'
    document.querySelector('html').style.overflow = 'auto'
  }

  // Scroll Lock
  $: if (isDisplayed && typeof window !== 'undefined') {
    enableScrollLock()
  } else if (!isDisplayed && typeof window !== 'undefined') {
    disableScrollLock()
  }

  /**
   * PROPS
   */

  export let shouldDisplayCloseButton: boolean = true
  export let isDisplayed: boolean = false
  export let maxWidth: number = 500
  export let isBlurDismissable: boolean = false
  export let isAnimated = true
  export let zIndex = 4

  /**
   * METHODS
   */

  const dispatch = createEventDispatcher()
  const dismissModal = () => {
    disableScrollLock()
    dispatch('dismiss')
  }

  const fadeEffect = (node: HTMLElement) => {
    return isAnimated ? { ...fade(node) } : undefined
  }
</script>

{#if isDisplayed}
  <div
    on:click={(e) => {
      if (isBlurDismissable && e.target === e.currentTarget) dismissModal()
    }}
    class="scrim"
    in:fadeEffect
    out:fadeEffect
    style="z-index: {zIndex};"
  >
    <div
      class="modal"
      in:fadeEffect
      out:fadeEffect
      style="
        --modal-max-width: {maxWidth}px;
        z-index: {zIndex};
      "
    >
      {#if shouldDisplayCloseButton}
        <button on:click={dismissModal} class="close-button" in:fade out:fade>╳</button>
      {/if}

      <div class="content">
        <slot name="content" />
      </div>

      <div class="actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
{/if}

<style>
  .scrim {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background-color: var(--app-background);
    width: calc(100% - 32px);
    max-width: var(--modal-max-width);
    margin: 0 auto;
    padding: 16px 0 0;
    border: 1px solid #55555555;
    border-radius: var(--border-radius);
    box-shadow: var(--page-shadow);
    position: relative;
  }

  .close-button {
    font-family: var(--font-sans);
    font-weight: 900;
    color: var(--error-color);
    background-color: transparent;
    border: 0;
    position: absolute;
    top: 8px;
    right: 8px;
    width: auto;
    margin: 0;
  }

  .close-button:hover {
    box-shadow: none;
  }

  .content {
    min-height: 40px;
    height: auto;
    padding: 16px 40px;
  }

  .actions {
    border-top: 1px solid #55555555;
    padding: 16px 16px;
    background-color: var(--app-background);
  }

  @media screen and (max-width: 600px) {
    .modal {
      height: 100vh;
      width: 100vw;
      border-radius: 0;
      overflow: hidden;
      padding-top: 0;
    }

    .content {
      padding-top: 40px;
      overflow: auto;
      height: calc(100vh - 73px);
    }

    .actions {
      position: fixed;
      bottom: 0;
      width: 100%;
    }
  }
</style>
