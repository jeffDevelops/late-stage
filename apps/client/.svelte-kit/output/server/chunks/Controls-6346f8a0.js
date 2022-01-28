import { c as create_ssr_component, a as subscribe$2, v as validate_component, f as add_attribute, o as onDestroy, h as createEventDispatcher, e as escape } from "./index-4390b0b8.js";
import { p as page, a as session, L as Logo, s as shouldDisplayControls } from "./Logo-e158a041.js";
import { w as writable } from "./index-b462fd7a.js";
const browser = false;
const Notion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg class="${"notion"}" height="${"2500"}" width="${"2500"}" viewBox="${"12 0.18999999999999906 487.619 510.941"}"><path d="${"M96.085 91.118c15.81 12.845 21.741 11.865 51.43 9.884l279.888-16.806c5.936 0 1-5.922-.98-6.906L379.94 43.686c-8.907-6.915-20.773-14.834-43.516-12.853L65.408 50.6c-9.884.98-11.858 5.922-7.922 9.883zm16.804 65.228v294.491c0 15.827 7.909 21.748 25.71 20.769l307.597-17.799c17.81-.979 19.794-11.865 19.794-24.722V136.57c0-12.836-4.938-19.758-15.84-18.77l-321.442 18.77c-11.863.997-15.82 6.931-15.82 19.776zm303.659 15.797c1.972 8.903 0 17.798-8.92 18.799l-14.82 2.953v217.412c-12.868 6.916-24.734 10.87-34.622 10.87-15.831 0-19.796-4.945-31.654-19.76l-96.944-152.19v147.248l30.677 6.922s0 17.78-24.75 17.78l-68.23 3.958c-1.982-3.958 0-13.832 6.921-15.81l17.805-4.935V210.7l-24.721-1.981c-1.983-8.903 2.955-21.74 16.812-22.736l73.195-4.934 100.889 154.171V198.836l-25.723-2.952c-1.974-10.884 5.927-18.787 15.819-19.767zM42.653 23.919l281.9-20.76c34.618-2.969 43.525-.98 65.283 14.825l89.986 63.247c14.848 10.876 19.797 13.837 19.797 25.693v346.883c0 21.74-7.92 34.597-35.608 36.564L136.64 510.14c-20.785.991-30.677-1.971-41.562-15.815l-66.267-85.978C16.938 392.52 12 380.68 12 366.828V58.495c0-17.778 7.922-32.608 30.653-34.576z"}" fill-rule="${"evenodd"}"></path></svg>`;
});
const Reddit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg class="${"reddit"}" height="${"100%"}" style="${"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"}" version="${"1.1"}" viewBox="${"0 0 512 512"}" width="${"100%"}" xml:space="${"preserve"}"><path d="${"M256,0c141.29,0 256,114.71 256,256c0,141.29 -114.71,256 -256,256c-141.29,0 -256,-114.71 -256,-256c0,-141.29 114.71,-256 256,-256Zm170.667,256c0,-20.66 -16.768,-37.427 -37.427,-37.427c-10.18,0 -19.163,3.892 -25.75,10.48c-25.45,-18.265 -60.781,-30.241 -99.705,-31.738l17.066,-79.944l55.392,11.677c0.599,14.072 12.276,25.45 26.648,25.45c14.672,0 26.648,-11.976 26.648,-26.648c0,-14.671 -11.976,-26.648 -26.648,-26.648c-10.479,0 -19.462,5.989 -23.654,14.971l-61.979,-13.174c-1.796,-0.3 -3.593,0 -5.09,0.898c-1.497,0.898 -2.395,2.395 -2.994,4.192l-18.863,89.226c-39.822,1.197 -75.453,12.874 -101.202,31.738c-6.587,-6.288 -15.869,-10.48 -25.75,-10.48c-20.66,0 -37.427,16.767 -37.427,37.427c0,15.27 8.983,28.145 22.157,34.133c-0.599,3.593 -0.898,7.486 -0.898,11.378c0,57.488 66.769,103.897 149.408,103.897c82.638,0 149.408,-46.409 149.408,-103.897c0,-3.892 -0.299,-7.485 -0.898,-11.078c12.276,-5.989 21.558,-19.163 21.558,-34.433Zm-107.191,97.011c-18.264,18.264 -52.996,19.462 -63.177,19.462c-10.18,0 -45.211,-1.498 -63.176,-19.462c-2.695,-2.695 -2.695,-7.186 0,-9.881c2.695,-2.695 7.186,-2.695 9.881,0c11.377,11.378 35.929,15.569 53.595,15.569c17.665,0 41.918,-4.191 53.595,-15.569c2.695,-2.695 7.186,-2.695 9.881,0c2.096,2.994 2.096,7.186 -0.599,9.881Zm-148.809,-70.363c0,-14.671 11.976,-26.648 26.648,-26.648c14.671,0 26.648,11.977 26.648,26.648c0,14.671 -11.977,26.648 -26.648,26.648c-14.672,0 -26.648,-11.977 -26.648,-26.648Zm144.018,26.648c-14.671,0 -26.648,-11.977 -26.648,-26.648c0,-14.671 11.977,-26.648 26.648,-26.648c14.672,0 26.648,11.977 26.648,26.648c0,14.671 -11.976,26.648 -26.648,26.648Z"}" id="${"Artwork"}"></path></svg>`;
});
const OpenInNew = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg class="${"open-in-new"}" height="${"24px"}" viewBox="${"0 0 24 24"}" width="${"24px"}"><path d="${"M0 0h24v24H0V0z"}" fill="${"none"}"></path><path d="${"M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"}"></path></svg>`;
});
const shouldDisplayNav = writable(false);
var Navigation_svelte_svelte_type_style_lang = "";
const css$b = {
  code: "nav.svelte-lr86yz{position:fixed;top:0;left:0;height:calc(100vh - 24px);width:calc(100% / 3);background-color:var(--card-background);box-shadow:var(--page-shadow);border:1px solid #55555522;z-index:6;margin:12px 21px;padding:24px;border-radius:var(--border-radius);max-width:400px;min-width:275px;overflow-y:auto;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}header.svelte-lr86yz{position:sticky;top:0;left:0;right:0;display:flex;justify-content:center;text-align:center;align-items:center;height:auto;padding:12px 0;margin-bottom:24px;z-index:7}nav header svg{width:40px;height:auto;margin-right:16px}.secondary-navigation.svelte-lr86yz{margin-top:16px;padding:16px 0px}h4.svelte-lr86yz{letter-spacing:0.2em;text-transform:uppercase;font-size:12px;margin-bottom:16px}a.svelte-lr86yz,.log-out-button.svelte-lr86yz{letter-spacing:0.05em;font-size:14px;margin-bottom:4px;text-decoration:none;height:auto;min-height:32px;width:100%;display:flex;align-items:center;justify-content:space-between;padding:0 16px;border-radius:var(--border-radius);transition:background-color 0.1s, color 0.1s;color:var(--text-color)}a.svelte-lr86yz:hover,a.active.svelte-lr86yz,.log-out-button.svelte-lr86yz:hover{background-color:var(--interactive-color);transition:background-color 0.1s, color 0.1s;color:var(--button-text-color)}.log-out-button.svelte-lr86yz{background-color:transparent;border:0;color:var(--interactive-color);text-transform:none;font-weight:300;padding:0;cursor:pointer;transform:none;justify-content:flex-start;padding-left:16px}.log-out-button.svelte-lr86yz:hover{box-shadow:none;transform:none}.log-out-button.svelte-lr86yz:focus{box-shadow:none;transform:none}a svg{height:20px;width:20px}#main-navigation a svg.notion, a svg.reddit{fill:var(--text-color);margin-left:4px}#main-navigation a svg.open-in-new{fill:var(--interactive-color);margin-left:4px;margin-bottom:-1px;transition:color 0.1s}#main-navigation a:hover svg.open-in-new{fill:var(--text-color);transition:color 0.1s}",
  map: null
};
const Navigation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $shouldDisplayNav, $$unsubscribe_shouldDisplayNav;
  let $page, $$unsubscribe_page;
  let $session, $$unsubscribe_session;
  $$unsubscribe_shouldDisplayNav = subscribe$2(shouldDisplayNav, (value) => $shouldDisplayNav = value);
  $$unsubscribe_page = subscribe$2(page, (value) => $page = value);
  $$unsubscribe_session = subscribe$2(session, (value) => $session = value);
  $$result.css.add(css$b);
  $$unsubscribe_shouldDisplayNav();
  $$unsubscribe_page();
  $$unsubscribe_session();
  return `${$shouldDisplayNav ? `<nav id="${"main-navigation"}" class="${"svelte-lr86yz"}"><header class="${"svelte-lr86yz"}">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</header>

    <a sveltekit:prefetch href="${"/"}" class="${[
    "svelte-lr86yz",
    typeof window !== "undefined" && $page.url.pathname === "/" ? "active" : ""
  ].join(" ").trim()}">Petition</a>

    <a sveltekit:prefetch href="${"/checklist"}" class="${["svelte-lr86yz", $page.url.pathname === "/checklist" ? "active" : ""].join(" ").trim()}">Checklist</a>

    <a sveltekit:prefetch href="${"/about"}" class="${[
    "svelte-lr86yz",
    typeof window !== "undefined" && $page.url.pathname === "/about" ? "active" : ""
  ].join(" ").trim()}">About</a>

    <a target="${"_blank"}" rel="${"noopener noreferrer"}" href="${"https://late-stage.notion.site/f8709ff5bbed4fcb9bda3d802fabdac0?v=86dd875520eb4384a8a01424da6ad666"}" class="${"svelte-lr86yz"}">Roadmap <div>${validate_component(Notion, "NotionLogo").$$render($$result, {}, {}, {})} ${validate_component(OpenInNew, "OpenInNew").$$render($$result, {}, {}, {})}</div></a>

    <a sveltekit:prefetch href="${"/audit"}" class="${["svelte-lr86yz", $page.url.pathname === "/audit" ? "active" : ""].join(" ").trim()}">Audit</a>

    <a sveltekit:prefetch href="${"/resources"}" class="${["svelte-lr86yz", $page.url.pathname === "/resources" ? "active" : ""].join(" ").trim()}">Resources</a>

    ${$session.user ? `<button class="${"log-out-button svelte-lr86yz"}">Log Out</button>` : `<a sveltekit:prefetch href="${"/register"}" class="${[
    "svelte-lr86yz",
    ""
  ].join(" ").trim()}">Register / Log In</a>`}

    <section class="${"secondary-navigation svelte-lr86yz"}"><h4 class="${"svelte-lr86yz"}">Requests For Comment</h4>

      <a sveltekit:prefetch href="${"/campaign-rfcs"}" class="${["svelte-lr86yz", $page.url.pathname === "/campaign-rfcs" ? "active" : ""].join(" ").trim()}">Campaigns</a>

      <a sveltekit:prefetch href="${"/checklist-rfcs"}" class="${["svelte-lr86yz", $page.url.pathname === "/checklist-rfcs" ? "active" : ""].join(" ").trim()}">Checklist Items</a></section>

    <section class="${"secondary-navigation svelte-lr86yz"}"><h4 class="${"svelte-lr86yz"}">Community</h4>

      <a href="${"https://www.reddit.com/r/latestage/"}" class="${"svelte-lr86yz"}">r/latestage <div>${validate_component(Reddit, "RedditLogo").$$render($$result, {}, {}, {})} ${validate_component(OpenInNew, "OpenInNew").$$render($$result, {}, {}, {})}</div></a>
      <a href="${"https://www.reddit.com/r/antiwork/"}" class="${"svelte-lr86yz"}">r/antiwork <div>${validate_component(Reddit, "RedditLogo").$$render($$result, {}, {}, {})} ${validate_component(OpenInNew, "OpenInNew").$$render($$result, {}, {}, {})}</div></a>
      <a href="${"https://www.reddit.com/r/lostgeneration/"}" class="${"svelte-lr86yz"}">r/lostgeneration <div>${validate_component(Reddit, "RedditLogo").$$render($$result, {}, {}, {})} ${validate_component(OpenInNew, "OpenInNew").$$render($$result, {}, {}, {})}</div></a></section></nav>` : ``}`;
});
var FloatingActionButton_svelte_svelte_type_style_lang = "";
const css$a = {
  code: "button.svelte-dp7dk6{padding-bottom:2px;height:40px;width:40px;max-height:40px;max-width:40px;border-radius:20px;background-color:var(--card-background);border:1px solid #ff5964;cursor:pointer;margin-bottom:8px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);display:flex;justify-content:center;align-items:center;transition:transform 0.25s, outline 0.25s;transform:perspective(1000px) translateZ(0px);outline:1px solid transparent}button.svelte-dp7dk6:hover{transition:transform 0.5s;transform:perspective(1000px) translateZ(40px)}button.fab svg{transition:transform 0.25s;height:16px;width:16px}button.fab:hover > svg{transform:perspective(1000px) translateZ(40px);transition:transform 0.5s}.fab.disabled{filter:grayscale(0.5);transition:filter 0.2s;opacity:0.5;cursor:not-allowed}",
  map: null
};
const FloatingActionButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type = "button" } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  $$result.css.add(css$a);
  return `<button class="${"fab svelte-dp7dk6"}"${add_attribute("type", type, 0)}>${slots.default ? slots.default({}) : ``}
</button>`;
});
var Menu_svelte_svelte_type_style_lang = "";
const css$9 = {
  code: "svg.svelte-1u8btw4{fill:var(--text-color);width:18px}",
  map: null
};
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$9);
  return `<svg height="${"24px"}" viewBox="${"0 0 24 24"}" width="${"24px"}" fill="${"#000000"}" class="${"svelte-1u8btw4"}"><path d="${"M0 0h24v24H0V0z"}" fill="${"none"}"></path><path d="${"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}"></path></svg>`;
});
var NavigationButton_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: "div.svelte-23s94d{position:fixed;top:4px;left:4px}.navigation-button svg{fill:var(--interactive-color)}",
  map: null
};
const NavigationButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$8);
  return `<div class="${"navigation-button svelte-23s94d"}">${validate_component(FloatingActionButton, "FloatingActionButton").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}`;
    }
  })}
</div>`;
});
var SessionStorageKeys;
(function(SessionStorageKeys2) {
  SessionStorageKeys2["PrefersColorScheme"] = "prefersColorScheme";
})(SessionStorageKeys || (SessionStorageKeys = {}));
const isBrowser = typeof window !== "undefined";
const computeInitialColorScheme = () => {
  if (!isBrowser)
    return "dark";
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
const { set: set$1, subscribe: subscribe$1 } = writable(theme);
const prefersColorScheme = {
  subscribe: subscribe$1,
  setToLight: () => {
    sessionStorage.setItem(SessionStorageKeys.PrefersColorScheme, "light");
    updateRootStyles("light");
    set$1("light");
  },
  setToDark: () => {
    sessionStorage.setItem(SessionStorageKeys.PrefersColorScheme, "dark");
    updateRootStyles("dark");
    set$1("dark");
  }
};
var Sun_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: "svg.svelte-57liif{fill:var(--text-color);width:20px;height:20px}",
  map: null
};
const Sun = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$7);
  return `<svg width="${"100%"}" height="${"100%"}" viewBox="${"0 0 270 270"}" xml:space="${"preserve"}" style="${"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"}" class="${"svelte-57liif"}"><g transform="${"matrix(1,0,0,1,-85.3326,-107.566)"}"><g transform="${"matrix(1,0,0,1,97.625,4.68059)"}"><path d="${"M122.353,164.069C162.894,164.069 195.808,196.983 195.808,237.524C195.808,278.066 162.894,310.98 122.353,310.98C81.811,310.98 48.897,278.066 48.897,237.524C48.897,196.983 81.811,164.069 122.353,164.069ZM122.353,182.52C152.71,182.52 177.357,207.167 177.357,237.524C177.357,267.882 152.71,292.528 122.353,292.528C91.995,292.528 67.348,267.882 67.348,237.524C67.348,207.167 91.995,182.52 122.353,182.52Z"}"></path></g><g transform="${"matrix(8.60054e-17,-1.40458,1.49296,9.14173e-17,-220.655,547.42)"}"><path d="${"M223.869,211.134C223.869,207.723 220.926,204.954 217.3,204.954C213.675,204.954 210.732,207.723 210.732,211.134L210.732,223.707C210.732,227.117 213.675,229.886 217.3,229.886C220.926,229.886 223.869,227.117 223.869,223.707L223.869,211.134Z"}"></path></g><g transform="${"matrix(-1.40458,-1.72011e-16,1.82835e-16,-1.49296,525.186,682.832)"}"><path d="${"M223.869,211.134C223.869,207.723 220.926,204.954 217.3,204.954C213.675,204.954 210.732,207.723 210.732,211.134L210.732,223.707C210.732,227.117 213.675,229.886 217.3,229.886C220.926,229.886 223.869,227.117 223.869,223.707L223.869,211.134Z"}"></path></g><g transform="${"matrix(-0.992564,-0.993805,1.05634,-1.05502,123.891,767.605)"}"><path d="${"M223.869,211.134C223.869,207.723 220.926,204.954 217.3,204.954C213.675,204.954 210.732,207.723 210.732,211.134L210.732,223.707C210.732,227.117 213.675,229.886 217.3,229.886C220.926,229.886 223.869,227.117 223.869,223.707L223.869,211.134Z"}"></path></g><g transform="${"matrix(8.60054e-17,-1.40458,1.49296,9.14173e-17,11.3994,547.42)"}"><path d="${"M223.869,211.134C223.869,207.723 220.926,204.954 217.3,204.954C213.675,204.954 210.732,207.723 210.732,211.134L210.732,223.707C210.732,227.117 213.675,229.886 217.3,229.886C220.926,229.886 223.869,227.117 223.869,223.707L223.869,211.134Z"}"></path></g><g transform="${"matrix(-1.40458,-1.72011e-16,1.82835e-16,-1.49296,525.186,450.777)"}"><path d="${"M223.869,211.134C223.869,207.723 220.926,204.954 217.3,204.954C213.675,204.954 210.732,207.723 210.732,211.134L210.732,223.707C210.732,227.117 213.675,229.886 217.3,229.886C220.926,229.886 223.869,227.117 223.869,223.707L223.869,211.134Z"}"></path></g><g transform="${"matrix(-0.992564,-0.993805,1.05634,-1.05502,288.081,603.62)"}"><path d="${"M223.869,211.134C223.869,207.723 220.926,204.954 217.3,204.954C213.675,204.954 210.732,207.723 210.732,211.134L210.732,223.707C210.732,227.117 213.675,229.886 217.3,229.886C220.926,229.886 223.869,227.117 223.869,223.707L223.869,211.134Z"}"></path></g><g transform="${"matrix(-0.993805,0.992564,-1.05502,-1.05634,747.301,336.355)"}"><path d="${"M223.869,211.134C223.869,207.723 220.926,204.954 217.3,204.954C213.675,204.954 210.732,207.723 210.732,211.134L210.732,223.707C210.732,227.117 213.675,229.886 217.3,229.886C220.926,229.886 223.869,227.117 223.869,223.707L223.869,211.134Z"}"></path></g><g transform="${"matrix(-0.993805,0.992564,-1.05502,-1.05634,583.316,172.165)"}"><path d="${"M223.869,211.134C223.869,207.723 220.926,204.954 217.3,204.954C213.675,204.954 210.732,207.723 210.732,211.134L210.732,223.707C210.732,227.117 213.675,229.886 217.3,229.886C220.926,229.886 223.869,227.117 223.869,223.707L223.869,211.134Z"}"></path></g></g></svg>`;
});
var Moon_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: "svg.svelte-i49336{fill:var(--text-color);stroke:var(--text-color)}svg.moon-icon.svelte-i49336{width:13px;height:13px}",
  map: null
};
const Moon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$6);
  return `<svg width="${"100%"}" height="${"100%"}" viewBox="${"0 0 161 173"}" xml:space="${"preserve"}" style="${"fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"}" class="${"moon-icon svelte-i49336"}"><g transform="${"matrix(1,0,0,1,-410.746,-154.68)"}"><g transform="${"matrix(0.801656,0,0,0.801656,80.4932,36.5734)"}"><path d="${"M606.052,321.355L606.052,321.476L606.002,321.412L606.052,321.355C585.54,344.774 555.886,358.232 524.674,358.232C464.877,358.232 416.329,309.685 416.329,249.888C416.329,208.708 439.663,171.176 476.416,152.957L478.886,151.695L483.783,162.197L483.711,162.233C469.361,179.316 461.086,201.197 461.086,224.371C461.086,277.772 504.441,321.128 557.843,321.128C586.443,321.128 598.794,312.082 598.794,312.082C586.816,322.02 593.428,319.541 600.932,320.203L592.226,319.159L592.346,319.042L592.405,318.983C592.482,318.909 592.558,318.834 592.634,318.759L592.723,318.671C592.829,318.566 592.934,318.461 593.04,318.356L593.119,318.277L593.188,318.208L593.306,318.09L593.394,318C593.522,317.872 593.649,317.742 593.776,317.613L593.864,317.523L593.981,317.403L594.011,317.373C594.062,317.32 594.114,317.266 594.166,317.213L594.215,317.163L594.331,317.042C594.37,317.002 594.409,316.962 594.448,316.921L594.506,316.861C594.57,316.794 594.634,316.726 594.699,316.659L594.757,316.598L594.814,316.537L594.891,316.456L594.949,316.395L595.036,316.304C595.074,316.263 595.112,316.222 595.151,316.182L595.266,316.059L595.304,316.019L595.419,315.896L595.514,315.793L595.609,315.691L595.704,315.588L595.799,315.485L595.875,315.403C595.929,315.345 595.983,315.286 596.036,315.228L596.084,315.176L596.206,315.041L596.291,314.948L596.376,314.855L596.46,314.761C596.514,314.702 596.567,314.643 596.62,314.584L596.639,314.563L596.723,314.469L596.798,314.386L596.863,314.313C596.901,314.271 596.938,314.229 596.975,314.187L596.994,314.166L597.087,314.061L597.152,313.988C597.205,313.928 597.257,313.868 597.31,313.809L597.347,313.766L597.421,313.682C597.588,313.492 597.754,313.301 597.919,313.11L597.946,313.078C597.983,313.035 598.02,312.993 598.056,312.95L598.066,312.94C598.114,312.883 598.163,312.826 598.212,312.769L598.23,312.747C598.306,312.658 598.382,312.569 598.458,312.48L598.558,312.362L598.613,312.297L598.676,312.222L598.758,312.125C598.767,312.114 598.776,312.103 598.785,312.093C598.788,312.089 598.79,312.079 598.794,312.082C601.756,314.561 604.712,317.048 607.671,319.53L606.052,321.355ZM459.996,177.952C460.144,177.638 460.294,177.325 460.445,177.012C460.748,176.387 461.056,175.765 461.371,175.146C462.241,173.435 463.157,171.747 464.117,170.084C465.079,168.418 466.086,166.778 467.137,165.167C467.518,164.582 467.905,164.001 468.298,163.424C468.496,163.133 468.695,162.843 468.896,162.555L476.416,152.957C469.794,160.487 464.255,168.901 459.99,177.965C439.889,196.01 427.917,222.013 427.917,249.888C427.917,303.289 471.272,346.645 524.674,346.645C543.668,346.645 562.015,341.064 577.565,330.87L577.669,330.802L598.794,312.082C592.619,319.441 585.456,325.756 577.565,330.87C571.113,332.101 564.514,332.715 557.843,332.715C498.046,332.715 449.498,284.168 449.498,224.371C449.498,207.992 453.19,192.19 459.99,177.965L459.996,177.952ZM577.703,330.78C577.699,330.782 577.695,330.785 577.692,330.787C577.695,330.785 577.699,330.782 577.703,330.78ZM577.819,330.705C577.788,330.725 577.757,330.745 577.726,330.765C577.757,330.745 577.788,330.725 577.819,330.705ZM584.404,325.993C584.284,326.087 584.164,326.181 584.044,326.274C583.807,326.457 583.57,326.639 583.331,326.82C582.62,327.36 581.902,327.89 581.176,328.41C580.45,328.929 579.718,329.437 578.978,329.936C578.731,330.102 578.482,330.268 578.233,330.432C578.107,330.516 577.98,330.599 577.853,330.682C577.98,330.599 578.107,330.516 578.233,330.432C578.482,330.268 578.731,330.102 578.978,329.936C579.718,329.437 580.45,328.929 581.176,328.41C581.902,327.89 582.62,327.36 583.331,326.82C583.57,326.639 583.807,326.457 584.044,326.274C584.164,326.181 584.284,326.087 584.404,325.993ZM584.665,325.789C584.586,325.851 584.506,325.914 584.426,325.976C584.506,325.914 584.586,325.851 584.665,325.789ZM585.477,325.142C585.348,325.246 585.218,325.35 585.088,325.454C584.955,325.56 584.821,325.666 584.687,325.771C584.821,325.666 584.955,325.56 585.088,325.454C585.218,325.35 585.348,325.246 585.477,325.142ZM585.692,324.968C585.628,325.021 585.563,325.073 585.498,325.125C585.563,325.073 585.628,325.021 585.692,324.968ZM585.821,324.864C585.785,324.893 585.749,324.922 585.714,324.951C585.749,324.922 585.785,324.893 585.821,324.864ZM586.078,324.654C586.003,324.715 585.928,324.776 585.853,324.837C585.928,324.776 586.003,324.715 586.078,324.654ZM586.953,323.929C586.815,324.045 586.677,324.16 586.538,324.275C586.399,324.39 586.26,324.504 586.121,324.618C586.26,324.504 586.399,324.39 586.538,324.275C586.677,324.16 586.815,324.045 586.953,323.929ZM587.027,323.866C587.013,323.878 586.999,323.89 586.985,323.902C586.999,323.89 587.013,323.878 587.027,323.866ZM587.577,323.401C587.412,323.542 587.246,323.682 587.08,323.822C587.246,323.682 587.412,323.542 587.577,323.401ZM605.973,321.394C605.693,321.534 605.412,321.673 605.13,321.81C604.571,322.083 604.01,322.351 603.447,322.614C602.884,322.876 602.318,323.134 601.751,323.387C601.469,323.513 601.187,323.637 600.904,323.76L600.904,323.76C601.192,323.635 601.478,323.509 601.764,323.382C602.332,323.129 602.898,322.871 603.461,322.608C604.024,322.345 604.585,322.077 605.143,321.804C605.421,321.669 605.697,321.532 605.973,321.394L605.984,321.389L605.984,321.389L605.973,321.394ZM588.573,322.538C588.41,322.682 588.246,322.824 588.081,322.967C587.917,323.109 587.753,323.25 587.587,323.392C587.753,323.25 587.917,323.109 588.081,322.967C588.246,322.824 588.41,322.682 588.573,322.538ZM591.444,319.912C591.293,320.056 591.141,320.2 590.989,320.343C590.685,320.628 590.379,320.912 590.072,321.194C589.761,321.479 589.449,321.761 589.134,322.042C588.979,322.18 588.823,322.318 588.667,322.456C588.823,322.318 588.979,322.18 589.134,322.042C589.449,321.761 589.761,321.479 590.072,321.194C590.379,320.912 590.685,320.628 590.989,320.343C591.141,320.2 591.293,320.056 591.444,319.912ZM591.534,319.826C591.511,319.848 591.487,319.871 591.464,319.893C591.487,319.871 591.511,319.848 591.534,319.826ZM591.56,319.802L591.554,319.808L591.56,319.802ZM591.665,319.701C591.662,319.704 591.658,319.707 591.655,319.71C591.658,319.707 591.662,319.704 591.665,319.701ZM591.695,319.672C591.692,319.675 591.689,319.678 591.685,319.681C591.689,319.678 591.692,319.675 591.695,319.672ZM591.836,319.537C591.829,319.543 591.822,319.55 591.816,319.556C591.822,319.55 591.829,319.543 591.836,319.537ZM591.876,319.498C591.869,319.504 591.863,319.511 591.856,319.517C591.863,319.511 591.869,319.504 591.876,319.498ZM592.006,319.372C591.966,319.411 591.926,319.45 591.886,319.488C591.926,319.45 591.966,319.411 592.006,319.372ZM592.216,319.168C592.166,319.217 592.116,319.266 592.066,319.314C592.116,319.266 592.166,319.217 592.216,319.168Z"}" style="${"stroke-width:8.73px;"}"></path></g></g></svg>`;
});
var DarkModeButton_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: "div.svelte-1y5fck3{position:fixed;top:48px;left:4px}.dark-mode-button svg{stroke:var(--interactive-color);fill:var(--interactive-color);width:14px;height:14px}",
  map: null
};
const DarkModeButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $prefersColorScheme, $$unsubscribe_prefersColorScheme;
  $$unsubscribe_prefersColorScheme = subscribe$2(prefersColorScheme, (value) => $prefersColorScheme = value);
  $$result.css.add(css$5);
  $$unsubscribe_prefersColorScheme();
  return `<div class="${"dark-mode-button svelte-1y5fck3"}">${validate_component(FloatingActionButton, "FloatingActionButton").$$render($$result, {}, {}, {
    default: () => {
      return `${$prefersColorScheme === "dark" ? `${validate_component(Sun, "Sun").$$render($$result, {}, {}, {})}` : `${validate_component(Moon, "Moon").$$render($$result, {}, {}, {})}`}`;
    }
  })}
</div>`;
});
var UserNavigation_svelte_svelte_type_style_lang = "";
var Account_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: "svg.svelte-ul074j{fill:var(--interactive-color)}",
  map: null
};
const Account = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$4);
  return `<svg height="${"24px"}" viewBox="${"0 0 24 24"}" width="${"24px"}" class="${"svelte-ul074j"}"><path d="${"M0 0h24v24H0z"}" fill="${"none"}"></path><path d="${"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"}"></path></svg>`;
});
var LocalStorageKeys;
(function(LocalStorageKeys2) {
  LocalStorageKeys2["CurrentUser"] = "currentUser";
  LocalStorageKeys2["HasAcknowledgedAlphaSoftware"] = "hasAcknowledgedAlphaSoftware";
  LocalStorageKeys2["HasCompletedBankChecklistItem"] = "hasCompletedBankChecklistItem";
})(LocalStorageKeys || (LocalStorageKeys = {}));
const { subscribe, set } = writable(null);
const currentUser = {
  subscribe,
  set,
  setUser: (user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LocalStorageKeys.CurrentUser, JSON.stringify(user));
      window.dispatchEvent(new StorageEvent("storage"));
    }
    return set(user);
  }
};
var UserButton_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "div.svelte-39ryh5{position:fixed;top:92px;left:4px}",
  map: null
};
const UserButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $currentUser, $$unsubscribe_currentUser;
  $$unsubscribe_currentUser = subscribe$2(currentUser, (value) => $currentUser = value);
  $$result.css.add(css$3);
  $$unsubscribe_currentUser();
  return `<div class="${"svelte-39ryh5"}">${validate_component(FloatingActionButton, "FloatingActionButton").$$render($$result, {}, {}, {
    default: () => {
      return `${!!$currentUser ? `
      Avatar goes here` : `${validate_component(Account, "AccountIcon").$$render($$result, {}, {}, {})}`}`;
    }
  })}

  ${``}
</div>`;
});
var Modal_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".modal-container.svelte-174trle{position:fixed;top:0;left:0}.scrim.svelte-174trle{position:absolute;height:100vh;width:100vw;background-color:rgba(0, 0, 0, 0.5);display:flex;justify-content:center;align-items:center;backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);transition:backdrop-filter 0.2s}.modal.svelte-174trle{background-color:var(--app-background);width:calc(100% - 32px);max-width:var(--modal-max-width);margin:0 auto;padding:16px 0 0;border:1px solid #55555555;border-radius:var(--border-radius);box-shadow:var(--page-shadow);position:relative;transform:perspective(1000px)}.close-button.svelte-174trle{font-family:var(--font-sans);font-weight:900;color:var(--error-color);background-color:transparent;border:0;position:absolute;top:8px;right:8px;width:auto;margin:0}.close-button.svelte-174trle:hover{box-shadow:none}.content.svelte-174trle{min-height:40px;height:auto;padding:16px 40px}.actions.svelte-174trle{border-top:1px solid #55555555;padding:16px 16px;background-color:var(--app-background)}.modal .actions :not(button):first-child{display:flex;justify-content:space-between;width:100%;gap:8px}@media screen and (max-width: 500px){.modal.svelte-174trle{height:100vh;width:100vw;border-radius:0;overflow:hidden;padding-top:0}.content.svelte-174trle{padding-top:40px;overflow:auto;height:calc(100vh - 73px)}.actions.svelte-174trle{position:fixed;bottom:0;width:100%}}",
  map: null
};
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { shouldDisplayCloseButton = true } = $$props;
  let { isDisplayed = false } = $$props;
  let { maxWidth = 500 } = $$props;
  let { isBlurDismissable = false } = $$props;
  let { isAnimated = true } = $$props;
  let { zIndex = 99 } = $$props;
  let modalContainer;
  const domCorrections = [];
  onDestroy(() => {
    setTimeout(() => restoreDOM(), 500);
  });
  const rectifyBrokenPositioning = () => {
    if (typeof window === "undefined" || !modalContainer)
      return;
    const renderedIncorrectly = () => modalContainer.getBoundingClientRect().top !== 0 || modalContainer.getBoundingClientRect().left !== 0;
    if (!renderedIncorrectly())
      return;
    const breakingProperties = [
      {
        prop: "transformStyle",
        nonBreakingValue: "flat"
      },
      {
        prop: "willChange",
        nonBreakingValue: "auto"
      },
      { prop: "filter", nonBreakingValue: "none" },
      {
        prop: "transform",
        nonBreakingValue: "none"
      },
      {
        prop: "backdropFilter",
        nonBreakingValue: "none"
      },
      {
        prop: "webkitBackdropFilter",
        nonBreakingValue: "none"
      },
      {
        prop: "perspective",
        nonBreakingValue: "none"
      },
      {
        prop: "contain",
        nonBreakingValue: "none"
      }
    ];
    const traverseDOMForBreakingPropertyAssignments = (node) => {
      for (let i = 0; i < breakingProperties.length; i++) {
        const styleValue = getComputedStyle(node)[breakingProperties[i].prop];
        if (styleValue !== breakingProperties[i].nonBreakingValue) {
          domCorrections.push({
            node,
            prop: breakingProperties[i].prop,
            originalValue: styleValue
          });
          node.style[breakingProperties[i].prop] = breakingProperties[i].nonBreakingValue;
          if (!renderedIncorrectly()) {
            break;
          }
        }
      }
      if (renderedIncorrectly() && node.parentElement) {
        return traverseDOMForBreakingPropertyAssignments(node.parentElement);
      }
      return;
    };
    traverseDOMForBreakingPropertyAssignments(modalContainer.parentElement);
  };
  const restoreDOM = () => {
    domCorrections.forEach((correction) => {
      correction.node.style[correction.prop] = correction.originalValue;
    });
  };
  const enableScrollLock = () => {
    const scrollingNode = document?.scrollingElement;
    scrollingNode.style.overflow = "hidden";
    document.querySelector("html").style.overflow = "hidden";
  };
  const disableScrollLock = () => {
    const scrollingNode = document?.scrollingElement;
    scrollingNode.style.overflow = "auto";
    document.querySelector("html").style.overflow = "auto";
  };
  createEventDispatcher();
  if ($$props.shouldDisplayCloseButton === void 0 && $$bindings.shouldDisplayCloseButton && shouldDisplayCloseButton !== void 0)
    $$bindings.shouldDisplayCloseButton(shouldDisplayCloseButton);
  if ($$props.isDisplayed === void 0 && $$bindings.isDisplayed && isDisplayed !== void 0)
    $$bindings.isDisplayed(isDisplayed);
  if ($$props.maxWidth === void 0 && $$bindings.maxWidth && maxWidth !== void 0)
    $$bindings.maxWidth(maxWidth);
  if ($$props.isBlurDismissable === void 0 && $$bindings.isBlurDismissable && isBlurDismissable !== void 0)
    $$bindings.isBlurDismissable(isBlurDismissable);
  if ($$props.isAnimated === void 0 && $$bindings.isAnimated && isAnimated !== void 0)
    $$bindings.isAnimated(isAnimated);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0)
    $$bindings.zIndex(zIndex);
  $$result.css.add(css$2);
  {
    if (isDisplayed && browser) {
      enableScrollLock();
      rectifyBrokenPositioning();
    } else if (!isDisplayed && browser) {
      disableScrollLock();
      setTimeout(() => restoreDOM(), 400);
    }
  }
  return `<div style="${"z-index: " + escape(zIndex) + ";"}" class="${"modal-container svelte-174trle"}"${add_attribute("this", modalContainer, 0)}>${isDisplayed ? `<div class="${"scrim svelte-174trle"}" style="${"z-index: " + escape(zIndex) + ";"}"><div class="${"modal svelte-174trle"}" style="${"--modal-max-width: " + escape(maxWidth) + "px;"}">${shouldDisplayCloseButton ? `<button class="${"close-button svelte-174trle"}">\u2573</button>` : ``}

        <div class="${"content svelte-174trle"}">${slots.content ? slots.content({}) : ``}</div>

        <div class="${"actions svelte-174trle"}">${slots.actions ? slots.actions({}) : ``}</div></div></div>` : ``}
</div>`;
});
var PublicAlphaModal_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "@keyframes svelte-t9p9o9-dismiss-alpha-modal-scrim{0%{opacity:1}100%{opacity:0}}@keyframes svelte-t9p9o9-dismiss-alpha-modal{0%{transform:translate(0) scale(1);opacity:1}90%{opacity:1}100%{transform:translate(60vw, 60vh) scale(0);opacity:0}}@keyframes svelte-t9p9o9-display-alpha-modal-scrim{0%{opacity:0}100%{opacity:1}}@keyframes svelte-t9p9o9-display-alpha-modal{0%{transform:translate(60vw, 60vh) scale(0);opacity:0}100%{transform:translate(0) scale(1);opacity:1}}h5.svelte-t9p9o9{margin-top:40px}.alpha-info-fab.svelte-t9p9o9{position:fixed;bottom:0px;right:4px}.alpha-info-fab button{color:var(--interactive-color);font-size:1.25rem;line-height:1em}.public-alpha-modal .scrim{animation:svelte-t9p9o9-display-alpha-modal-scrim 0.4s ease-out forwards}.public-alpha-modal .modal{animation:svelte-t9p9o9-display-alpha-modal 0.4s ease-out forwards}.public-alpha-modal .scrim.dismissed{animation:svelte-t9p9o9-dismiss-alpha-modal-scrim 0.4s ease-out forwards}.public-alpha-modal .modal.dismissed{animation:svelte-t9p9o9-dismiss-alpha-modal 0.4s ease-out forwards}",
  map: null
};
const PublicAlphaModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isDisplayed = (() => {
    if (typeof window !== "undefined") {
      const hasAcknowledgedAlphaSoftware = localStorage.getItem(LocalStorageKeys.HasAcknowledgedAlphaSoftware);
      return hasAcknowledgedAlphaSoftware !== "true";
    }
  })();
  $$result.css.add(css$1);
  return `<div class="${"public-alpha-modal"}">${validate_component(Modal, "Modal").$$render($$result, {
    isDisplayed,
    isAnimated: false,
    isBlurDismissable: false,
    shouldDisplayCloseButton: false,
    maxWidth: 750,
    zIndex: 6
  }, {}, {
    actions: () => {
      return `<div slot="${"actions"}"><button class="${"primary"}">Got it!</button></div>`;
    },
    content: () => {
      return `<div slot="${"content"}"><h2>Late-Stage is in public alpha</h2>

      <h5 class="${"svelte-t9p9o9"}">Please note that the site is not operational yet!</h5>

      <p>The content you see here is likely how it will <em>look</em> when we begin running campaigns,
        but the community is still finalizing our first campaigns and checklist objectives.
      </p>
      <p>The static content you see is likely to be in the spirit of what Late-Stage will set out to
        do, but is pending the guidance of our community of experts and advocates, and only serves
        to communicate how the site will operate.
      </p>

      <h5 class="${"svelte-t9p9o9"}">Okay, so what <em>can</em> I do on the website?</h5>
      <p>For more information, see our <a href="${"/about"}" rel="${"noopener noreferrer"}" target="${"_blank"}">about</a> page.
      </p>
      <p>If you&#39;d like to see where the project is headed, check out our <a href="${"https://late-stage.notion.site/f8709ff5bbed4fcb9bda3d802fabdac0?v=86dd875520eb4384a8a01424da6ad666"}" rel="${"noopener noreferrer"}" target="${"_blank"}">roadmap</a>.
      </p>
      <p>If you&#39;d like a say in how the project is going, join our Reddit community at <a href="${"https://www.reddit.com/r/latestage/"}" rel="${"noopener noreferrer"}" target="${"_blank"}">r/latestage</a>, and submit an RFC to propose a
        <a href="${"/campaign-rfcs"}" rel="${"noopener noreferrer"}" target="${"_blank"}">campaign</a>
        or
        <a href="${"/checklist-rfcs"}" rel="${"noopener noreferrer"}" target="${"_blank"}">Late-Stage Checklist</a>
        idea.
      </p></div>`;
    }
  })}</div>

<div class="${"alpha-info-fab svelte-t9p9o9"}">${validate_component(FloatingActionButton, "FloatingActionButton").$$render($$result, {}, {}, {
    default: () => {
      return `\u237A`;
    }
  })}
</div>`;
});
var Controls_svelte_svelte_type_style_lang = "";
const css = {
  code: "div.svelte-dv0uew{z-index:6;position:relative}",
  map: null
};
const Controls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $shouldDisplayControls, $$unsubscribe_shouldDisplayControls;
  $$unsubscribe_shouldDisplayControls = subscribe$2(shouldDisplayControls, (value) => $shouldDisplayControls = value);
  $$result.css.add(css);
  $$unsubscribe_shouldDisplayControls();
  return `${$shouldDisplayControls ? `<div id="${"controls"}" class="${"svelte-dv0uew"}">${validate_component(Navigation, "Navigation").$$render($$result, {}, {}, {})}
    ${validate_component(NavigationButton, "NavigationButton").$$render($$result, {}, {}, {})}
    ${validate_component(DarkModeButton, "DarkModeButton").$$render($$result, {}, {}, {})}
    ${validate_component(UserButton, "UserButton").$$render($$result, {}, {}, {})}
    ${validate_component(PublicAlphaModal, "PublicAlphaModal").$$render($$result, {}, {}, {})}</div>` : ``}`;
});
export { Controls as C, LocalStorageKeys as L, Modal as M, OpenInNew as O, Reddit as R };
