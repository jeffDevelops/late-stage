import { c as create_ssr_component, v as validate_component } from "../../chunks/index-7280390d.js";
import { L as Logo } from "../../chunks/Theme-fc7d7766.js";
var reset = "";
var app = "";
var PageTransition_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "div.svelte-sfjx32{width:100vw;height:100vh}",
  map: null
};
const PageTransition = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { refresh = "" } = $$props;
  if ($$props.refresh === void 0 && $$bindings.refresh && refresh !== void 0)
    $$bindings.refresh(refresh);
  $$result.css.add(css$3);
  return `<div class="${"svelte-sfjx32"}">${slots.default ? slots.default({}) : ``}</div>`;
});
var Background_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "@keyframes svelte-1yv19xj-fade-out{from{stroke:#ff5964}to{stroke:#ff596444}}svg.svelte-1yv19xj{animation:5s svelte-1yv19xj-fade-out ease-out forwards}",
  map: null
};
const Background = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<svg width="${"100%"}" height="${"100%"}" viewBox="${"0 0 5346 3925"}" style="${"fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"}" class="${"svelte-1yv19xj"}"><path d="${"M6.25,3111.07l29.989,-725.714l13.744,684.222l30.405,-266.993l15.235,261.258l23.711,-317.515l31.489,275.992l3.805,-322.523l26.303,322.523l38.853,-401.753l33.498,401.753l17.025,-487.735l22.859,127.952l-0,-140.963l35.666,126.649l23.402,-203.349l11.667,271.042l22.664,-356.734l42.278,372.243l20.042,-447.543l6.095,487.889l32.332,-669.345l22.757,406.09l66.032,-460.58l11.878,352.922l38.641,-426.44l47.435,430.858l-4.794,-495.257l30.82,459.826l28.544,-68.185l3.997,82.927l41.516,-175.193l-0,229.226l24.863,-310.778l5.25,294.142l23.448,-388.52l33.735,407.853l19.193,-493.496l21.493,103.289l16.554,-177.609l23.883,202.917l19.415,-262.13l17.095,240.114l23.084,-70.899l3.431,109.909l31.266,-132.143l-0,168.476l33.837,-213.162l24.426,241.407l36.163,-289.451l14.008,280.306l18.783,-328.423l31.477,163.581l0.77,-224.071l40.642,229.023l16.268,-290.775l25.163,281.753l76.535,-333.048l29.936,211.047l30.152,-386.108l4.019,348.609l32.801,-421.869l20.436,213.252l29.771,-298.454l34.063,411.08l39.163,-457.324l37.691,164.228l52.188,-268.435l78.813,382.641l40.098,-491.293l43.778,477.948l56.351,-100.861l29.757,182.707l31.486,-137.028l8.958,215.023l46.307,-97.948l33.38,199.534l47.546,-362.288l-0,121.787l57.184,-333.334l56.2,333.334l3.046,-498.874l50.135,498.874l77.336,-711.734l3.574,425.719l58.329,-488.836l52.584,275.977l57.515,-146.974l46.981,146.974l5.294,-259.241l75.868,472.1l32.575,-156.788l85.617,278.576l49.779,-76.66l-0,162.388l56.149,115.479l48.921,-158.767l57.721,278.097l1.036,-279.571l37.619,164.228l49.995,-277.212l41.886,112.984l47.016,-456.175l44.293,186.07l32.582,-147.854l74.495,154.815l-0,-371.488l73.855,147.573l90.563,-317.629l0,145.073l74.233,-214.873l-0,121.787l100.486,-322.994l18.058,264.658l68.868,-430.322l21.575,287.451l63.21,-394.693l35.793,272.906l71.954,-347.93l51.248,192.987l60.587,-117.963l27.859,195.008l64.25,-43.257l28.562,121.155l58.153,-60.199l30.691,126.558l58.605,-270.613l0,261.399l45.46,-144.128l80.589,288.19l22.532,-143.254l56.599,63.834l59.091,-185.064l77.1,224.774l220.51,1635.53l38.75,-65.222l100.17,627.87l54.121,-56.206l12.563,99.67l44.51,-59.644l24.119,137.757l79.711,-13.915l67.296,289.555l32.435,-88.75l40.133,895.982"}" style="${"fill:none;;stroke-width:8.5px;"}"></path></svg>`;
});
var Header_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "header.svelte-1f8y0yi{position:fixed;top:0;right:0;display:flex;justify-content:flex-end;padding:16px;backdrop-filter:blur(5px);border-bottom-left-radius:var(--border-radius);z-index:4}a.svelte-1f8y0yi{text-decoration:none;color:var(--text-color)}.spacer.svelte-1f8y0yi{height:56px}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<header class="${"svelte-1f8y0yi"}"><a sveltekit:prefetch href="${"/"}" class="${"svelte-1f8y0yi"}">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</a></header>

<div class="${"spacer svelte-1f8y0yi"}"></div>`;
});
var __layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".background.svelte-1ryggpg{height:auto;width:100vw;position:fixed;z-index:0}.container.svelte-1ryggpg{z-index:1;position:relative}@media screen and (max-width: 1100px){.background.svelte-1ryggpg{right:0;width:auto;height:100vh}}main.svelte-1ryggpg{padding:0 64px 64px}@media screen and (max-width: 600px){main.svelte-1ryggpg{padding:0 24px 64px 56px}}",
  map: null
};
const load = async ({ url, session }) => {
  return {
    props: {
      key: url.pathname
    }
  };
};
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { key } = $$props;
  let { session } = $$props;
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  if ($$props.session === void 0 && $$bindings.session && session !== void 0)
    $$bindings.session(session);
  $$result.css.add(css);
  return `<div class="${"background svelte-1ryggpg"}">${validate_component(Background, "Background").$$render($$result, {}, {}, {})}</div>

<div class="${"container svelte-1ryggpg"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
  ${validate_component(PageTransition, "PageTransition").$$render($$result, { refresh: key }, {}, {
    default: () => `<main class="${"svelte-1ryggpg"}">${slots.default ? slots.default({}) : ``}</main>`
  })}
</div>`;
});
export { _layout as default, load };