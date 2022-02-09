<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { browser } from '$app/env'

  /**
   * PROPS
   */

  export let shouldDisplayCloseButton: boolean = true
  export let isDisplayed: boolean = false
  export let maxWidth: number = 500
  export let isBlurDismissable: boolean = false
  export let isAnimated = true
  export let zIndex = 99

  /**
   * LIFECYCLE
   */

  let modalContainer: HTMLElement
  let actionsContainer: HTMLElement

  const domCorrections: {
    node: HTMLElement
    prop: string
    originalValue: string
  }[] = []

  onMount(() => {
    function fixHeight() {
      // Targets iOS Chrome
      if (navigator.userAgent.match('CriOS')) {
        actionsContainer.style.bottom = '70px' // height of the actions container
      }
    }

    fixHeight()

    window.addEventListener('resize', fixHeight)
    window.addEventListener('orientationchange', fixHeight)

    return () => {
      window.removeEventListener('resize', fixHeight)
      window.removeEventListener('orientationchange', fixHeight)
    }
  })

  onDestroy(() => {
    setTimeout(() => restoreDOM(), 500)
    disableScrollLock()
  })

  /**
   * REACTIVE
   */

  const rectifyBrokenPositioning = () => {
    if (typeof window === 'undefined' || !modalContainer) return

    const renderedIncorrectly = () =>
      modalContainer.getBoundingClientRect().top !== 0 ||
      modalContainer.getBoundingClientRect().left !== 0

    if (!renderedIncorrectly()) return

    /** Properties that will break the behavior of position:fixed when exhibited by a parent, because they create a new stacking context. */
    const breakingProperties: {
      prop: string
      nonBreakingValue: string
    }[] = [
      { prop: 'transformStyle', nonBreakingValue: 'flat' },
      { prop: 'willChange', nonBreakingValue: 'auto' },
      { prop: 'filter', nonBreakingValue: 'none' },
      { prop: 'transform', nonBreakingValue: 'none' },
      { prop: 'backdropFilter', nonBreakingValue: 'none' },
      { prop: 'webkitBackdropFilter', nonBreakingValue: 'none' },
      { prop: 'perspective', nonBreakingValue: 'none' },
      { prop: 'contain', nonBreakingValue: 'none' },
    ]

    const traverseDOMForBreakingPropertyAssignments = (node: HTMLElement) => {
      for (let i = 0; i < breakingProperties.length; i++) {
        const styleValue = getComputedStyle(node)[breakingProperties[i].prop]

        if (styleValue !== breakingProperties[i].nonBreakingValue) {
          // Keep track of the correction to be made, so that it can be reverted when the modal is unrendered
          domCorrections.push({
            node,
            prop: breakingProperties[i].prop,
            originalValue: styleValue,
          })

          // Correct the value in attempt to make position:fixed; of the modal to work
          node.style[breakingProperties[i].prop] = breakingProperties[i].nonBreakingValue

          if (!renderedIncorrectly()) {
            break
          }
        }
      }

      // Call recursively up the DOM tree until layout isn't broken
      if (renderedIncorrectly() && node.parentElement) {
        return traverseDOMForBreakingPropertyAssignments(node.parentElement)
      }

      return
    }

    traverseDOMForBreakingPropertyAssignments(modalContainer.parentElement)
  }

  // Restore the DOM to its original state after it has been patched to allow position:fixed to work
  const restoreDOM = () => {
    domCorrections.forEach((correction) => {
      correction.node.style[correction.prop] = correction.originalValue
    })
  }

  const enableScrollLock = () => {
    if (!browser) return
    const scrollingNode: Element = document?.scrollingElement
    // ;(scrollingNode as HTMLElement).style.overflow = 'hidden'
    document.querySelector('html').style.overflow = 'hidden'
  }

  const disableScrollLock = () => {
    if (!browser) return
    const scrollingNode: Element = document?.scrollingElement
    // ;(scrollingNode as HTMLElement).style.overflow = 'auto'
    document.querySelector('html').style.overflow = 'auto'
  }

  $: if (isDisplayed && browser) {
    if (modalContainer) modalContainer.focus()

    enableScrollLock()
    rectifyBrokenPositioning()
  } else if (!isDisplayed && browser) {
    disableScrollLock()
    setTimeout(() => restoreDOM(), 400) // wait until the modal has been removed from view
  }

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

<div style="z-index: {zIndex};" class="modal-container" bind:this={modalContainer}>
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
          
          z-index: {zIndex + 1};
        "
      >
        {#if shouldDisplayCloseButton}
          <button on:click={dismissModal} class="close-button" in:fade out:fade>╳</button>
        {/if}

        <div class="content">
          <slot name="content" />
        </div>

        <div bind:this={actionsContainer} class="actions" style="z-index: {zIndex + 2};">
          <slot name="actions" />
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
  }

  .scrim {
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    transition: backdrop-filter 0.2s;
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
    transform: perspective(1000px);
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

  :global(.modal .actions :not(button):first-child) {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 8px;
  }

  @media screen and (max-width: 500px) {
    .modal {
      min-height: 100vh;
      /* mobile viewport bug fix */
      min-height: -webkit-fill-available;
      width: 100vw;
      border-radius: 0;
      padding-top: 0;
    }

    .content {
      padding-top: 40px;
      overflow: auto;
      height: calc(100vh - 73px);
    }

    .actions {
      position: fixed;
      width: 100%;
      bottom: 0;
    }
  }
</style>
