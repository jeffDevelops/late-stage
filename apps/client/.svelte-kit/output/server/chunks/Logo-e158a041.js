import { g as getContext, c as create_ssr_component } from "./index-4390b0b8.js";
import { w as writable } from "./index-b462fd7a.js";
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const navigating = {
  subscribe(fn) {
    const store = getStores().navigating;
    return store.subscribe(fn);
  }
};
const throw_error = (verb) => {
  throw new Error(`Can only ${verb} session store in browser`);
};
const session = {
  subscribe(fn) {
    const store = getStores().session;
    return store.subscribe(fn);
  },
  set: () => throw_error("set"),
  update: () => throw_error("update")
};
const shouldDisplayControls = writable(true);
var Logo_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-p3rbex{text-transform:uppercase;letter-spacing:0.25em;font-weight:300;font-size:18px;margin-bottom:0}",
  map: null
};
const Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<h1 class="${"svelte-p3rbex"}">Late-Stage</h1>`;
});
export { Logo as L, session as a, navigating as n, page as p, shouldDisplayControls as s };
