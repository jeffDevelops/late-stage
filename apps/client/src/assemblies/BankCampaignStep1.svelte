<script lang="ts">
  import { fade } from 'svelte/transition'
  import BankGreenBankExodusArticle from '../components/Bank.GreenBankExodusArticle.svelte'
  import InfoIcon from '../components/iconography/Info.svelte'

  /**
   * STATE
   */

  let isShowingShopForBetterFinancialInstitutionHelpText = false
</script>

<h4>
  Step 1: Shop for a better bank <button
    class="info-button"
    on:click={() =>
      (isShowingShopForBetterFinancialInstitutionHelpText =
        !isShowingShopForBetterFinancialInstitutionHelpText)}><InfoIcon /></button
  >
</h4>

{#if isShowingShopForBetterFinancialInstitutionHelpText}
  <div in:fade out:fade class="info">
    <button
      on:click={() => (isShowingShopForBetterFinancialInstitutionHelpText = false)}
      class="close-button">×</button
    >

    <h4>Finding a new bank or credit union</h4>
    <p>
      If you're banking at one of the big four institutions, it's going to be ridiculously easy to
      find a bank that'll give you a better rate.
    </p>

    <p>
      Do some research into their policies, too. Do they invest in SLABS, fossil fuels, or predatory
      loans? Do they have a minimum balance? Do they actually have overdraft protection? Do they
      have a history of creating accounts customers don't want to try to collect fees they hope you
      won't notice?
    </p>

    <p>
      Just because customers are part-owners at a credit union doesn't mean that it's not poorly
      managed. Check the reviews of your new bank or credit union before committing.
    </p>
  </div>

  <BankGreenBankExodusArticle />
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

  .info p,
  .info h4 {
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
