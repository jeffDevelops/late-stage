<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { session } from '$app/stores'

  import Select from '../../components/Select.svelte'
  import ImageUpload from '../../components/ImageUpload.svelte'
  import Checkbox from '../../components/Checkbox.svelte'
  import ProtestIcon from '../../components/iconography/Protest.svelte'
  import Spinner from '../../components/iconography/Spinner.svelte'
  import BankCampaignSuccessModal from './BankCampaignSuccessModal.svelte'
  import MustLogInModal from '../MustLogInModal.svelte'
  import BankCampaignStep1 from './BankCampaignStep1.svelte'
  import BankCampaignStep2 from './BankCampaignStep2.svelte'
  import BankCampaignStep3Instructions from './BankCampaignStep3Instructions.svelte'
  import BankCampaignStep5 from './BankCampaignStep5.svelte'

  import { env } from '../../networking/env'
  import { gqlRequest } from '../../networking/gqlRequest'
  import { imageKitAuthParams } from '../../networking/graphql/query/ImageKitAuthParams'
  import { recordBankExodusCompletion } from '../../networking/graphql/mutation/RecordBankExodusCompletion'
  import { recaptchaVerification } from '../../networking/graphql/query/RecaptchaVerification'
  import { shouldDisplayControls } from '../../stores/Controls'
  import { disableInteractablesWhile } from '../../utility/disableInteractablesWhile'

  import { LocalStorageKeys } from '../../types/LocalStorageKeys'
  import type { RecordBankExodusCampaignCompletionInput } from '../../types/BankCampaign/RecordBankExodusCampaignCompletionInput'
  import type { Campaign } from '../../types/Campaign'

  /**
   * PROPS
   */

  export let campaign: Campaign

  /**
   * STATE
   */

  // Form state
  let image: File | undefined
  let didUploadImage = false
  let isAnonymous = true
  let withdrawalAmount: string = ''
  let institutionSelection: { index: number; value: string; label: string } | undefined = undefined
  let originInstitutionName: string = ''
  let destinationInstitutionName: string = ''
  let otherInfo = ''

  // Reasons for switching checkboxes
  let dontInvestInFossilFuels: boolean = false
  let dontInvestInSLABS: boolean = false
  let dontChargeAccountFees: boolean = false
  let offerFairRatesToAccountHolders: boolean = false
  let conscientiousAboutHumanRights: boolean = false
  let other: boolean = false

  // Modals
  let isShowingMustLogInModal = false
  let isShowingSuccessModal = false

  let errors = {
    image: 'Please select an image',
    withdrawalAmount: 'Withdrawal amount is required',
    institutionSelection: 'Please select an institution',
    originInstitutionName: 'Financial institution name is required',
    destinationInstitutionName: 'Financial institution name is required',
    form: '',
  }
  let loading = false
  let didAttemptSubmit = false
  let honeypot = ''

  /**
   * ImageKit Auth Params (set by onMount call)
   */
  let expire: number
  let signature: string
  let token: string

  /**
   * LIFECYCLE
   */

  const getImageKitAuthParams = async () => {
    if (!$session.user) return

    try {
      /**
       * Make the ImageKit auth call
       */
      const response = await fetch(
        `${env.viteSveltekitHost}/proxy/imagekit-auth-params`,
        gqlRequest({
          query: imageKitAuthParams,
        }),
      )

      const deserialized = await response.json()

      token = deserialized.token
      expire = deserialized.expire
      signature = deserialized.signature
    } catch (error) {
      console.error(error)
    }
  }

  let container: HTMLElement
  let containerWidth: number = 0

  onMount(async () => {
    // IMAGEKIT
    await getImageKitAuthParams()

    // RECAPTCHA
    ;(window as any).onloadCallback = () => {
      ;(window as any).grecaptcha.render('g-recaptcha', {
        sitekey: '6LcTU5YeAAAAAEtSIlYHfMtHID8YBGv6rThyV9xC',
        theme: document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light',
      })
    }

    document.head.appendChild(
      Object.assign(document.createElement('script'), {
        src: 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit',
        async: true,
        defer: true,
      }),
    )

    /**
     * Resize
     */

    const handleResize = () => {
      containerWidth = container?.getBoundingClientRect().width
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      ;(window as any).onloadCallback = null
      ;(window as any).responseCallback = null
      window.removeEventListener('resize', handleResize)

      document.head.removeChild(
        document.head.querySelector(
          'script[src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"]',
        ),
      )
    }
  })

  /**
   * REACTIVE
   */

  $: $shouldDisplayControls = !isShowingSuccessModal

  // Withdrawal Amount errors
  $: errors = (() => {
    if (withdrawalAmount === '') {
      errors.withdrawalAmount = 'Please enter an amount'
      return errors
    }

    if (parseFloat(withdrawalAmount) === 0) {
      errors.withdrawalAmount = 'Please enter a non-zero amount'
      return errors
    }

    errors.withdrawalAmount = ''
    return errors
  })()

  // Institution Selection errors
  $: errors = (() => {
    if (!institutionSelection) {
      errors.institutionSelection = 'Please select an institution'
      return errors
    }

    errors.institutionSelection = ''
    return errors
  })()

  // Other Institution errors
  $: errors = (() => {
    if (institutionSelection?.value === 'Other' && !originInstitutionName) {
      errors.originInstitutionName =
        'Please enter the name of the institution you removed money from'
      return errors
    }

    errors.originInstitutionName = ''
    return errors
  })()

  // Destination Institution errors
  $: errors = (() => {
    if (!destinationInstitutionName) {
      errors.destinationInstitutionName =
        'Please enter the name of the institution you moved money to'
      return errors
    }

    errors.destinationInstitutionName = ''
    return errors
  })()

  $: if (!!image) didUploadImage = true

  $: formContainsErrors = Object.keys(errors).some((key) => errors[key] !== '')

  /**
   * METHODS
   */

  const resetForm = () => {
    removeUpload()
    isAnonymous = true

    withdrawalAmount = ''
    institutionSelection = undefined
    originInstitutionName = ''
    destinationInstitutionName = ''

    dontInvestInFossilFuels = false
    dontInvestInSLABS = false
    dontChargeAccountFees = false
    offerFairRatesToAccountHolders = false
    conscientiousAboutHumanRights = false
    other = false
    otherInfo = ''

    didAttemptSubmit = false
    didUploadImage = false
  }

  const removeUpload = () => {
    image = undefined
  }

  const handleFormClick = (e) => {
    if (!$session.user) {
      e.preventDefault()
      isShowingMustLogInModal = true
      return
    }
  }

  const handleWithdrawalAmountKeydown = (e: any) => {
    if (e.key === 'e' || e.key === '-' || e.key === '+') e.preventDefault()
    if (
      // Prevent more than 2 decimal points
      ((e.target.value.toString().includes('.') &&
        e.target.value.toString().split('.')[1].length >= 2) ||
        // Prevent amounts greater than 999 Million
        e.target.value >= 999_999_999) &&
      e.key !== 'Backspace' &&
      e.key !== 'Delete' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight'
    ) {
      e.preventDefault()
    }
  }

  const handleSubmit = async () => {
    didAttemptSubmit = true

    if (formContainsErrors) return

    if (honeypot) {
      loading = true
      return await disableInteractablesWhile(async () => {
        setTimeout(async () => {
          loading = false
        }, 2000)
      })
    }

    const storageSubmissionsCount = localStorage.getItem(
      LocalStorageKeys.BankCampaignSubmissionsCount,
    )

    if (storageSubmissionsCount && parseInt(storageSubmissionsCount) >= 5) {
      errors.form = 'You have reached the maximum number of submissions allowed for this campaign.'
      return
    }

    loading = true

    // Recaptcha verification
    const recaptchaResultToken = (window as any).grecaptcha.getResponse()

    const recaptchaVerificationResponse = await fetch(
      `${env.viteSveltekitHost}/proxy/recaptcha-verification`,
      gqlRequest({
        query: recaptchaVerification,
        variables: {
          recaptchaResultToken,
        },
      }),
    )

    if (!recaptchaVerificationResponse) {
      errors.form = 'There was an error verifying your submission. Please try again.'
      return
    }

    const formData = new FormData()
    formData.append('file', image)
    formData.append('publicKey', env.viteImageKitPublicKey)
    formData.append('folder', `/bank-exodus/${$session.user.id}`)
    formData.append('fileName', 'withdrawal-receipt')
    formData.append('useUniqueFileName', 'true')
    formData.append('signature', signature)
    formData.append('expire', expire.toString())
    formData.append('token', token)

    await disableInteractablesWhile(async () => {
      try {
        const imageUploadResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
          method: 'POST',
          body: formData,
        })

        const imageUploadResponseDeserialized = await imageUploadResponse.json()

        const response = await fetch(
          `${env.viteSveltekitHost}/proxy/record-bank-exodus-completion`,
          gqlRequest<RecordBankExodusCampaignCompletionInput>({
            query: recordBankExodusCompletion,
            variables: {
              RecordBankExodusCompletionInput: {
                campaignId: campaign.id,
                withdrawalReceiptImageURL: imageUploadResponseDeserialized.url,
                imageKitFileId: imageUploadResponseDeserialized.fileId,
                withdrawalAmount: parseFloat(withdrawalAmount),
                originInstitutionName:
                  institutionSelection.value === 'Other'
                    ? originInstitutionName
                    : institutionSelection.value,
                destinationInstitutionName,
                isAnonymous,

                // Reasons for moving to this destination bank
                dontInvestInFossilFuels,
                dontInvestInSLABS,
                dontChargeAccountFees,
                offerFairRatesToAccountHolders,
                conscientiousAboutHumanRights,
                other,
                otherInfo,
              },
            },
          }),
        )

        const responseDeserialized = await response.json()

        if (responseDeserialized.error) {
          errors.form = responseDeserialized.error.message
          loading = false
          return
        }

        loading = false
        await getImageKitAuthParams()

        /**
         * Local storage measure for preventing spamming the server
         */
        const storageSubmissionsCountStr = localStorage.getItem(
          LocalStorageKeys.BankCampaignSubmissionsCount,
        )

        if (storageSubmissionsCountStr) {
          const storageSubmissionsCount = parseInt(storageSubmissionsCountStr)
          localStorage.setItem(
            LocalStorageKeys.BankCampaignSubmissionsCount,
            (storageSubmissionsCount + 1).toString(),
          )
        } else {
          localStorage.setItem(LocalStorageKeys.BankCampaignSubmissionsCount, '1')
        }

        isShowingSuccessModal = true
      } catch (error) {
        console.error(error)

        errors.form = 'An unknown error occurred. Please check your input try again.'
      }
    })
  }
</script>

<svelte:head />

<MustLogInModal
  on:dismiss={() => (isShowingMustLogInModal = false)}
  isDisplayed={isShowingMustLogInModal}
/>

<BankCampaignSuccessModal
  {campaign}
  isDisplayed={isShowingSuccessModal}
  on:dismiss={() => {
    resetForm()
    isShowingSuccessModal = false
  }}
/>

<section class="bank-campaign" bind:this={container}>
  <h2><ProtestIcon /> How?</h2>

  <BankCampaignStep1 />
  <BankCampaignStep2 />
  <BankCampaignStep3Instructions />

  <form
    novalidate
    disabled={loading || !$session.user}
    on:click={handleFormClick}
    enctype="multipart/form-data"
    on:submit|preventDefault={handleSubmit}
  >
    <ImageUpload
      on:change={(e) => (image = e.detail)}
      on:error={(e) => (errors.image = e.detail)}
      {image}
      previewAltText="Withdrawal receipt preview"
      shouldDisplayError={didAttemptSubmit || didUploadImage}
    />

    <p class="checkbox-instructions">
      Do you want the app to show your username along with your proof of participation to other
      members of the platform, or do you want your withdrawal to be anonymous? We will never show
      personal data to unregistered users.
    </p>
    <Checkbox on:change={() => (isAnonymous = !isAnonymous)} checked={isAnonymous}
      >Keep my withdrawal receipt anonymous, even to other users</Checkbox
    >

    <h4>Step 4: Tell us about your switch</h4>

    <label for="withdrawal-amount">Withdrawal Amount ($)</label>
    <input
      on:keydown={handleWithdrawalAmountKeydown}
      bind:value={withdrawalAmount}
      id="withdrawal-amount"
      type="number"
      novalidate
    />

    <div class="form-control">
      <label for="withdrawal-date">Withdrawal Date</label>
      <input
        id="withdrawal-date"
        class:disabled={loading}
        aria-label="If you are reading this, do not fill this out."
        bind:value={honeypot}
        autocomplete="off"
        type="number"
        novalidate
      />
    </div>

    {#if errors.withdrawalAmount && didAttemptSubmit}
      <p class="error-message">{errors.withdrawalAmount}</p>
    {/if}

    <label for="institution">I removed money from:</label>
    <div class="themed-select">
      <Select
        on:select={(e) => (institutionSelection = e.detail)}
        value={institutionSelection}
        placeholder="Select an institution"
        items={['Chase Bank', 'Bank of America', 'Wells Fargo', 'Citi', 'Other']}
      />
    </div>

    {#if errors.institutionSelection && didAttemptSubmit}
      <p class="error-message">{errors.institutionSelection}</p>
    {/if}

    {#if institutionSelection?.value === 'Other'}
      <div in:fade out:fade>
        <label for="institution-name">Institution Name</label>
        <input bind:value={originInstitutionName} type="text" id="institution-name" />
      </div>

      {#if errors.originInstitutionName && didAttemptSubmit}
        <p class="error-message">{errors.originInstitutionName}</p>
      {/if}
    {/if}

    <label for="institution">I moved money to:</label>
    <div class="themed-select">
      <input
        bind:value={destinationInstitutionName}
        type="text"
        id="destination-institution-name"
      />
    </div>

    {#if errors.destinationInstitutionName && didAttemptSubmit}
      <p class="error-message">{errors.destinationInstitutionName}</p>
    {/if}

    <p class="checkbox-instructions">
      Help make this process easier for others in the future by telling us why you decided to switch
      to your new financial institution <strong>(check all that apply)</strong>:
    </p>

    <div class="flex-row" class:wrap={containerWidth <= 500}>
      <Checkbox
        on:change={() => (dontInvestInFossilFuels = !dontInvestInFossilFuels)}
        checked={dontInvestInFossilFuels}>They don't invest in fossil-fuels</Checkbox
      >
      <Checkbox
        on:change={() => (dontInvestInSLABS = !dontInvestInSLABS)}
        checked={dontInvestInSLABS}
        >They don't invest in student loan asset-backed securities (SLABS)</Checkbox
      >
    </div>
    <div class="flex-row" class:wrap={containerWidth <= 500}>
      <Checkbox
        on:change={() => (conscientiousAboutHumanRights = !conscientiousAboutHumanRights)}
        checked={conscientiousAboutHumanRights}>They're conscientious about human rights</Checkbox
      >
      <Checkbox
        on:change={() => (dontChargeAccountFees = !dontChargeAccountFees)}
        checked={dontChargeAccountFees}>They don't charge account fees</Checkbox
      >
    </div>
    <div class="flex-row" class:wrap={containerWidth <= 500}>
      <Checkbox
        on:change={() => (offerFairRatesToAccountHolders = !offerFairRatesToAccountHolders)}
        checked={offerFairRatesToAccountHolders}>They offered a fairer interest rate</Checkbox
      >
      <Checkbox on:change={() => (other = !other)} checked={other}>Other</Checkbox>
    </div>

    <p class="checkbox-instructions">
      Feel free to share anything you think others should know about your new financial institution.
      If you elected "Other," let us know why you made the switch:
    </p>
    <textarea bind:value={otherInfo} />

    {#if errors.form}
      <p class="error-message">{errors.form}</p>
    {/if}

    <div id="g-recaptcha" data-sitekey={env.viteRecaptchaSiteKey} />

    <button
      disabled={loading || (didAttemptSubmit && formContainsErrors)}
      class:disabled={loading || (didAttemptSubmit && formContainsErrors)}
      type="submit"
      class="primary"
    >
      {#if loading}
        <Spinner />
      {:else}
        Tally My Withdrawal
      {/if}
    </button>

    {#if formContainsErrors && didAttemptSubmit}
      <p class="error-message">The form above contains errors. Check your input and try again.</p>
    {/if}
  </form>

  <BankCampaignStep5 />
</section>

<style>
  h4 {
    margin-top: 40px;
  }

  :global(.bank-campaign .info-button svg) {
    width: 18px;
    height: 18px;
    fill: var(--interactive-color);
  }

  :global(.bank-campaign .info h4) {
    margin-top: 0;
  }

  #withdrawal-amount::after {
    position: absolute;
    top: 0;
    left: 8px;
    content: ' ';
    color: var(--text-color);
    z-index: 10000;
  }

  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  .flex-row {
    display: flex;
    justify-content: flex-start;
    gap: 8px;
  }

  .flex-row.wrap {
    flex-wrap: wrap;
    gap: 0;
  }

  :global(.bank-campaign .flex-row > *) {
    width: calc(50% - 8px);
  }

  :global(.bank-campaign .flex-row.wrap > *) {
    width: 100% !important;
  }

  button.primary {
    width: 100%;
    margin-top: 16px;
  }

  :global(button.primary > svg) {
    fill: var(--button-text-color);
  }

  .checkbox-instructions {
    margin-top: 16px;
  }

  textarea {
    height: 80px;
  }

  .form-control {
    position: absolute;
    top: 0px;
    opacity: 0;
    width: calc(100% - 96px);
  }

  :global(.bank-campaign #g-recaptcha) {
    margin-top: 16px;
    margin-left: auto;
  }
</style>
