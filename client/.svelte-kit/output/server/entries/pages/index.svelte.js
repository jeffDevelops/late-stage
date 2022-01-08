import { c as create_ssr_component, v as validate_component, e as escape } from "../../chunks/index-7280390d.js";
import dayjs from "dayjs";
import { C as Campaign } from "../../chunks/Campaign-01b4d6f2.js";
import { C as Card, a as Controls } from "../../chunks/Controls-eb495844.js";
import { I as Info } from "../../chunks/Info-b727e8c2.js";
import "../../chunks/Theme-fc7d7766.js";
var Hourglass_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ":root{--sandColor:var(--interactive-color);--glassColor:var(--visualization-color);--hourglassSize:4.25rem}#hourglass.svelte-4mc17g.svelte-4mc17g{display:inline-block;transition-property:transform;transition-duration:700ms;transition-timing-function:ease}.glass.svelte-4mc17g.svelte-4mc17g{z-index:1;position:relative;background-color:var(--glassColor);clip-path:polygon(0 0, 100% 0, 50% 100%);height:var(--hourglassSize);width:calc(var(--hourglassSize) * 1.5);bottom:-0.2em;overflow:hidden;border-top-left-radius:20% 100%;border-top-right-radius:20% 100%;margin:0 auto}.top.svelte-4mc17g.svelte-4mc17g{z-index:2}.glass.bottom.svelte-4mc17g.svelte-4mc17g{z-index:0;top:-0.2em;clip-path:polygon(50% 0, 100% 100%, 0 100%);border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:20% 100%;border-bottom-right-radius:20% 100%}.sand.top.svelte-4mc17g.svelte-4mc17g:after{position:absolute;content:'';width:100%;top:-20px;height:20px;border-bottom-left-radius:50% 70%;border-bottom-right-radius:50% 70%;background-color:transparent;box-shadow:0 10px 0 var(--sandColor);animation:svelte-4mc17g-kfSandTop 2000ms ease-in-out infinite}.sand.svelte-4mc17g.svelte-4mc17g{position:absolute;background-color:var(--sandColor);min-width:100%;height:100%;bottom:0}#hourglass.ready.svelte-4mc17g .sand.svelte-4mc17g{transition-property:height;transition-timing-function:ease-out;transition-duration:200ms}.glass.bottom.svelte-4mc17g .sand.svelte-4mc17g{height:0;border-top-left-radius:50% 100%;border-top-right-radius:50% 100%;border-bottom-left-radius:0;border-bottom-right-radius:0;transition-timing-function:ease-in;animation:svelte-4mc17g-kfSandBottom 3000ms ease infinite}.glass.bottom.svelte-4mc17g.svelte-4mc17g:before{position:absolute;content:'';background-color:var(--sandColor);height:98%;width:3px;bottom:0;left:50%;transform:translate(-50%)}@keyframes svelte-4mc17g-kfSandStream{0%{height:0;transform:rotate(10deg)}10%{height:100%;top:0;transform:rotate(-15deg)}95%{height:100%;top:0}100%{height:0;top:100%}}@keyframes svelte-4mc17g-kfSand{0%{border-top-left-radius:20% 20%;border-top-right-radius:20% 20%}50%{border-top-left-radius:50% 40%;border-top-right-radius:50% 40%}}@keyframes svelte-4mc17g-kfSandTop{0%{border-bottom-left-radius:50% 50%;border-bottom-right-radius:50% 50%}50%{border-bottom-left-radius:50% 80%;border-bottom-right-radius:50% 80%}100%{border-bottom-left-radius:50% 50%;border-bottom-right-radius:50% 50%}}@keyframes svelte-4mc17g-kfSandBottom{0%{border-top-left-radius:50% 100%;border-top-right-radius:50% 100%}50%{border-top-left-radius:100% 150%;border-top-right-radius:100% 150%}100%{border-top-left-radius:50% 100%;border-top-right-radius:50% 100%}}@keyframes svelte-4mc17g-kfFlip{0%{transform:rotate(0deg)}100%{transform:rotate(180deg)}}",
  map: null
};
const Hourglass = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { startDate } = $$props;
  let { endDate } = $$props;
  if ($$props.startDate === void 0 && $$bindings.startDate && startDate !== void 0)
    $$bindings.startDate(startDate);
  if ($$props.endDate === void 0 && $$bindings.endDate && endDate !== void 0)
    $$bindings.endDate(endDate);
  $$result.css.add(css$5);
  return `<div id="${"hourglass"}" class="${"ready svelte-4mc17g"}"><div class="${"glass svelte-4mc17g"}"><div class="${"sand top svelte-4mc17g"}"></div></div>
  <div class="${"glass bottom svelte-4mc17g"}"><div class="${"sand bottom svelte-4mc17g"}"></div></div>
</div>`;
});
var CurrentCampaigns_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".current-campaigns svg{fill:var(--interactive-color);width:40px;height:40px}.current-campaigns.svelte-j9ryu5.svelte-j9ryu5:first-child{border:1px solid var(--interactive-color);border-radius:var(--border-radius);backdrop-filter:blur(2px)}.flex.svelte-j9ryu5.svelte-j9ryu5{display:flex;gap:16px;justify-content:flex-start;align-items:center}.flex.svelte-j9ryu5 h2.svelte-j9ryu5{margin:6px 0 0 0}.grid.svelte-j9ryu5.svelte-j9ryu5{display:grid;gap:16px;grid-template-columns:3fr 1fr;grid-template-rows:minmax(180px, auto);margin:16px 0;width:100%}.goal-description.svelte-j9ryu5.svelte-j9ryu5{font-size:1.1rem;font-weight:400;letter-spacing:0.01em}.goal.svelte-j9ryu5.svelte-j9ryu5{font-weight:500;letter-spacing:0.01em;font-size:0.9em;margin-bottom:0}.goal-visualization.svelte-j9ryu5.svelte-j9ryu5,.realized-value.svelte-j9ryu5.svelte-j9ryu5{border-radius:8px;height:16px}.goal-visualization.svelte-j9ryu5.svelte-j9ryu5{margin-top:24px;background-color:var(--visualization-color);position:relative;width:100%}.realized-value.svelte-j9ryu5.svelte-j9ryu5{background-color:var(--interactive-color)}.goal-visualization-description.svelte-j9ryu5.svelte-j9ryu5{font-weight:700;letter-spacing:0.025em;font-size:0.75em;margin-top:8px;margin-bottom:0}.time-container.svelte-j9ryu5.svelte-j9ryu5{display:flex;justify-content:center;align-items:center;flex-direction:column;position:relative}.deadline.svelte-j9ryu5.svelte-j9ryu5{position:absolute;z-index:1;top:0;left:0;right:0;bottom:0;margin:auto;height:50px;width:100%}.deadline.svelte-j9ryu5 .svelte-j9ryu5{text-align:center}.deadline-card.svelte-j9ryu5.svelte-j9ryu5{height:100%}.deadline-card .card, .goal-card .card{padding:12px;height:100%}.days-remaining.svelte-j9ryu5.svelte-j9ryu5{justify-self:flex-end;margin-top:8px;margin-bottom:0;text-align:center}@media screen and (max-width: 600px){.grid.svelte-j9ryu5.svelte-j9ryu5{grid-template-columns:3fr 1fr;grid-template-rows:minmax(180px, auto);margin:16px 0 0;width:100%}.deadline.svelte-j9ryu5 .svelte-j9ryu5{text-align:center;font-size:0.8rem}.current-campaigns .card:first-child{padding:12px}}",
  map: null
};
const CurrentCampaigns = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let realizedValuePercentage;
  let { campaign } = $$props;
  if ($$props.campaign === void 0 && $$bindings.campaign && campaign !== void 0)
    $$bindings.campaign(campaign);
  $$result.css.add(css$4);
  realizedValuePercentage = campaign.realizedValue / campaign.goal * 100;
  return `<section class="${"current-campaigns svelte-j9ryu5"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => `<div class="${"flex svelte-j9ryu5"}">${validate_component(Campaign, "CampaignIcon").$$render($$result, {}, {}, {})}
      <h2 class="${"svelte-j9ryu5"}">Current Campaigns</h2></div>

    <div class="${"grid svelte-j9ryu5"}"><div class="${"goal-card"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => `<p class="${"goal-description svelte-j9ryu5"}">${escape(campaign.description)}</p>
          <p class="${"goal svelte-j9ryu5"}">${escape(campaign.goalUnit === "dollars" ? "$" : "")}${escape(campaign.goal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
            ${escape(campaign.goalUnit === "dollars" ? "" : campaign.goalUnit)}
            ${escape(campaign.goalVerb)} by ${escape(dayjs(campaign.goalDeadline).format("MMM D, YYYY"))}</p>

          <div class="${"goal-visualization svelte-j9ryu5"}"><div style="${"width: " + escape(realizedValuePercentage) + "%;"}" class="${"realized-value svelte-j9ryu5"}"></div></div>

          <p class="${"goal-visualization-description svelte-j9ryu5"}">${escape(campaign.goalUnit === "dollars" ? "$" : "")}${escape(campaign.realizedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))} / ${escape(campaign.goalUnit === "dollars" ? "$" : "")}${escape(campaign.goal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}${escape(campaign.goalUnit === "dollars" ? "" : campaign.goalUnit)} goal
          </p>`
    })}</div>

      <div class="${"deadline-card svelte-j9ryu5"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => `<div class="${"time-container svelte-j9ryu5"}">${validate_component(Hourglass, "Hourglass").$$render($$result, {
        startDate: campaign.goalStartDate,
        endDate: campaign.goalDeadline
      }, {}, {})}
            <div class="${"deadline svelte-j9ryu5"}"><h4 class="${"svelte-j9ryu5"}">Deadline</h4>
              <p class="${"svelte-j9ryu5"}">${escape(dayjs(campaign.goalDeadline).format("MMM D, YYYY"))}</p></div>

            <p class="${"days-remaining svelte-j9ryu5"}">${escape(dayjs(campaign.goalDeadline).diff(dayjs(), "day"))} days remaining
            </p></div>`
    })}</div></div>`
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
  code: "h1.svelte-10yw3lj{font-size:2rem;margin-top:16px;margin-bottom:16px;line-height:1rem}.verb.svelte-10yw3lj,.unit.svelte-10yw3lj{display:block;margin-top:12px;font-size:0.75rem;text-transform:none;letter-spacing:0.01em;font-weight:400;margin-bottom:0}.description.svelte-10yw3lj{font-weight:400;font-size:1rem;letter-spacing:0.01em;margin-bottom:0}",
  map: null
};
const PreviousCampaignCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { campaign } = $$props;
  if ($$props.campaign === void 0 && $$bindings.campaign && campaign !== void 0)
    $$bindings.campaign(campaign);
  $$result.css.add(css$2);
  return `<div style="${"grid-area: " + escape(campaign.shortName) + ";"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => `<h1 class="${"svelte-10yw3lj"}">${escape(campaign.goalUnit === "dollars" ? "$" : "")}${escape(campaign.goal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
      <span class="${"unit svelte-10yw3lj"}">${escape(campaign.goalUnit === "dollars" || !campaign.goalUnit ? "" : campaign.goalUnit)}</span>
      <span class="${"verb svelte-10yw3lj"}">${escape(campaign.goalVerb ?? "")}</span></h1>

    <p class="${"description svelte-10yw3lj"}">${escape(campaign.description)}</p>`
  })}
</div>`;
});
var AllTime_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".all-time svg{fill:var(--interactive-color);width:40px;height:40px}.all-time.svelte-pqjrxx p.svelte-pqjrxx{color:var(--text-color-subdued);letter-spacing:0.01em;font-weight:300;font-size:0.8rem}.all-time .info-icon{fill:var(--interactive-color);height:20px;width:20px;margin-bottom:-4px;cursor:pointer}.flex.svelte-pqjrxx.svelte-pqjrxx{margin:24px 0 16px;display:flex;gap:16px;justify-content:flex-start;align-items:center}.flex.svelte-pqjrxx h2.svelte-pqjrxx{margin:6px 0 0 0}.grid.svelte-pqjrxx.svelte-pqjrxx{margin:24px 0;width:100%;display:grid;gap:16px;grid-template-columns:repeat(5, 1fr);grid-template-rows:repeat(2, minmax(140px, auto));grid-template-areas:'banks banks banks banks banks'\n      'petitioners petitioners  subscriptions subscriptions subscriptions'}.all-time .grid .card{height:100%}@media screen and (max-width: 600px){.grid.svelte-pqjrxx.svelte-pqjrxx{grid-template-rows:repeat(2, minmax(140px, auto));grid-template-areas:'banks banks banks banks banks'\n        'petitioners petitioners petitioners petitioners petitioners'\n        'subscriptions subscriptions subscriptions subscriptions subscriptions'}}",
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
    description: "Transfer from subscription services to one-time and buy-up services",
    goal: 1e5,
    goalUnit: "subscriptions cancelled",
    goalStartDate: "2022-01-01T12:00:00-06:00",
    goalDeadline: "2022-05-01T12:00:00-06:00",
    realizedValue: 49006
  };
  $$result.css.add(css$1);
  return `<section class="${"all-time svelte-pqjrxx"}"><div class="${"flex svelte-pqjrxx"}">${validate_component(History, "HistoryIcon").$$render($$result, {}, {}, {})}
    <h2 class="${"svelte-pqjrxx"}">All Time <span>${validate_component(Info, "InfoIcon").$$render($$result, {}, {}, {})}</span></h2></div>

  ${``}

  <div class="${"grid svelte-pqjrxx"}">${validate_component(PreviousCampaignCard, "PreviousCampaignCard").$$render($$result, { campaign: exampleBankCampaign }, {}, {})}
    ${validate_component(PreviousCampaignCard, "PreviousCampaignCard").$$render($$result, { campaign: usersCampaign }, {}, {})}
    ${validate_component(PreviousCampaignCard, "PreviousCampaignCard").$$render($$result, { campaign: subscriptionsCampaign }, {}, {})}</div>
</section>`;
});
var index_svelte_svelte_type_style_lang = "";
const css = {
  code: "header.svelte-qvj01x.svelte-qvj01x,main.svelte-qvj01x.svelte-qvj01x{margin:0 auto 0 auto;padding:40px 0 24px 0;width:100%;max-width:750px}.petition-info svg{fill:var(--interactive-color);height:20px;width:20px;margin-bottom:-4px;cursor:pointer}.petition-info.svelte-qvj01x p.svelte-qvj01x{font-weight:300;font-size:0.8rem;color:var(--text-color-subdued);letter-spacing:0.025em}main.svelte-qvj01x.svelte-qvj01x{padding:0}p.svelte-qvj01x.svelte-qvj01x:last-of-type{margin-bottom:0}",
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
  return `${validate_component(Controls, "Controls").$$render($$result, {}, {}, {})}

<main class="${"svelte-qvj01x"}"><header class="${"petition-info svelte-qvj01x"}"><h1>Petition <span>${validate_component(Info, "InfoIcon").$$render($$result, {}, {}, {})}</span></h1>

    ${``}</header>

  <main class="${"svelte-qvj01x"}">${validate_component(CurrentCampaigns, "CurrentCampaigns").$$render($$result, { campaign: example }, {}, {})}
    ${validate_component(AllTime, "AllTime").$$render($$result, {}, {}, {})}</main>
</main>`;
});
export { Routes as default };
