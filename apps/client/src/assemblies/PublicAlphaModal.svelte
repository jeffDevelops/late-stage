<script lang="ts">
  import FloatingActionButton from '../components/FloatingActionButton.svelte'
  import Modal from '../components/Modal.svelte'
  import { LocalStorageKeys } from '../types/LocalStorageKeys'

  /**
   * STATE
   */

  let isDisplayed = (() => {
    if (typeof window !== 'undefined') {
      const hasAcknowledgedAlphaSoftware = localStorage.getItem(
        LocalStorageKeys.HasAcknowledgedAlphaSoftware,
      )

      return hasAcknowledgedAlphaSoftware !== 'true' // localStorage "stringly-typed"
    }
  })()

  /**
   * METHODS
   */

  const dismissModal = async () => {
    localStorage.setItem(LocalStorageKeys.HasAcknowledgedAlphaSoftware, 'true')

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
    {isDisplayed}
    isAnimated={false}
    isBlurDismissable={false}
    shouldDisplayCloseButton={false}
    maxWidth={750}
    zIndex={6}
  >
    <div class="content-container" slot="content">
      <h2>Late-Stage is in public alpha</h2>

      <h5>Please note that the site is not operational yet!</h5>

      <p>
        The content you see here is likely how it will <em>look</em> when we begin running campaigns,
        but the community is still finalizing our first campaigns and checklist objectives.
      </p>
      <p>
        The static content you see is likely to be in the spirit of what Late-Stage will set out to
        do, but is pending the guidance of our community of experts and advocates, and only serves
        to communicate how the site will operate.
      </p>

      <h5>Okay, so what <em>can</em> I do on the website?</h5>
      <p>
        For more information, see our <a href="/about" rel="noopener noreferrer" target="_blank"
          >about</a
        > page.
      </p>
      <p>
        If you'd like to see where the project is headed, check out our <a
          href="https://late-stage.notion.site/f8709ff5bbed4fcb9bda3d802fabdac0?v=86dd875520eb4384a8a01424da6ad666"
          rel="noopener noreferrer"
          target="_blank">roadmap</a
        >.
      </p>
      <p>
        If you'd like a say in how the project is going, join our Reddit community at <a
          href="https://www.reddit.com/r/latestage/"
          rel="noopener noreferrer"
          target="_blank">r/latestage</a
        >, and submit an RFC to propose a
        <a href="/campaign-rfcs" rel="noopener noreferrer" target="_blank">campaign</a>
        or
        <a href="/checklist-rfcs" rel="noopener noreferrer" target="_blank">Late-Stage Checklist</a>
        idea.
      </p>
    </div>

    <div slot="actions">
      <button on:click={dismissModal} class="primary">Got it!</button>
    </div>
  </Modal>
</div>

<div class="alpha-info-fab">
  <FloatingActionButton on:click={() => (isDisplayed = true)}>⍺</FloatingActionButton>
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

  h5 {
    margin-top: 40px;
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
