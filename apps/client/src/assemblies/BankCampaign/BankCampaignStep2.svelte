<script lang="ts">
  import { fade } from 'svelte/transition'
  import InfoIcon from '../../components/iconography/Info.svelte'

  let isShowingWithdrawHelpText = false
</script>

<h4>
  Step 2: Withdraw <button
    class="info-button"
    on:click={() => (isShowingWithdrawHelpText = !isShowingWithdrawHelpText)}><InfoIcon /></button
  >
</h4>

{#if isShowingWithdrawHelpText}
  <div in:fade out:fade class="info">
    <button on:click={() => (isShowingWithdrawHelpText = false)} class="close-button">×</button>
    <p>
      Withdraw only as much money as you feel comfortable, to start. The big banks have the best
      infrastructure (ATMs, branches, direct deposit, and numerous other services), and we
      understand that it's difficult to abandon those offerings.
    </p>
    <p>
      If you'd like to support this effort in installments, you're welcome to submit this form as
      many times as you'd like.
    </p>
  </div>
{/if}

<p>
  Withdraw as much money from your large, for-profit bank as you feel comfortable. You can come back
  to this form as many times as you'd like&mdash;as new direct deposits or paychecks come in.
</p>

<p>Keep the receipt for the next step!</p>

<style>
  h4 {
    margin-top: 40px;
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
