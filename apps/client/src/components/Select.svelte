<script lang="ts">
  import Select, { SelectProps } from 'svelte-select'

  /**
   * PROPS
   */

  /** The selected value */
  export let value: SelectProps['value']

  /** Whether the dropdown indicator chevron is displayed */
  export let showIndicator = true

  /** The placeholder text */
  export let placeholder = 'Select an option'

  /** The displayed text representation of each item in the select list */
  export let items = []
</script>

<div class="themed-select">
  <Select on:select bind:value {showIndicator} {placeholder} {items} />
</div>

<style>
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
    --itemHoverColor: var(--button-text-color);
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
</style>
