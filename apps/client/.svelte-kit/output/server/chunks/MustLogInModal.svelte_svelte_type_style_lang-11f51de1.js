import { c as create_ssr_component, v as validate_component } from "./index-4390b0b8.js";
const Checkmark = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg height="${"24px"}" viewBox="${"0 0 24 24"}" width="${"24px"}"><path d="${"M0 0h24v24H0V0z"}" fill="${"none"}"></path><path d="${"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"}"></path></svg>`;
});
var Checkbox_svelte_svelte_type_style_lang = "";
const css = {
  code: "input[type='checkbox'].svelte-o7eg7.svelte-o7eg7{display:none}label.svelte-o7eg7.svelte-o7eg7{text-transform:none;font-size:1rem;font-family:var(--font-sans);font-weight:500;letter-spacing:0.01em;display:flex;gap:16px;justify-content:flex-start;align-items:center;cursor:pointer;margin-bottom:8px}.custom-checkbox.svelte-o7eg7.svelte-o7eg7{border:2px solid var(--visualization-color);height:24px;width:24px;min-height:24px;min-width:24px;max-width:24px;max-height:24px;background-color:var(--visualization-color);border-radius:5px;transition:border-color 0.4s;display:flex;justify-content:center;align-items:center}.checked.svelte-o7eg7 .custom-checkbox.svelte-o7eg7{border-color:var(--interactive-color)}.custom-checkbox svg{fill:var(--interactive-color);height:20px;width:20px;margin-top:4px}",
  map: null
};
const Checkbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { checked = false } = $$props;
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  $$result.css.add(css);
  return `<label class="${["svelte-o7eg7", checked ? "checked" : ""].join(" ").trim()}"><input type="${"checkbox"}" class="${"svelte-o7eg7"}">
  <div class="${"custom-checkbox svelte-o7eg7"}">${checked ? `<div>${validate_component(Checkmark, "CheckmarkIcon").$$render($$result, {}, {}, {})}</div>` : ``}</div>
  ${slots.default ? slots.default({}) : ``}
</label>`;
});
var MustLogInModal_svelte_svelte_type_style_lang = "";
export { Checkmark as C, Checkbox as a };
