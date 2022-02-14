<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import DangerTriangle from './iconography/DangerTriangle.svelte'
  import Modal from './Modal.svelte'

  const dispatch = createEventDispatcher()

  /**
   * PROPS
   */

  export let isDisplayed
</script>

<main class="throwaway-email-messaging">
  <Modal
    {isDisplayed}
    maxWidth={900}
    maxHeight={800}
    shouldDisplayCloseButton={true}
    isBlurDismissable={true}
    isAnimated={true}
    on:dismiss={() => dispatch('dismiss')}
  >
    <section slot="content">
      <h2>
        <DangerTriangle /> Don't put yourself at risk!
      </h2>
      <h4>You'll want to use a throwaway email address</h4>

      <p>
        Late-Stage is realistic in recognizing that we're likely to make some enemies, which could
        make us a target for hackers or even government agencies in near-future administrations.
      </p>
      <p>
        If it is ever compromised,
        <strong
          >protect yourself from being singled out by using an email and/or username that is not
          linked to any other personally identifying accounts.</strong
        >
      </p>

      <p>
        We follow industry-standard security practices around encryption and authentication, but
        <strong>much of web security in general falls upon you to protect yourself.</strong>
      </p>

      <h4>Privacy Policy</h4>

      <p>
        We will never ask for personally-identifying information, and please be extremely guarded in
        giving it out to anyone on the platform. When using this site, we will require documents as
        artifacts of your activism, but <strong
          >take care to always redact all personal information.</strong
        >
      </p>

      <h4>Don't lose your password</h4>
      <p>
        Note also that, <strong>if you forget your password, your account is unrecoverable.</strong>
        While throwaway email services do have self-destructing messages, their inboxes are public. We
        can't risk sending password recovery emails where a bad actor could find them. Use a password
        manager on a machine to which only you have access to ensure you don't get locked out.
      </p>

      <h4>Get started with a free throwaway inbox</h4>
      <p>Here are some free options for throwaway email services (not sponsored):</p>

      <ul>
        <li>
          <a target="_blank" rel="noopener noreferrer" href="https://maildrop.cc/">Maildrop</a>
        </li>
        <li>
          <a target="_blank" rel="noopener noreferrer" href="https://temp-mail.org/en/">Temp-Mail</a
          >
        </li>
        <li>
          <a target="_blank" rel="noopener noreferrer" href="https://www.guerrillamail.com/"
            >Guerilla Mail</a
          >
        </li>
      </ul>
    </section>

    <section slot="actions">
      <button class="primary" on:click={() => dispatch('dismiss')}>I understand the risks</button>
    </section>
  </Modal>
</main>

<style>
  p {
    color: var(--text-color-subdued);
  }

  :global(.throwaway-email-messaging h2 svg) {
    fill: var(--interactive-color);
    height: 32px;
    width: 32px;
    margin-bottom: -5px;
  }

  h4 {
    margin-top: 24px;
  }

  @media screen and (max-width: 1000px) {
    :global(.throwaway-email-messaging .modal) {
      width: 100vw !important;
      border-radius: 0 !important;
    }

    :global(.throwaway-email-messaging .content) {
      padding-top: 40px;
      overflow: auto;
      height: calc(100vh - 80px);
      padding: 24px 16px 40px !important;
    }
  }

  @media screen and (max-height: 873px) {
    :global(.throwaway-email-messaging .modal) {
      width: 100vw !important;
      border-radius: 0 !important;
    }

    :global(.throwaway-email-messaging .content) {
      padding-top: 40px;
      overflow: auto;
      height: calc(100vh - 80px);
      padding: 24px 16px 40px !important;
    }
  }
</style>
