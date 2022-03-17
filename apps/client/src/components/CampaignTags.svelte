<script lang="ts">
  /**
   * PROPS
   */

  export let tags: { name: string }[]

  /** Whether the tags wrap to next line(s) if they overflow horizontally */
  export let wrap: boolean | undefined = false
</script>

{#if tags.length > 0}
  <section class="container">
    <div
      class="tags-container"
      style="
  {wrap ? 'flex-wrap: wrap;' : 'flex-wrap: nowrap;'}
  "
    >
      {#each tags as tag}
        <p class="tag">{tag.name}</p>
      {/each}
    </div>
  </section>
{/if}

<style>
  :global(.tags-container .icon-container .block-icon) {
    height: 24px;
    width: 24px;
    fill: var(--text-color-subdued);
  }

  .container {
    overflow-x: hidden;
  }

  .tags-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
    overflow-x: auto;
    padding-bottom: 0;
    margin-top: 8px;
    overflow-x: auto;
  }

  .tag {
    width: auto;
    font-size: 0.8em;
    white-space: nowrap;
    display: inline-block;
    background-color: var(--interactive-color);
    color: var(--button-text-color);
    border-radius: 16px;
    padding: 4px 16px;
    margin-bottom: 0;
    cursor: default;
    border: 1px solid var(--app-background);
  }

  .tags-container::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
    height: 0;
  }
  /* Optional: show position indicator in red */
  .tags-container::-webkit-scrollbar-thumb {
    background: transparent;
  }
</style>
