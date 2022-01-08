import { c as create_ssr_component, n as noop, a as safe_not_equal } from "./index-7280390d.js";
var Logo_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-p3rbex{text-transform:uppercase;letter-spacing:0.25em;font-weight:300;font-size:18px;margin-bottom:0}",
  map: null
};
const Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<h1 class="${"svelte-p3rbex"}">Late-Stage</h1>`;
});
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set2(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set2(fn(value));
  }
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set2) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set: set2, update, subscribe: subscribe2 };
}
var SessionStorageKeys;
(function(SessionStorageKeys2) {
  SessionStorageKeys2["PrefersColorScheme"] = "prefersColorScheme";
})(SessionStorageKeys || (SessionStorageKeys = {}));
const isBrowser = typeof window !== "undefined";
const computeInitialColorScheme = () => {
  if (!isBrowser)
    return "light";
  if (window.sessionStorage.getItem(SessionStorageKeys.PrefersColorScheme)) {
    const storageValue = window.sessionStorage.getItem(SessionStorageKeys.PrefersColorScheme);
    if (storageValue === "dark" || storageValue === "light") {
      return storageValue;
    }
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};
const theme = computeInitialColorScheme();
const updateRootStyles = (prefersColorScheme2) => {
  if (isBrowser) {
    document.firstElementChild.classList.add(prefersColorScheme2 === "dark" ? "dark-theme" : "light-theme");
    document.firstElementChild.classList.remove(prefersColorScheme2 === "dark" ? "light-theme" : "dark-theme");
  }
};
updateRootStyles(theme);
const { set, subscribe } = writable(theme);
const prefersColorScheme = {
  subscribe,
  setToLight: () => {
    sessionStorage.setItem(SessionStorageKeys.PrefersColorScheme, "light");
    updateRootStyles("light");
    set("light");
  },
  setToDark: () => {
    sessionStorage.setItem(SessionStorageKeys.PrefersColorScheme, "dark");
    updateRootStyles("dark");
    set("dark");
  }
};
export { Logo as L, prefersColorScheme as p, writable as w };
