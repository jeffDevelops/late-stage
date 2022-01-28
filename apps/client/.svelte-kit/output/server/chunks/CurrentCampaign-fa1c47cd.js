import { c as create_ssr_component, v as validate_component, e as escape } from "./index-f463a23b.js";
import dayjs from "dayjs";
import { C as Card } from "./Card-ea278822.js";
var Hourglass_svelte_svelte_type_style_lang = "";
const css$1 = {
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
  $$result.css.add(css$1);
  return `<div id="${"hourglass"}" class="${"ready svelte-4mc17g"}"><div class="${"glass svelte-4mc17g"}"><div class="${"sand top svelte-4mc17g"}"></div></div>
  <div class="${"glass bottom svelte-4mc17g"}"><div class="${"sand bottom svelte-4mc17g"}"></div></div>
</div>`;
});
var CurrentCampaign_svelte_svelte_type_style_lang = "";
const css = {
  code: ".grid.svelte-1bkvc1w.svelte-1bkvc1w{position:relative;display:grid;gap:16px;grid-template-columns:3fr 1fr;grid-template-rows:minmax(180px, auto);margin:16px 0;width:100%;z-index:-1}.goal-description.svelte-1bkvc1w.svelte-1bkvc1w{font-size:1.1rem;font-weight:400;letter-spacing:0.01em}.goal.svelte-1bkvc1w.svelte-1bkvc1w{font-weight:500;letter-spacing:0.01em;font-size:0.9em;margin-bottom:0}.goal-visualization.svelte-1bkvc1w.svelte-1bkvc1w,.realized-value.svelte-1bkvc1w.svelte-1bkvc1w{border-radius:8px;height:16px}.goal-visualization.svelte-1bkvc1w.svelte-1bkvc1w{margin-top:24px;background-color:var(--visualization-color);position:relative;width:100%}.realized-value.svelte-1bkvc1w.svelte-1bkvc1w{background-color:var(--interactive-color)}.goal-visualization-description.svelte-1bkvc1w.svelte-1bkvc1w{font-weight:700;letter-spacing:0.025em;font-size:0.75em;margin-top:8px;margin-bottom:0}.time-container.svelte-1bkvc1w.svelte-1bkvc1w{display:flex;justify-content:center;align-items:center;flex-direction:column;position:relative;height:100%}.deadline.svelte-1bkvc1w.svelte-1bkvc1w{position:absolute;z-index:1;top:0;left:0;right:0;bottom:0;margin:auto;height:50px;width:100%}.deadline.svelte-1bkvc1w .svelte-1bkvc1w{text-align:center}.deadline-card.svelte-1bkvc1w.svelte-1bkvc1w{height:100%}.deadline-card .card, .goal-card .card{padding:12px;height:100%}.days-remaining.svelte-1bkvc1w.svelte-1bkvc1w{justify-self:flex-end;margin-top:8px;margin-bottom:0;text-align:center}.hover-effect.svelte-1bkvc1w.svelte-1bkvc1w{position:absolute;top:0;left:0;width:100%;height:100%;background-color:var(--interactive-color);z-index:3;border-radius:var(--border-radius);opacity:0.95;backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);cursor:pointer;border:none}.hover-effect.svelte-1bkvc1w h1.svelte-1bkvc1w{color:var(--button-text-color)}@media screen and (max-width: 600px){.grid.svelte-1bkvc1w.svelte-1bkvc1w{grid-template-columns:3fr 1fr;grid-template-rows:minmax(180px, auto);margin:16px 0 0;width:100%}.deadline.svelte-1bkvc1w .svelte-1bkvc1w{text-align:center;font-size:0.8rem}.current-campaigns .card:first-child{padding:12px}.hover-effect.svelte-1bkvc1w h1.svelte-1bkvc1w{font-size:1.5em;font-weight:400}}@media screen and (max-width: 450px){.grid.svelte-1bkvc1w.svelte-1bkvc1w{grid-template-columns:1fr;grid-template-rows:minmax(180px, auto) minmax(180px, auto);margin:16px 0 0;width:100%}}",
  map: null
};
const CurrentCampaign = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let realizedValuePercentage;
  let { campaign } = $$props;
  if ($$props.campaign === void 0 && $$bindings.campaign && campaign !== void 0)
    $$bindings.campaign(campaign);
  $$result.css.add(css);
  realizedValuePercentage = campaign.realizedValue / campaign.goal * 100;
  return `<div class="${"current-campaign grid svelte-1bkvc1w"}">${``}

  <div class="${"goal-card"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<p class="${"goal-description svelte-1bkvc1w"}">${escape(campaign.description)}</p>
      <p class="${"goal svelte-1bkvc1w"}">${escape(campaign.goalUnit === "dollars" ? "$" : "")}${escape(campaign.goal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
        ${escape(campaign.goalUnit === "dollars" ? "" : campaign.goalUnit)}
        ${escape(campaign.goalVerb)} by ${escape(dayjs(campaign.goalDeadline).format("MMM D, YYYY"))}</p>

      <div class="${"goal-visualization svelte-1bkvc1w"}"><div style="${"width: " + escape(realizedValuePercentage) + "%;"}" class="${"realized-value svelte-1bkvc1w"}"></div></div>

      <p class="${"goal-visualization-description svelte-1bkvc1w"}">${escape(campaign.goalUnit === "dollars" ? "$" : "")}${escape(campaign.realizedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))} / ${escape(campaign.goalUnit === "dollars" ? "$" : "")}${escape(campaign.goal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}${escape(campaign.goalUnit === "dollars" ? "" : campaign.goalUnit)} goal
      </p>`;
    }
  })}</div>

  <div class="${"deadline-card svelte-1bkvc1w"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="${"time-container svelte-1bkvc1w"}">${validate_component(Hourglass, "Hourglass").$$render($$result, {
        startDate: campaign.goalStartDate,
        endDate: campaign.goalDeadline
      }, {}, {})}
        <div class="${"deadline svelte-1bkvc1w"}"><h4 class="${"svelte-1bkvc1w"}">Deadline</h4>
          <p class="${"svelte-1bkvc1w"}">${escape(dayjs(campaign.goalDeadline).format("MMM D, YYYY"))}</p></div>

        <p class="${"days-remaining svelte-1bkvc1w"}">${escape(dayjs(campaign.goalDeadline).diff(dayjs(), "day"))} days remaining
        </p></div>`;
    }
  })}</div>
</div>`;
});
export { CurrentCampaign as C };
