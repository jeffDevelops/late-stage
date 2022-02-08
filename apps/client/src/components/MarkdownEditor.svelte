<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  let editorNode: HTMLElement
  let editor

  /**
   * PROPS
   */

  export let initialValue: string

  onMount(async () => {
    if (typeof window === 'undefined') return

    const initSimpleMDE = () => {
      editor = new (window as any).SimpleMDE({ element: editorNode, initialValue })
      editor.codemirror.on('change', () => dispatch('change', { value: editor.value() }))
    }

    const retrySimpleMDE = () => {
      try {
        initSimpleMDE()
      } catch (error) {
        setTimeout(() => {
          retrySimpleMDE()
        }, 500)
      }
    }

    retrySimpleMDE()
  })
</script>

<div class="editor">
  <textarea class="editor" bind:this={editorNode} />
</div>

<style>
  .editor {
    display: block;
    margin-top: 16px;
    width: 100%;
    background: transparent;
    border-radius: 6px;
    font-family: 'Inconsolata', monospace;
    caret-color: var(--visualization-color) !important;
    position: relative;
  }

  :global(.CodeMirror) {
    margin-bottom: 16px;
  }

  :global(.CodeMirror-scroll) {
    height: 500px;
  }

  :global(.CodeMirror.cm-s-paper.CodeMirror-wrap, .editor-toolbar, .editor-preview-active) {
    background-color: var(--input-background);
    opacity: 1 !important;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-color: transparent;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    color: var(--text-color);
    font-family: 'Inconsolata', monospace;
  }

  :global(.CodeMirror.cm-s-paper.CodeMirror-wrap, .editor-preview, .editor-preview-side) {
    padding: 16px 20px;
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
    text-transform: none;
    letter-spacing: 0.01em;
    line-height: 1.4em;
    text-shadow: none;
  }

  :global(.CodeMirror .CodeMirror-code .cm-header.cm-header-1) {
    line-height: 1em;
    font-weight: 700;
  }

  :global(.CodeMirror .CodeMirror-code .cm-header.cm-header-2) {
    line-height: 1.4em;
    font-weight: 700;
  }

  :global(.CodeMirror .CodeMirror-code .cm-header.cm-header-4) {
    line-height: 1.2em;
    font-weight: 700;
  }

  :global(strong) {
    font-weight: 700;
    font-size: unset;
  }
</style>
