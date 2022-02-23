<script lang="ts">
  import { fade } from 'svelte/transition'
  import CheckmarkIcon from './iconography/Checkmark.svelte'

  /**
   * PROPS
   */

  export let checked: boolean = false
</script>

<label
  class:checked
  style="transition: color .2s; color: {checked
    ? 'var(--text-color)'
    : 'var(--text-color-subdued)'} !important;"
>
  <input on:change type="checkbox" />
  <div class="custom-checkbox">
    {#if checked}
      <div in:fade out:fade>
        <CheckmarkIcon />
      </div>
    {/if}
  </div>
  <slot />
</label>

<style>
  input[type='checkbox'] {
    display: none;
  }

  label {
    text-transform: none;
    font-size: 1rem;
    font-family: var(--font-sans);
    font-weight: 500;
    letter-spacing: 0.01em;
    display: flex;
    gap: 16px;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    margin-bottom: 8px;
  }

  .custom-checkbox {
    border: 2px solid var(--visualization-color);
    height: 24px;
    width: 24px;
    min-height: 24px;
    min-width: 24px;
    max-width: 24px;
    max-height: 24px;
    background-color: var(--visualization-color);
    border-radius: 5px;
    transition: border-color 0.4s;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .checked .custom-checkbox {
    border-color: var(--interactive-color);
  }

  :global(.custom-checkbox svg) {
    fill: var(--interactive-color);
    height: 20px;
    width: 20px;
    margin-top: 4px;
  }
</style>
