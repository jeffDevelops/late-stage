<script lang="ts">
  import FloatingActionButton from '../components/FloatingActionButton.svelte'
  import Modal from '../components/Modal.svelte'
  import { LocalStorageKeys } from '../types/LocalStorageKeys'

  /**
   * STATE
   */

  let isDisplayed = (() => {
    if (typeof window !== 'undefined') {
      const hasAcknowledgedBetaSoftware = localStorage.getItem(
        LocalStorageKeys.HasAcknowledgedBetaSoftware,
      )

      return hasAcknowledgedBetaSoftware !== 'true' // localStorage "stringly-typed"
    }
  })()

  /**
   * METHODS
   */

  const dismissModal = async () => {
    localStorage.setItem(LocalStorageKeys.HasAcknowledgedBetaSoftware, 'true')

    const modalNode = document.querySelector('.public-alpha-modal .modal')
    const scrimNode = document.querySelector('.public-alpha-modal .scrim')

    setTimeout(() => {
      modalNode.classList.remove('dismissed')
      scrimNode.classList.remove('dismissed')

      isDisplayed = !isDisplayed
    }, 400)

    modalNode.classList.add('dismissed')
    scrimNode.classList.add('dismissed')
  }
</script>

<div class="public-alpha-modal">
  <Modal
    on:dismiss={dismissModal}
    {isDisplayed}
    shouldDisplayCloseButton={false}
    shouldHideControls={false}
    isAnimated={false}
    isBlurDismissable={false}
    maxWidth={750}
    maxHeight={900}
    zIndex={6}
  >
    <div class="content-container" slot="content">
      <h2>Late-Stage is in public beta</h2>

      <p>The site is fully operational, but it could have a few kinks here and there.</p>

      <p>
        Care to report a bug? Feel free to let the developer know through any of the following lines
        of communication:
      </p>
      <p>
        <a
          on:mousedown={dismissModal}
          href="https://www.reddit.com/r/latestage/"
          rel="noopener noreferrer"
          target="_blank">r/latestage Subreddit</a
        >
      </p>

      <p>
        <a
          on:mousedown={dismissModal}
          href="https://discord.gg/DAa7mCae"
          rel="noopener noreferrer"
          target="_blank">Discord server</a
        >
      </p>
    </div>

    <div slot="actions">
      <button on:click={dismissModal} class="primary">Got it!</button>
    </div>
  </Modal>
</div>

<div class="alpha-info-fab">
  <FloatingActionButton on:click={() => (isDisplayed = true)}>β</FloatingActionButton>
</div>

<style>
  @keyframes dismiss-alpha-modal-scrim {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes dismiss-alpha-modal {
    0% {
      transform: translate(0) scale(1);
      opacity: 1;
    }

    90% {
      opacity: 1;
    }

    100% {
      transform: translate(60vw, 60vh) scale(0);
      opacity: 0;
    }
  }

  @keyframes display-alpha-modal-scrim {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes display-alpha-modal {
    0% {
      transform: translate(60vw, 60vh) scale(0);
      opacity: 0;
    }

    100% {
      transform: translate(0) scale(1);
      opacity: 1;
    }
  }

  .content-container {
    overflow: auto;
  }

  .alpha-info-fab {
    position: fixed;
    bottom: 0px;
    right: 4px;
  }

  :global(.alpha-info-fab button) {
    color: var(--interactive-color);
    font-size: 1.25rem;
    line-height: 1em;
  }

  :global(.public-alpha-modal .scrim) {
    animation: display-alpha-modal-scrim 0.4s ease-out forwards;
  }

  :global(.public-alpha-modal .modal) {
    animation: display-alpha-modal 0.4s ease-out forwards;
  }

  :global(.public-alpha-modal .scrim.dismissed) {
    animation: dismiss-alpha-modal-scrim 0.4s ease-out forwards;
  }

  :global(.public-alpha-modal .modal.dismissed) {
    animation: dismiss-alpha-modal 0.4s ease-out forwards;
  }
</style>
