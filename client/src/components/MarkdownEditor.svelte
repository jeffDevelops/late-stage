<script lang="ts">
  import { onMount } from 'svelte'

  let editorNode: HTMLElement
  let editor

  /** Props */
  export let initialValue: string

  onMount(async () => {
    if (typeof window === 'undefined') return

    editor = new (window as any).SimpleMDE({ element: editorNode, initialValue })
  })
</script>

<svelte:head>
  <script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>
</svelte:head>

<div class="editor">
  <textarea class="editor" bind:this={editorNode} />
</div>

<style>
  .editor {
    display: block;
    margin-top: 16px;
    height: 700px;
    width: 100%;
    background: transparent;
    border-radius: 6px;
    font-family: 'Inconsolata', monospace;
    caret-color: var(--visualization-color) !important;
  }

  :global(.CodeMirror.cm-s-paper.CodeMirror-wrap, .editor-toolbar, .editor-preview-active) {
    background-color: var(--input-background);
    opacity: 1 !important;
    backdrop-filter: blur(5px);
    border-color: transparent;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    color: var(--text-color);
    font-family: 'Inconsolata', monospace;
  }

  :global(.CodeMirror.cm-s-paper.CodeMirror-wrap, .editor-preview, .editor-preview-side) {
    padding: 16px 24px;
  }

  :global(.editor-toolbar, .editor-toolbar.fullscreen) {
    background-color: var(--card-background);
  }

  :global(.dark-theme .editor-preview, .dark-theme .disabled-for-preview, .dark-theme
      .editor-preview-active-side) {
    background-color: #2a2a2a;
    border: none;
  }

  :global(.light-theme .editor-preview, .light-theme .disabled-for-preview, .light-theme
      .editor-preview-active-side) {
    background-color: #fafafa;
    border: none;
  }

  :global(.editor-toolbar.disabled-for-preview a:not(.no-disable)) {
    background-color: transparent;
    color: var(--visualization-color) !important;
  }

  :global(.editor-toolbar.fullscreen::after, .editor-toolbar.fullscreen::before) {
    display: none;
  }

  :global(.editor-toolbar a) {
    color: var(--interactive-color) !important;
  }

  :global(.separator) {
    border-color: var(--visualization-color) !important;
  }

  :global(.editor-toolbar a.active, .editor-toolbar a:hover) {
    background: var(--visualization-color);
    border: none;
  }

  :global(.editor-statusbar) {
    display: none;
  }

  :global(.CodeMirror div.CodeMirror-cursor) {
    border-left: 1px solid var(--interactive-color);
  }

  :global(.CodeMirror-selected) {
    background-color: var(--interactive-color) !important;
  }

  :global(.editor-preview *, .editor-preview-side *) {
    font-family: var(--font-sans);
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0.01em;
    text-shadow: none;
  }
</style>
