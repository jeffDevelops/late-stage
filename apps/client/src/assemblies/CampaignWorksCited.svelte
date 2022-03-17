<script lang="ts">
  import Quote from '../components/iconography/Quote.svelte'

  import type { WorksCited } from '../types/WorksCited'

  /**
   * PROPS
   */

  export let worksCited: WorksCited
</script>

<h2><Quote /> Works Cited</h2>

<ul>
  {#each worksCited as work}
    <li>
      <p>
        {work.authorLastName}{#if work.authorFirstInitial}, {work.authorFirstInitial}{/if}{#if work.authorLastName2}
          {#if work.authorLastName3}<!-- determine separator depending on the presence of a third author -->
            .,
          {:else}
            . and
          {/if}
          {work.authorLastName2}, {work.authorFirstInitial2}{/if}{#if work.authorLastName3}
          ., and {work.authorLastName3}, {work.authorFirstInitial3}{/if}. ({work.publicationYear}, {work.publicationMonth}{#if work.publicationDate}
          {' '}{work.publicationDate}{/if}).
        <em>{work.title}</em>. {work.publicationName}.

        {#if 'hyperlink' in work}
          <a href={work.hyperlink}>{work.hyperlink}</a>
        {/if}
      </p>
    </li>
  {/each}
</ul>

<style>
  li:not(:last-child) {
    margin-bottom: 16px;
  }

  a {
    word-break: break-all;
  }

  p {
    color: var(--text-color-subdued);
    font-size: 14px;
  }
</style>
