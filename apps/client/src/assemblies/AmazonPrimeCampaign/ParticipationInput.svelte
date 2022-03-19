<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { session } from '$app/stores'

  import Select from '../../components/Select.svelte'
  import ImageUpload from '../../components/ImageUpload.svelte'
  import Checkbox from '../../components/Checkbox.svelte'
  import Spinner from '../../components/iconography/Spinner.svelte'
  import ProtestIcon from '../../components/iconography/Protest.svelte'
  import MustLogInModal from '../MustLogInModal.svelte'
  import Step1 from './Step1.svelte'
  import Step2 from './Step2.svelte'
  import Step5 from './Step5.svelte'
  import SuccessModal from './SuccessModal.svelte'
  import AlreadyHasParticipated from './AlreadyHasParticipated.svelte'

  import { env } from '../../networking/env'
  import { gqlRequest } from '../../networking/gqlRequest'
  import { imageKitAuthParams } from '../../networking/graphql/query/ImageKitAuthParams'
  import { recordAmazonPrimeCompletion } from '../../networking/graphql/mutation/RecordAmazonPrimeCompletion'
  import { recaptchaVerification } from '../../networking/graphql/query/RecaptchaVerification'
  import { shouldDisplayControls } from '../../stores/Controls'
  import { disableInteractablesWhile } from '../../utility/disableInteractablesWhile'

  import { MembershipSelections } from '../../types/AmazonPrimeCampaign/RecordAmazonPrimeCampaignCompletionInput'
  import type { RecordAmazonPrimeCampaignCompletionInput } from '../../types/AmazonPrimeCampaign/RecordAmazonPrimeCampaignCompletionInput'
  import type { Campaign } from '../../types/Campaign'

  /**
   * PROPS
   */

  export let campaign: Campaign
  export let hasCompletedCampaign: boolean

  /**
   * STATE
   */

  // Form state
  let image: File | undefined
  let didUploadImage = false
  let isAnonymous = true
  let membershipSelection: { index: number; value: string; label: string } | undefined = undefined
  let otherInfo = ''

  // Reasons for switching checkboxes
  let environmentalConcerns = false
  let antiCompetitionConcerns = false
  let workersRightsConcerns = false
  let marketplaceAntitrustConcerns = false

  // Modals
  let isShowingMustLogInModal = false
  let isShowingSuccessModal = false

  let errors = {
    image: 'Please select an image',
    membershipSelection: 'Please select the membership you are cancelling',
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
    /**
     * Resize
     */

    const handleResize = () => {
      containerWidth = container?.getBoundingClientRect().width
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    // IMAGEKIT
    if (!hasCompletedCampaign) {
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
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      ;(window as any).onloadCallback = null
      ;(window as any).responseCallback = null

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

  // Membership Selection errors
  $: errors = (() => {
    if (!membershipSelection) {
      errors.membershipSelection = 'Please select your membership'
      return errors
    }

    errors.membershipSelection = ''
    return errors
  })()

  $: if (!!image) didUploadImage = true

  $: formContainsErrors = Object.keys(errors).some((key) => errors[key] !== '' && key !== 'form')

  /**
   * METHODS
   */

  const resetForm = () => {
    removeUpload()
    isAnonymous = true
    membershipSelection = undefined

    environmentalConcerns = false
    antiCompetitionConcerns = false
    workersRightsConcerns = false
    marketplaceAntitrustConcerns = false

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
    formData.append('folder', `${env.viteEnvironment}/amazon-prime/${$session.user.id}`)
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
          `${env.viteSveltekitHost}/proxy/record-amazon-prime-completion`,
          gqlRequest<RecordAmazonPrimeCampaignCompletionInput>({
            query: recordAmazonPrimeCompletion,
            variables: {
              RecordAmazonPrimeCompletionInput: {
                campaignId: campaign.id,
                cancellationImageURL: imageUploadResponseDeserialized.url,
                imageKitFileId: imageUploadResponseDeserialized.fileId,
                membershipSelection: membershipSelection.value as MembershipSelections,
                isAnonymous,

                // Reasons for cancelling
                environmentalConcerns,
                antiCompetitionConcerns,
                workersRightsConcerns,
                marketplaceAntitrustConcerns,
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

        isShowingSuccessModal = true
        hasCompletedCampaign = true
      } catch (error) {
        console.error(error)

        errors.form = 'An unknown error occurred. Please check your input try again.'
      }
    })
  }

  $: console.log(membershipSelection)
</script>

<svelte:head />

<MustLogInModal
  on:dismiss={() => (isShowingMustLogInModal = false)}
  isDisplayed={isShowingMustLogInModal}
/>

<SuccessModal
  {campaign}
  isDisplayed={isShowingSuccessModal}
  on:dismiss={() => {
    resetForm()
    isShowingSuccessModal = false
  }}
/>

<section class="prime-campaign" bind:this={container}>
  {#if hasCompletedCampaign}
    <div in:fade out:fade style="height: 100%;">
      <AlreadyHasParticipated />
    </div>
  {:else}
    <div in:fade out:fade>
      <h2><ProtestIcon /> How?</h2>
      <Step1 />
      <Step2 />

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
          previewAltText="Prime membership cancellation confirmation"
          shouldDisplayError={didAttemptSubmit || didUploadImage}
        />

        <p class="checkbox-instructions">
          Do you want the app to show your username along with your proof of participation to other
          members of the platform, or do you want your withdrawal to be anonymous? We will never
          show personal data to unregistered users.
        </p>
        <Checkbox on:change={() => (isAnonymous = !isAnonymous)} checked={isAnonymous}
          >Keep my membership cancellation anonymous, even to other users</Checkbox
        >

        <h4>Step 3: Which membership did you have?</h4>
        <p>
          Let us know which membership you're cancelling so that we can calculate how much Amazon is
          losing out on our collective membership fees as a result of our campaign.
        </p>

        <div class="themed-select">
          <Select
            on:select={(e) => (membershipSelection = e.detail)}
            value={membershipSelection}
            placeholder="Select your membership"
            items={[
              { label: MembershipSelections.Annually, value: 'Annually' },
              { label: MembershipSelections.Monthly, value: 'Monthly' },
              { label: MembershipSelections.PrimeVideo, value: 'PrimeVideo' },
              { label: MembershipSelections.StudentAnnually, value: 'StudentAnnually' },
              { label: MembershipSelections.StudentMonthly, value: 'StudentMonthly' },
              { label: MembershipSelections.Discounted, value: 'Discounted' },
            ]}
          />
        </div>

        {#if errors.membershipSelection && didAttemptSubmit}
          <p class="error-message">{errors.membershipSelection}</p>
        {/if}

        <h4>Step 4: Why, specifically, are you cancelling today?</h4>
        <p class="checkbox-instructions">Select all that apply:</p>

        <div class="flex-row" class:wrap={containerWidth <= 500}>
          <Checkbox
            on:change={() => (environmentalConcerns = !environmentalConcerns)}
            checked={environmentalConcerns}
            >Amazon and AWS's contributions to climate change and packaging waste</Checkbox
          >
          <Checkbox
            on:change={() => (antiCompetitionConcerns = !antiCompetitionConcerns)}
            checked={antiCompetitionConcerns}>Amazon's anticompetitive business practices</Checkbox
          >
        </div>
        <div class="flex-row" class:wrap={containerWidth <= 500}>
          <Checkbox
            on:change={() => (workersRightsConcerns = !workersRightsConcerns)}
            checked={workersRightsConcerns}
            >Amazon's union-busting behaviors, unsafe working conditions, and worker exploitation</Checkbox
          >
          <Checkbox
            on:change={() => (marketplaceAntitrustConcerns = !marketplaceAntitrustConcerns)}
            checked={marketplaceAntitrustConcerns}>Amazon's marketplace antitrust concerns</Checkbox
          >
        </div>

        <label for="prime-cancellation-other-reason"
          >Are there any other reasons you're cancelling today?</label
        >
        <textarea id="prime-cancellation-other-reason" bind:value={otherInfo} />

        <div class="form-control">
          <label for="withdrawal-date"
            >Monthly membership price: how much do you pay a month for Amazon Prime?</label
          >
          <input
            id="membership-price"
            class:disabled={loading}
            aria-label="If you are reading this, do not fill this out."
            bind:value={honeypot}
            autocomplete="off"
            type="number"
            novalidate
          />
        </div>

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
            Record my participation
          {/if}
        </button>

        {#if formContainsErrors && didAttemptSubmit}
          <p class="error-message">
            The form above contains errors. Check your input and try again.
          </p>
        {/if}
      </form>

      <Step5 />
    </div>
  {/if}
</section>

<style>
  .prime-campaign {
    height: 100%;
    width: 100%;
    position: relative;
  }

  h4 {
    margin-top: 40px;
  }

  form {
    margin-bottom: 16px;
  }

  :global(.prime-campaign .info-button svg) {
    width: 18px;
    height: 18px;
    fill: var(--interactive-color);
  }

  :global(.prime-campaign .info h4) {
    margin-top: 0;
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

  :global(.prime-campaign .flex-row > *) {
    width: calc(50% - 8px);
  }

  :global(.prime-campaign .flex-row.wrap > *) {
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
    top: -9999px;
    left: -9999px;
    opacity: 0;
    width: calc(100% - 96px);
  }

  :global(.prime-campaign #g-recaptcha) {
    margin-top: 16px;
    margin-left: auto;
  }
</style>
