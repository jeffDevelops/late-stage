import { c as create_ssr_component, v as validate_component, e as escape } from "../../chunks/index-4390b0b8.js";
import { C as Campaign } from "../../chunks/Campaign-6ea967a6.js";
import { C as CurrentCampaign } from "../../chunks/CurrentCampaign-9af84571.js";
import { C as Card } from "../../chunks/Card-0ad50115.js";
import { I as Info } from "../../chunks/Info-cceca9a5.js";
import { C as Controls } from "../../chunks/Controls-6346f8a0.js";
import "dayjs";
import "../../chunks/Logo-e158a041.js";
import "../../chunks/index-b462fd7a.js";
var CurrentCampaigns_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".current-campaigns svg{fill:var(--interactive-color);width:40px;height:40px}.current-campaigns.svelte-jjk071.svelte-jjk071:first-child{border:1px solid var(--interactive-color);border-radius:var(--border-radius);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}.flex.svelte-jjk071.svelte-jjk071{display:flex;gap:16px;justify-content:flex-start;align-items:center}.flex.svelte-jjk071 h2.svelte-jjk071{margin:6px 0 0 0}",
  map: null
};
const CurrentCampaigns = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { campaign } = $$props;
  if ($$props.campaign === void 0 && $$bindings.campaign && campaign !== void 0)
    $$bindings.campaign(campaign);
  $$result.css.add(css$4);
  return `<section class="${"current-campaigns svelte-jjk071"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="${"flex svelte-jjk071"}">${validate_component(Campaign, "CampaignIcon").$$render($$result, {}, {}, {})}
      <h2 class="${"svelte-jjk071"}">Current Campaigns</h2></div>

    ${validate_component(CurrentCampaign, "CurrentCampaign").$$render($$result, { campaign }, {}, {})}`;
    }
  })}
</section>`;
});
var History_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "svg.svelte-ul074j{fill:var(--interactive-color)}",
  map: null
};
const History = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<svg height="${"24px"}" viewBox="${"0 0 24 24"}" width="${"24px"}" class="${"svelte-ul074j"}"><path d="${"M0 0h24v24H0V0z"}" fill="${"none"}"></path><path d="${"M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z"}"></path></svg>`;
});
var PreviousCampaignCard_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "h1.svelte-6ka44w{font-size:1.4rem;margin-top:16px;margin-bottom:16px;line-height:1rem}.verb.svelte-6ka44w,.unit.svelte-6ka44w{display:block;margin-top:12px;font-size:0.75rem;text-transform:none;letter-spacing:0.01em;font-weight:400;margin-bottom:0}.description.svelte-6ka44w{font-weight:400;font-size:1rem;letter-spacing:0.01em;margin-bottom:0}",
  map: null
};
const PreviousCampaignCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { campaign } = $$props;
  if ($$props.campaign === void 0 && $$bindings.campaign && campaign !== void 0)
    $$bindings.campaign(campaign);
  $$result.css.add(css$2);
  return `<div style="${"grid-area: " + escape(campaign.shortName) + ";"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<h1 class="${"svelte-6ka44w"}">${escape(campaign.goalUnit === "dollars" ? "$" : "")}${escape(campaign.goal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
      <span class="${"unit svelte-6ka44w"}">${escape(campaign.goalUnit === "dollars" || !campaign.goalUnit ? "" : campaign.goalUnit)}</span>
      <span class="${"verb svelte-6ka44w"}">${escape(campaign.goalVerb ?? "")}</span></h1>

    <p class="${"description svelte-6ka44w"}">${escape(campaign.description)}</p>`;
    }
  })}
</div>`;
});
var AllTime_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".all-time h2 svg{fill:var(--interactive-color);width:40px;height:40px;margin-bottom:-10px}.all-time.svelte-ihuwhu p.svelte-ihuwhu{color:var(--text-color-subdued);letter-spacing:0.01em;font-weight:300;font-size:0.8rem}.all-time .info-icon{fill:var(--interactive-color);height:20px;width:20px;margin-bottom:-4px;cursor:pointer}.flex.svelte-ihuwhu.svelte-ihuwhu{margin:24px 0 16px;display:flex;gap:16px;justify-content:flex-start;align-items:center}.flex.svelte-ihuwhu h2.svelte-ihuwhu{margin:6px 0 0 0}.grid.svelte-ihuwhu.svelte-ihuwhu{margin:24px 0;width:100%;display:grid;gap:16px;grid-template-columns:repeat(5, 1fr);grid-template-rows:repeat(2, minmax(140px, auto));grid-template-areas:'banks banks banks banks banks'\n      'petitioners petitioners  subscriptions subscriptions subscriptions'}.all-time .grid .card{height:100%}@media screen and (max-width: 600px){.grid.svelte-ihuwhu.svelte-ihuwhu{grid-template-rows:repeat(2, minmax(140px, auto));grid-template-areas:'banks banks banks banks banks'\n        'petitioners petitioners petitioners petitioners petitioners'\n        'subscriptions subscriptions subscriptions subscriptions subscriptions'}}",
  map: null
};
const AllTime = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const exampleBankCampaign = {
    id: "1",
    createdBy: {
      id: "Jeff ID",
      email: "jeff@jeff.com",
      emailVerified: true,
      isAdmin: true
    },
    updatedBy: {
      id: "Jeff ID",
      email: "jeff@jeff.com",
      emailVerified: true,
      isAdmin: true
    },
    createdAt: "created at date",
    updatedAt: "created at date",
    shortName: "banks",
    title: "Removal of personal funds from the for-profit banking system",
    description: "Removal of personal funds from the for-profit banking system",
    goal: 12e7,
    goalUnit: "dollars",
    goalVerb: "transferred",
    goalStartDate: "2022-01-01T12:00:00-06:00",
    goalDeadline: "2022-05-01T12:00:00-06:00",
    realizedValue: 6e7
  };
  const usersCampaign = {
    id: "1",
    createdBy: {
      id: "Jeff ID",
      email: "jeff@jeff.com",
      emailVerified: true,
      isAdmin: true
    },
    updatedBy: {
      id: "Jeff ID",
      email: "jeff@jeff.com",
      emailVerified: true,
      isAdmin: true
    },
    createdAt: "created at date",
    updatedAt: "created at date",
    shortName: "petitioners",
    title: "Petitioners joining the platform",
    description: "Petitioners joining the platform",
    goal: 1e5,
    goalVerb: "petitioners",
    goalStartDate: "2022-01-01T12:00:00-06:00",
    goalDeadline: "2022-05-01T12:00:00-06:00",
    realizedValue: 49006
  };
  const subscriptionsCampaign = {
    id: "1",
    createdBy: {
      id: "Jeff ID",
      email: "jeff@jeff.com",
      emailVerified: true,
      isAdmin: true
    },
    updatedBy: {
      id: "Jeff ID",
      email: "jeff@jeff.com",
      emailVerified: true,
      isAdmin: true
    },
    createdAt: "created at date",
    updatedAt: "created at date",
    shortName: "subscriptions",
    title: "Transfer from subscription services to one-time and buy-up services",
    description: "Transfer from subscription services to one-time and buy-up services",
    goal: 1e5,
    goalUnit: "subscriptions cancelled",
    goalStartDate: "2022-01-01T12:00:00-06:00",
    goalDeadline: "2022-05-01T12:00:00-06:00",
    realizedValue: 49006
  };
  $$result.css.add(css$1);
  return `<section class="${"all-time svelte-ihuwhu"}"><div class="${"flex svelte-ihuwhu"}"><h2 class="${"svelte-ihuwhu"}">${validate_component(History, "HistoryIcon").$$render($$result, {}, {}, {})}
      All Time
      <span class="${"info"}">${validate_component(Info, "InfoIcon").$$render($$result, {}, {}, {})}</span></h2></div>

  ${``}

  <div class="${"grid svelte-ihuwhu"}">${validate_component(PreviousCampaignCard, "PreviousCampaignCard").$$render($$result, { campaign: exampleBankCampaign }, {}, {})}
    ${validate_component(PreviousCampaignCard, "PreviousCampaignCard").$$render($$result, { campaign: usersCampaign }, {}, {})}
    ${validate_component(PreviousCampaignCard, "PreviousCampaignCard").$$render($$result, { campaign: subscriptionsCampaign }, {}, {})}</div>
</section>`;
});
var index_svelte_svelte_type_style_lang = "";
const css = {
  code: "header.svelte-1oq5xat.svelte-1oq5xat,main.svelte-1oq5xat.svelte-1oq5xat{margin:0 auto 0 auto;padding:0 0 24px 0;width:100%;max-width:750px}header.svelte-1oq5xat.svelte-1oq5xat{padding-top:72px}.petition-info svg{fill:var(--interactive-color);height:20px;width:20px;margin-bottom:-4px;cursor:pointer}.petition-info.svelte-1oq5xat p.svelte-1oq5xat{font-weight:300;font-size:0.8rem;color:var(--text-color-subdued);letter-spacing:0.025em}main.svelte-1oq5xat.svelte-1oq5xat{padding:0}p.svelte-1oq5xat.svelte-1oq5xat:last-of-type{margin-bottom:0}",
  map: null
};
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const example = {
    id: "1",
    createdBy: {
      id: "Jeff ID",
      email: "jeff@jeff.com",
      emailVerified: true,
      isAdmin: true
    },
    updatedBy: {
      id: "Jeff ID",
      email: "jeff@jeff.com",
      emailVerified: true,
      isAdmin: true
    },
    createdAt: "created at date",
    updatedAt: "created at date",
    description: "Removal of personal funds from the for-profit banking system",
    goal: 12e7,
    goalUnit: "dollars",
    goalVerb: "transferred",
    goalStartDate: "2022-01-01T12:00:00-06:00",
    goalDeadline: "2022-05-01T12:00:00-06:00",
    realizedValue: 6e7
  };
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Late-Stage</title>`, ""}`, ""}

${validate_component(Controls, "Controls").$$render($$result, {}, {}, {})}

<main class="${"svelte-1oq5xat"}"><header class="${"petition-info svelte-1oq5xat"}"><h1>Petition <span>${validate_component(Info, "InfoIcon").$$render($$result, {}, {}, {})}</span></h1>

    ${``}</header>

  <main class="${"svelte-1oq5xat"}">${validate_component(CurrentCampaigns, "CurrentCampaigns").$$render($$result, { campaign: example }, {}, {})}
    ${validate_component(AllTime, "AllTime").$$render($$result, {}, {}, {})}</main>
</main>`;
});
export { Routes as default };
