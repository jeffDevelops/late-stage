import { c as create_ssr_component, v as validate_component } from "../../chunks/index-4390b0b8.js";
import { C as Controls, L as LocalStorageKeys } from "../../chunks/Controls-6346f8a0.js";
import { C as Card } from "../../chunks/Card-0ad50115.js";
import { a as Checkbox } from "../../chunks/MustLogInModal.svelte_svelte_type_style_lang-11f51de1.js";
import { I as Idea } from "../../chunks/Idea-7a86352d.js";
import { I as Info } from "../../chunks/Info-cceca9a5.js";
import "../../chunks/Logo-e158a041.js";
import "../../chunks/index-b462fd7a.js";
var ChecklistItem_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".checklist-item .card{padding-bottom:16px;background-color:var(--interactive-card-color) !important}.hover-effect.svelte-4phlp9.svelte-4phlp9{position:absolute;top:0;left:0;width:100%;height:100%;background-color:var(--interactive-color);z-index:3;border-radius:var(--border-radius);opacity:0.95;backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);cursor:pointer;border:none}.hover-effect.svelte-4phlp9 h1.svelte-4phlp9{margin-bottom:0;font-size:1.8rem;color:var(--button-text-color)}.checklist-item label{color:var(--interactive-color);margin-top:0;margin-bottom:0;text-decoration:underline}.checklist-item .card{border:1px solid var(--interactive-color);position:relative}@media screen and (max-width: 600px){.hover-effect.svelte-4phlp9 h1.svelte-4phlp9{font-size:1.2rem}}",
  map: null
};
const ChecklistItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { checked = true } = $$props;
  let { participationLink } = $$props;
  let { shouldDisplayHoverEffect = false } = $$props;
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.participationLink === void 0 && $$bindings.participationLink && participationLink !== void 0)
    $$bindings.participationLink(participationLink);
  if ($$props.shouldDisplayHoverEffect === void 0 && $$bindings.shouldDisplayHoverEffect && shouldDisplayHoverEffect !== void 0)
    $$bindings.shouldDisplayHoverEffect(shouldDisplayHoverEffect);
  $$result.css.add(css$1);
  return `<div class="${"checklist-item"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `${shouldDisplayHoverEffect ? `<button class="${"hover-effect svelte-4phlp9"}"><h1 class="${"svelte-4phlp9"}">Participate</h1></button>` : ``}

    ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked }, {}, {
        default: () => {
          return `Remove your personal funds from the large, for-profit banks`;
        }
      })}`;
    }
  })}
</div>`;
});
var checklist_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-5pjiu1.svelte-5pjiu1{padding-top:72px;max-width:750px;width:100%;margin:0 auto}.disclosure.svelte-5pjiu1.svelte-5pjiu1{margin-top:16px}.checklist .checklist-item:last-of-type .card{margin-bottom:64px !important}.disclosure.svelte-5pjiu1 .svelte-5pjiu1:not(a){font-size:90%;color:var(--text-color-subdued)}.disclosure.svelte-5pjiu1 p.svelte-5pjiu1{font-weight:300}.checklist .disclosure:last-of-type .card{padding-bottom:24px}.checklist .disclosure h4 svg{fill:var(--interactive-color);margin-bottom:-6px;margin-right:4px}@media screen and (max-width: 600px){h1.svelte-5pjiu1.svelte-5pjiu1{font-size:2rem}.disclosure.svelte-5pjiu1 h4.svelte-5pjiu1{line-height:1.6em}.checklist .disclosure h4 svg{width:18px;height:18px;margin-bottom:-4px;margin-right:2px}}",
  map: null
};
const Checklist = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(Controls, "Controls").$$render($$result, {}, {}, {})}

<main class="${"checklist svelte-5pjiu1"}"><section><h1 class="${"svelte-5pjiu1"}">Checklist</h1>
    <p>These are things you can do today to limit your participation in extractionist capitalism.
    </p>

    ${validate_component(ChecklistItem, "ChecklistItem").$$render($$result, {
    participationLink: `/campaigns/1`,
    checked: typeof window !== "undefined" && localStorage.getItem(LocalStorageKeys.HasCompletedBankChecklistItem) === "true"
  }, {}, {})}</section>

  <div class="${"disclosure svelte-5pjiu1"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<h4 class="${"svelte-5pjiu1"}">${validate_component(Info, "InfoIcon").$$render($$result, {}, {}, {})} That&#39;s it? It&#39;s not much of a checklist...</h4>
      <p class="${"svelte-5pjiu1"}">Development of the platform is a volunteer effort (what corporation is going to pay for
        something like this?), and development of new features takes time.
      </p>`;
    }
  })}</div>

  <div class="${"disclosure svelte-5pjiu1"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<h4 class="${"svelte-5pjiu1"}">${validate_component(Idea, "IdeaIcon").$$render($$result, {}, {}, {})} Have an idea for the checklist?</h4>
      <p class="${"svelte-5pjiu1"}">We&#39;re looking to field ideas from passionate advocates and subject-matter experts like you.
        The roadmap for the platform consists of input from the r/latestage community on Reddit; the
        following template helps us nail down specifics for your idea and allows for easy posting on
        Reddit for the community to see:
      </p>

      <a href="${"/checklist-rfcs#checklist-idea-template"}" class="${"svelte-5pjiu1"}">Checklist Idea Template</a>`;
    }
  })}</div>
</main>`;
});
export { Checklist as default };
