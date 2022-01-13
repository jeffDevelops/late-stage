<script lang="ts">
  import { fade } from 'svelte/transition'
  import Select from 'svelte-select'
  import { env } from '../networking/env'
  import { UploadOptions } from '../types/UploadOptions'
  import UploadIcon from '../components/iconography/Upload.svelte'
  import InfoIcon from '../components/iconography/Info.svelte'
  import BankCampaignSuccessModal from './BankCampaignSuccessModal.svelte'
  import { LocalStorageKeys } from '../types/LocalStorageKeys'

  /**
   * STATE
   */
  let withdrawalAmount: string = ''
  let institutionSelection: { index: number; value: string; label: string } | undefined = undefined
  let institutionName: string = ''
  let fileInput: HTMLInputElement
  let imagePreviewSrc: string
  let uploading = false

  let isShowingShopForBetterFinancialInstitutionHelpText = false
  let isShowingWithdrawHelpText = false
  let isShowingSuccessModal = false

  /**
   * METHODS
   */

  const resetForm = () => {
    removeUpload()

    withdrawalAmount = ''
    institutionSelection = undefined
    institutionName = ''
  }

  const handleImageChange = (e) => {
    const fileList = fileInput.files
    if (fileList) imagePreviewSrc = URL.createObjectURL(fileList[0])
  }

  const removeUpload = () => {
    fileInput.value = ''
    imagePreviewSrc = ''
  }

  const handleSubmit = async () => {
    if (fileInput.files.length !== 1) return

    isShowingSuccessModal = true

    localStorage.setItem(LocalStorageKeys.HasCompletedBankChecklistItem, 'true')

    // uploading = true

    // const formData = new FormData()
    // formData.append(
    //   UploadOptions.BankCampaignWithdrawalReceipt,
    //   fileInput.files[0],
    //   fileInput.files[0].name,
    // )

    // const uploadResponse = await fetch(
    //   `${env.apiBaseUrl}/upload?uploadOption=${UploadOptions.BankCampaignWithdrawalReceipt}`,
    //   {
    //     method: 'POST',
    //     body: formData,
    //   },
    // )

    // uploading = false

    // window.location.reload()
  }
</script>

<BankCampaignSuccessModal
  isDisplayed={isShowingSuccessModal}
  on:dismiss={() => {
    resetForm()
    isShowingSuccessModal = false
  }}
/>

<section class="bank-campaign">
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
        Do some research into some of their policies, too. Do they have a minimum balance? Do they
        actually have overdraft protection? Do they try to create all kinds of accounts you don't
        want or need to try to collect fees they hope you won't notice?
      </p>

      <p>
        Just because customers are part-owners at a credit union doesn't mean that it's not poorly
        managed. Check the reviews before committing.
      </p>

      <h4>New Alternatives</h4>
      <p>
        Check out some of the emerging blockchain technology enabling decentralized finance (DeFi)
        institutions. You can find some extremely high APYs (sometimes as high as 20% APY) for
        holding virtually risk-free stablecoins. Proof-of-stake chains are proving that blockchain
        technology needn't be environmentally taxing, and are reducing financial barrier to entry by
        reducing liquidity fees to near negligible levels.
      </p>

      <p>
        Crypto and DeFi have a fairly high learning curve and some networks and exchanges have
        exorbitant fees. While transfer rates tend to be fairly high, centralized exchanges like
        Coinbase, Gemini, and Nexo manage much of the complexity for you, they all have high-yield
        stablecoins that carry low risk, and you're only one transaction away from having your money
        back in-hand.
      </p>
    </div>
  {/if}

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
        Admittedly, the largest banks have the best infrastructure (branches, ATMs, direct-deposit,
        etc.) to ensure the timely accessibility of your funds. Especially if you go the DeFi route,
        you may want to keep your account minimum in your bank, so that you can quickly have funds
        available for expenses without incurring fees.
      </p>
    </div>
  {/if}

  <p>
    Withdraw as much money from your large, for-profit bank as you feel comfortable. Keep the
    receipt for the next step!
  </p>

  <h4>Step 3: Upload your withdrawal receipt</h4>

  <p>
    <strong>Redact any personal info</strong> from the receipt that you don't want on the Internet. The
    image need only contain the amount withdrawn, and the institution from which the amount was removed.
  </p>

  <form enctype="multipart/form-data" on:submit|preventDefault={handleSubmit}>
    <div class="flex">
      {#if imagePreviewSrc}
        <div class="preview-container">
          <button type="button" class="delete-upload-button" on:click={removeUpload}
            ><div>×</div>
          </button>
          <img class="preview" src={imagePreviewSrc} alt="My withdrawal receipt" />
        </div>
      {/if}

      <label style="display: {imagePreviewSrc ? 'none' : 'flex'};" class="custom-file-upload">
        <input
          bind:this={fileInput}
          on:change={handleImageChange}
          type="file"
          name="WithdrawalReceipt"
        />
        <UploadIcon /> Upload Image
      </label>
    </div>
    <div class="info">
      <h4>Why are we asking for proof?</h4>
      <p>
        Late-Stage is different from any other petition in that it's used to prove to lawmakers and
        those that maintain the status-quo that <strong>we are actively fighting</strong> against the
        institutions they maintain.
      </p>

      <p>
        We want them to feel the hurt of losing our funds, but we also want them to know it was us
        that hurt them, and why.
      </p>

      <p>
        We also want the people in our community to feel the tangible impact. Proof of participation
        fuels the campaign's credibility, encourages the more hesitant to participate, and creates a
        sense of solidarity and real accomplishment.
      </p>

      <p>
        If we get enough withdrawal receipts, we're hoping to create <a
          href="https://mosaically.com"
          target="_blank"
          rel="noopener noreferrer">a mosaic</a
        > of all participants' withdrawals as a message of mass dissent.
      </p>
    </div>

    <label for="withdrawal-amount">Withdrawal Amount</label>
    <input
      on:keydown={(e) => {
        if (e.key === 'e' || e.key === '-' || e.key === '+') e.preventDefault()
        if (
          withdrawalAmount?.toString().includes('.') &&
          withdrawalAmount?.toString().split('.')[1].length >= 2 &&
          e.key !== 'Backspace' &&
          e.key !== 'Delete' &&
          e.key !== 'ArrowLeft' &&
          e.key !== 'ArrowRight'
        ) {
          e.preventDefault()
        }
      }}
      bind:value={withdrawalAmount}
      id="withdrawal-amount"
      type="number"
    />

    <label for="institution">I removed money from:</label>
    <div class="themed-select">
      <Select
        bind:value={institutionSelection}
        showIndicator={true}
        placeholder="Select an institution"
        items={['Chase Bank', 'Bank of America', 'Wells Fargo', 'Citi', 'Other']}
      />
    </div>

    {#if institutionSelection?.value === 'Other'}
      <div in:fade out:fade>
        <label for="institution-name">Institution Name</label>
        <input bind:value={institutionName} type="text" id="institution-name" />
      </div>
    {/if}

    <button type="submit" class="primary">Tally My Withdrawal</button>
  </form>

  <h4>Step 4: Spread the word!</h4>

  <p>
    Show friends and family how much more in APY you're making by switching banks. Let's normalize
    lower profit margins for the financial institutions leveraging <em>your</em> money!
  </p>

  <p>
    Spread the word about Late-Stage, so that we can reach more people and tackle more campaigns in
    the future.
  </p>
</section>

<style>
  h4:not(:first-of-type) {
    margin-top: 32px;
  }

  input[type='file'] {
    display: none;
  }

  .preview-container {
    position: relative;
    height: 100px;
    width: 100px;
    margin: 24px 0;
  }

  .preview {
    height: 100px;
    width: 100px;
    border-radius: 8px;
  }

  .preview-container:hover > .preview {
    filter: brightness(0.25);
    transition: filter 0.2s;
  }

  .delete-upload-button {
    position: absolute;
    top: 4px;
    right: 4px;
    background-color: transparent;
    filter: brightness(1);
    cursor: pointer;
    width: 28px;
    height: 28px;
    max-width: 28px;
    max-height: 28px;
    padding: 0px;
    margin: 0;
    min-width: 20px;
    cursor: pointer;
    z-index: 3;
    font-size: 22px;
    vertical-align: super;
    line-height: 0;
    border: 1px solid var(--interactive-color);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .delete-upload-button div {
    position: absolute;
    color: var(--interactive-color);
    text-align: center;
    left: 7.5px;
    top: 13.5px;
  }

  .custom-file-upload {
    cursor: pointer;
    border: 1px solid;
    margin: 24px 0;
    display: flex;
    flex-direction: column;
    height: 100px;
    width: 100px;
    border: 1px dashed var(--interactive-color);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 1.4em;
  }

  :global(.custom-file-upload svg) {
    fill: var(--interactive-color);
    height: 32px;
    width: 32px;
    margin-bottom: 4px !important;
    margin-right: 0 !important;
    display: block;
  }

  :global(.bank-campaign .info-button svg) {
    width: 18px;
    height: 18px;
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

  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  .themed-select {
    --background: var(--input-background);
    --border: 1px solid transparent;
    --borderRadius: var(--border-radius);
    --borderFocusColor: var(--interactive-color);
    --borderHoverColor: transparent;
    --placeholderColor: var(--text-color-subdued);
    --height: 40px;
    --indicatorColor: var(--interactive-color);
    --indicatorFill: var(--interactive-color);
    --indicatorHeight: 18px;
    --indicatorRight: 16px;
    --indicatorStroke: var(--interactive-color);
    --indicatorTop: 8px;
    --indicatorWidth: 18px;
    --inputColor: var(--text-color);
    --itemIsActiveBG: var(--interactive-color);
    --itemIsActiveColor: var(--text-color);
    --itemHoverBG: var(--interactive-color);
    --itemHoverColor: var(--text-color);
    --itemColor: var(--text-color);
    --clearSelectColor: var(--interactive-color);
    --clearSelectFocusColor: var(--interactive-color);
    --clearSelectHoverColor: var(--interactive-color);
    --selectedItemColor: var(--text-color);
    --listShadow: none;
  }

  :global(.themed-select input) {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  :global(.dark-theme .themed-select) {
    --listBackground: #2a2a2a;
  }

  :global(.light-theme .themed-select) {
    --listBackground: #fafafa;
  }

  :global(.listContainer) {
    font-family: var(--font-sans);
  }

  :global(.listItem .item) {
    cursor: pointer;
  }

  :global(.clearSelect) {
    cursor: pointer;
  }

  :global(.selection) {
    color: var(--text-color);
    font-family: var(--font-sans);
  }

  button.primary {
    width: 100%;
    margin-top: 16px;
  }
</style>
