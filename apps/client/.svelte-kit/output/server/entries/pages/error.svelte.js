import { c as create_ssr_component, v as validate_component } from "../../chunks/index-f463a23b.js";
import { D as DangerTriangle } from "../../chunks/DangerTriangle-b34c9451.js";
import { C as Card } from "../../chunks/Card-ea278822.js";
var error_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-19wjil5{display:flex;justify-content:center;align-items:center;width:calc(100% - 24px);max-width:750px;margin:0 auto;height:calc(100vh - 160px)}.error-page h2 svg{fill:var(--error-color);width:24px;height:24px;margin-bottom:-2px;margin-right:4px}.error-page .card{width:100%;background-color:var(--interactive-card-color)}",
  map: null
};
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main class="${"error-page svelte-19wjil5"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<h2>${validate_component(DangerTriangle, "DangerTriangle").$$render($$result, {}, {}, {})} Something went wrong</h2>

    <p>Sorry about that!</p>
    <p>It&#39;s likely that we are already addressing this issue, but we might not know about it yet.
    </p>

    <p>The roadmap is governed by the <a href="${"https://www.reddit.com/r/latestage/"}">r/latestage</a> subreddit.
    </p>

    <p>If it seems your issue is new or unique, we encourage you to submit your issue to the
      subreddit via <a href="${"/audit#audit-report-template"}">this template</a> and we&#39;ll jump right on
      it.
    </p>`;
    }
  })}
</main>`;
});
export { Error as default };
