import { c as create_ssr_component, h as createEventDispatcher, f as add_attribute } from "./index-4390b0b8.js";
const Pencil = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg height="${"24px"}" viewBox="${"0 0 24 24"}" width="${"24px"}"><path d="${"M0 0h24v24H0V0z"}" fill="${"none"}"></path><path d="${"M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"}"></path></svg>`;
});
var MarkdownEditor_svelte_svelte_type_style_lang = "";
const css = {
  code: ".editor.svelte-1bu4m9b{display:block;margin-top:16px;width:100%;background:transparent;border-radius:6px;font-family:'Inconsolata', monospace;caret-color:var(--visualization-color) !important;position:relative}.CodeMirror{margin-bottom:16px}.CodeMirror-scroll{height:500px}.CodeMirror.cm-s-paper.CodeMirror-wrap, .editor-toolbar, .editor-preview-active{background-color:var(--input-background);opacity:1 !important;backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);border-color:transparent;border-top:none !important;border-left:none !important;border-right:none !important;color:var(--text-color);font-family:'Inconsolata', monospace}.CodeMirror.cm-s-paper.CodeMirror-wrap, .editor-preview, .editor-preview-side{padding:16px 20px}.editor-toolbar, .editor-toolbar.fullscreen{background-color:var(--card-background)}.dark-theme .editor-preview, .dark-theme .disabled-for-preview, .dark-theme\n      .editor-preview-active-side{background-color:#2a2a2a;border:none}.light-theme .editor-preview, .light-theme .disabled-for-preview, .light-theme\n      .editor-preview-active-side{background-color:#fafafa;border:none}.editor-toolbar.disabled-for-preview a:not(.no-disable){background-color:transparent;color:var(--visualization-color) !important}.editor-toolbar.fullscreen::after, .editor-toolbar.fullscreen::before{display:none}.editor-toolbar a{color:var(--interactive-color) !important}.separator{border-color:var(--visualization-color) !important}.editor-toolbar a.active, .editor-toolbar a:hover{background:var(--visualization-color);border:none}.editor-statusbar{display:none}.CodeMirror div.CodeMirror-cursor{border-left:1px solid var(--interactive-color)}.CodeMirror-selected{background-color:var(--interactive-color) !important}.editor-preview *, .editor-preview-side *{font-family:var(--font-sans);text-transform:none;letter-spacing:0.01em;line-height:1.4em;text-shadow:none}.CodeMirror .CodeMirror-code .cm-header.cm-header-1{line-height:1em;font-weight:700}.CodeMirror .CodeMirror-code .cm-header.cm-header-2{line-height:1.4em;font-weight:700}.CodeMirror .CodeMirror-code .cm-header.cm-header-4{line-height:1.2em;font-weight:700}strong{font-weight:700;font-size:unset}",
  map: null
};
const MarkdownEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let editorNode;
  let { initialValue } = $$props;
  if ($$props.initialValue === void 0 && $$bindings.initialValue && initialValue !== void 0)
    $$bindings.initialValue(initialValue);
  $$result.css.add(css);
  return `<div class="${"editor svelte-1bu4m9b"}"><textarea class="${"editor svelte-1bu4m9b"}"${add_attribute("this", editorNode, 0)}></textarea>
</div>`;
});
export { MarkdownEditor as M, Pencil as P };
