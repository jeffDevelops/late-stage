<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import UploadIcon from '../components/iconography/Upload.svelte'

  const dispatch = createEventDispatcher()

  /**
   * PROPS
   */

  export let image: File
  export let previewAltText = 'Image upload preview'
  export let shouldDisplayError = false

  /**
   * STATE
   */

  let didUploadImage = false
  let fileInput: HTMLInputElement
  let imagePreviewSrc: string
  let error = ''

  /**
   * REACTIVE
   */

  // Clear the image preview when the image is cleared
  $: if (!image) {
    imagePreviewSrc = ''
  }

  // Image upload errors
  $: {
    error = (() => {
      if (!image) {
        error = 'Please select an image'
        return error
      }

      if (image.size > 5_000_000 /* bytes, 5MB */) {
        error =
          'To keep image hosting costs low, image must be less than 5MB. Search "compress image online free" for free options to reduce the file size of your image.'
        return error
      }

      if (image.name.match(/.(heic)$/i)) {
        error =
          ".HEIC files aren't yet supported in browsers. If you're on an iPhone, you can configure your device to share compatible file types while maintaining high-quality .HEIC files on-device. Here's how: https://backlightblog.com/iphone-heic-to-jpg."
        return error
      }

      if (!image.name.match(/.(jpg|jpeg|png|gif|pdf)$/i)) {
        error = 'Please select a valid image file type: .jpg, .jpeg, .png, .pdf, or .gif'
        return error
      }

      error = ''
      return error
    })()
  }

  $: dispatch('error', error)

  /**
   * METHODS
   */

  const handleImageChange = () => {
    didUploadImage = true

    if (fileInput.files) {
      imagePreviewSrc = URL.createObjectURL(fileInput.files[0])
      image = fileInput.files[0]
    }

    dispatch('change', image)
  }

  const removeUpload = () => {
    fileInput.value = ''
    imagePreviewSrc = ''
    image = undefined
  }
</script>

<div class="flex">
  {#if imagePreviewSrc}
    <div class="preview-container">
      <button type="button" class="delete-upload-button" on:click={removeUpload}
        ><div>×</div>
      </button>
      <img class="preview" src={imagePreviewSrc} alt={previewAltText} />
    </div>
  {/if}

  <label style="display: {imagePreviewSrc ? 'none' : 'flex'};" class="custom-file-upload">
    <input bind:this={fileInput} on:change={handleImageChange} type="file" />
    <UploadIcon /> Upload Image
  </label>
</div>
{#if shouldDisplayError && error}
  <p class="error-message">{error}</p>
{/if}

<style>
  input[type='file'] {
    display: none;
  }

  .preview-container {
    position: relative;
    height: 200px;
    width: 200px;
    margin: 24px 0 8px;
  }

  .preview {
    height: 200px;
    width: 200px;
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
    border: 0;
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
    height: 200px;
    width: 200px;
    border: 2px dashed var(--interactive-color);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 1.4em;
  }

  :global(.custom-file-upload svg) {
    fill: var(--interactive-color);
    height: 60px;
    width: 60px;
    margin-bottom: 4px !important;
    margin-right: 0 !important;
    display: block;
  }

  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  .error-message {
    text-align: center;
    margin-top: -8px;
  }
</style>
