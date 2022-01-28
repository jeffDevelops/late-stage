import { c as create_ssr_component } from "./index-4390b0b8.js";
var Card_svelte_svelte_type_style_lang = "";
const css = {
  code: ".card.svelte-1047sxo{background-color:var(--card-background);border-radius:var(--border-radius);padding:24px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}@media screen and (max-width: 600px){.card.svelte-1047sxo{padding:16px}}",
  map: null
};
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"card svelte-1047sxo"}">${slots.default ? slots.default({}) : ``}
</div>`;
});
export { Card as C };
