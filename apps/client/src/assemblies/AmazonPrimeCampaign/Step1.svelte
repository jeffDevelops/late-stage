<script lang="ts">
  import { fade } from 'svelte/transition'
  import InfoIcon from '../../components/iconography/Info.svelte'

  /**
   * STATE
   */

  let isShowingHelpText = false
</script>

<h4>
  Step 1: Cancel Your Prime Membership <button
    class="info-button"
    on:click={() => (isShowingHelpText = !isShowingHelpText)}><InfoIcon /></button
  >
</h4>

{#if isShowingHelpText}
  <div in:fade out:fade class="info">
    <button on:click={() => (isShowingHelpText = false)} class="close-button">×</button>

    <p>
      Log into your Amazon account and <a
        href="https://www.amazon.com/mc/pipelines/cancellation?ref_=pcen_ccn_of_con_cn_btn&pId=cancellation&ep=alternative_offer%2Calternative_marketing%2Ccancellation&lp=alternative_marketing&cp=alternative_offer"
        >go here</a
      > to skip the two pages of Amazon trying to convince you not to cancel.
    </p>

    <p>
      We'd recommend not supporting Amazon at all, but we know that's not always realistic or
      affordable. We are aware that Amazon has monopolized fast delivery time with Prime.
    </p>
    <p>
      Luckily, the monthly membership is prorated and cancellable anytime, so you can reactivate
      your membership for your order and then cancel again.
    </p>
  </div>
{/if}

<style>
  :global(.bank-campaign .info h4) {
    margin-top: 0;
  }

  .info {
    background-color: var(--input-background);
    padding: 16px;
    border-radius: var(--border-radius);
    position: relative;
    margin-bottom: 16px;
  }

  .info p {
    color: var(--text-color-subdued);
    font-weight: 400;
    font-size: 0.8rem;
  }

  .info p:last-of-type {
    margin-bottom: 0;
  }

  .close-button {
    color: var(--interactive-color);
    font-size: 1.25rem;
  }
</style>
