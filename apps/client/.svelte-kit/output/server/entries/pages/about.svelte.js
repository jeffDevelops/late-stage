import { c as create_ssr_component, v as validate_component } from "../../chunks/index-4390b0b8.js";
import { C as Controls } from "../../chunks/Controls-6346f8a0.js";
import { C as Card } from "../../chunks/Card-0ad50115.js";
import { C as Checklist } from "../../chunks/Checklist-947c96ab.js";
import "../../chunks/Logo-e158a041.js";
import "../../chunks/index-b462fd7a.js";
const Petition = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg enable-background="${"new 0 0 24 24"}" height="${"24px"}" viewBox="${"0 0 24 24"}" width="${"24px"}"><g><rect fill="${"none"}" height="${"24"}" width="${"24"}"></rect></g><g><g><path d="${"M9,4v1.38c-0.83-0.33-1.72-0.5-2.61-0.5c-1.79,0-3.58,0.68-4.95,2.05l3.33,3.33h1.11v1.11c0.86,0.86,1.98,1.31,3.11,1.36 V15H6v3c0,1.1,0.9,2,2,2h10c1.66,0,3-1.34,3-3V4H9z M7.89,10.41V8.26H5.61L4.57,7.22C5.14,7,5.76,6.88,6.39,6.88 c1.34,0,2.59,0.52,3.54,1.46l1.41,1.41l-0.2,0.2c-0.51,0.51-1.19,0.8-1.92,0.8C8.75,10.75,8.29,10.63,7.89,10.41z M19,17 c0,0.55-0.45,1-1,1s-1-0.45-1-1v-2h-6v-2.59c0.57-0.23,1.1-0.57,1.56-1.03l0.2-0.2L15.59,14H17v-1.41l-6-5.97V6h8V17z"}"></path></g></g></svg>`;
});
var about_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-h6388k.svelte-h6388k{margin:0 auto;padding:0 0 24px;width:100%;max-width:750px}section.svelte-h6388k.svelte-h6388k:first-of-type{padding-top:72px}.petition-heading svg, .checklist-heading svg{height:30px;width:30px;fill:var(--interactive-color);margin-bottom:-6px}.about .card:not(:last-of-type){margin-bottom:16px}img.svelte-h6388k.svelte-h6388k{width:90px;height:90px;border-radius:var(--border-radius);margin-bottom:16px}article.svelte-h6388k.svelte-h6388k{display:flex;gap:16px;align-items:center;justify-content:space-between}article.svelte-h6388k h3.svelte-h6388k{margin-bottom:8px}article section.svelte-h6388k p.svelte-h6388k:last-of-type{margin:0}@media screen and (max-width: 600px){main.svelte-h6388k.svelte-h6388k{padding:0 0 16px}img.svelte-h6388k.svelte-h6388k{width:90px;height:90px;align-self:center}}",
  map: null
};
const About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Late-Stage: About</title>`, ""}`, ""}

${validate_component(Controls, "Controls").$$render($$result, {}, {}, {})}

<main class="${"svelte-h6388k"}"><section class="${"about svelte-h6388k"}"><h1>What is Late-Stage?</h1>

    <p class="${"svelte-h6388k"}">Late-Stage is an advocacy platform that strives to shed light on opportunities to eradicate
      extractionist patterns in our society.
    </p>

    ${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<h2 class="${"petition-heading"}">${validate_component(Petition, "PetitionIcon").$$render($$result, {}, {}, {})} A Living Petition</h2>

      <p class="${"svelte-h6388k"}">We aim to quantify &quot;putting our money where our mouth is&quot; to demonstrate to lawmakers that
        we reject the many institutionalized dark patterns built to extract money from the working
        class.
      </p>

      <p class="${"svelte-h6388k"}">Government has bipartisanly demonstrated that they do not vote with their constituents in
        mind, so rather than hand them a petition with simple ink signatures, Late-Stage&#39;s petition
        serves as a public record of acts already fulfilled to meaningfully denounce the system they
        uphold.
      </p>`;
    }
  })}

    ${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<h2 class="${"checklist-heading"}">${validate_component(Checklist, "ChecklistIcon").$$render($$result, {}, {}, {})} A Personal Checklist</h2>

      <p class="${"svelte-h6388k"}">Late-Stage curates a checklist to help navigate our late-stage capitalist society in order
        to identify opportunities to reject and combat extractionism.
      </p>

      <p class="${"svelte-h6388k"}">When you check items off your list, your personal accomplishment is tallied as part of the
        petition dashboard. Your own personal impact lives in solidarity with that of all other
        petitioners, as a collective receipt of actioned denouncement.
      </p>`;
    }
  })}</section>

  <section class="${"svelte-h6388k"}"><h1>Team</h1>

    ${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<article class="${"svelte-h6388k"}"><div><h3 class="${"svelte-h6388k"}">Jeff Reynolds</h3>
          <h4>UX Designer, Developer</h4></div>

        <img src="${"Jeff.jpeg"}" alt="${"Portrait of Jeff Reynolds"}" class="${"svelte-h6388k"}"></article>

      <p class="${"svelte-h6388k"}">I&#39;m hoping to foster a community interested in making a difference for the people that
        create the value in our society.
      </p>

      <p class="${"svelte-h6388k"}">Like many, I am extremely frustrated by our representation&#39;s blatant disregard for their
        constituents. They&#39;ve proven inept to respresent us, so it&#39;s time to take matters into our
        own hands.
      </p>

      <p class="${"svelte-h6388k"}">I can&#39;t do it alone! My expertise is primarily technical, and so I&#39;m building a platform of
        requests for comment (RFCs) in hopes of informing a direction for the platform by passionate
        people more specialized in disciplines with more direct investment in socioeconomic change.
      </p>

      <p class="${"svelte-h6388k"}">This is my full-time endeavor. If you would like to contribute money to the project, you can <a href="${"https://buymeacoffee.com/latestage.jeff"}">buy me a coffee</a>. This gives me the runway I need to continue working on the project, and pays for server
        and database costs, image hosting, and moderation man-hours.
      </p>`;
    }
  })}</section>
</main>`;
});
export { About as default };
