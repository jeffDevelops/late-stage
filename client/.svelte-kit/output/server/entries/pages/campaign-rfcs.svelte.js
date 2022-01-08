import { c as create_ssr_component, v as validate_component, d as add_attribute, e as escape } from "../../chunks/index-7280390d.js";
import { a as Controls, C as Card, O as OpenInNew } from "../../chunks/Controls-eb495844.js";
import { C as Campaign } from "../../chunks/Campaign-01b4d6f2.js";
import { P as Pencil, M as MarkdownEditor } from "../../chunks/MarkdownEditor-30623696.js";
import "../../chunks/Theme-fc7d7766.js";
const campaignIdeaTemplate = `# [Your campaign title here (how it will appear on the website)]

**CAMPAIGN IDEA**


## Deadlines
##### What is the priority level of getting your campaign onto the website and launching it? Why should this idea be prioritized such? Where does this idea fall in reference to other outstanding ideas for the platform?

[Your answer here]



**When would the campaign be launched?** [Ideal launch date]

**When would the campaign end?** [Ideal end date]

**Should the website still make the action(s) within the campaign available for users to perform after the campaign ends? In other words, is the campaign still relevant to our mission after the deadline?** [Yes or No]



## Impact and Unintended Consequences
#### What is the **desired end-state** of the campaign? What **impact** will it have?

[Your answer here]



#### What are potential **unintended consequences** for concentrating community activity on your campaign within a short-term timeframe?

[Your answer here]



#### How should the results of the campaign be communicated on the website?

[Your answer here]




## Tangibility, Provability, Measurability
#### What metric(s) would indicate community participation? What can the website collect, measure, or tally to prove to the community that the initiative is working, and prove to our representation that we aren't messing around?

[Your answer here]



#### How would participation be validated / proven? Examples: Pictures of withdrawal receipts indicating that funds were removed from the big banks, screenshots of subscription removals, screenshots of strike notices.

[Your answer here]





## Feasibility and Logistics

#### Pre-launch - How might the campaign be implemented as simply as possible, by a small, one-person development team? What challenges might arise in developing a solution before launch?

[Your answer here]



#### Launch - How, where, and to which audience(s) should the campaign be communicated to ensure widest adoption and participation possible?

[Your answer here]



#### What are potential logistical bottlenecks in validating participation? Examples: validating the amount of money removed from Wells Fargo in the withdrawal receipt matches the participant's claimed amount, and validating that they moved funds to a better financial institution.

[Your answer here]



#### Ideally, the development efforts for implementing and launching a campaign would go unwasted in the long-term, but we want to avoid compounding bottlenecks. If the actions in the campaign remain available on the website even after its end date (the campaign is no longer featured at the top of the petition page), is validation by a human still required?

[Your answer here]



#### Additional Notes

[Anything else you'd like to say here]
`;
var campaignRfcs_svelte_svelte_type_style_lang = "";
const css = {
  code: ".audit .opaque .card{transition:background-color 1s, box-shadow 1s, backdrop-filter 1s;border-top-right-radius:0 !important;border-top-left-radius:0 !important;box-shadow:0px 2px 10px 6px rgba(10, 10, 10, 0.1);backdrop-filter:blur(10px)}.audit .opaque .card{transition:background-color 1s, box-shadow 1s, backdrop-filter 1s}main.svelte-yxmunn.svelte-yxmunn{width:100%;padding:0 48px 16px;margin:0 auto;max-width:750px}.audit h2 svg{fill:var(--interactive-color);margin-bottom:-3px}.audit .card:not(:first-of-type), .audit section{margin-top:16px}.audit .code-icon{margin-right:8px}h4.svelte-yxmunn.svelte-yxmunn{margin-top:24px}.quick-links.svelte-yxmunn.svelte-yxmunn{position:sticky;top:0px;z-index:5}.quick-links.svelte-yxmunn a.svelte-yxmunn{display:block;margin-bottom:8px}strong.svelte-yxmunn.svelte-yxmunn{font-weight:700}em.svelte-yxmunn.svelte-yxmunn{font-style:italic}button.svelte-yxmunn.svelte-yxmunn{width:100%}@media screen and (max-width: 600px){main.svelte-yxmunn.svelte-yxmunn{padding:0 0 16px}}",
  map: null
};
const Campaign_rfcs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let value = campaignIdeaTemplate;
  let quickLinksNode;
  let campaignIdeaTemplateNode;
  $$result.css.add(css);
  return `${validate_component(Controls, "Controls").$$render($$result, {}, {}, {})}

<main class="${"audit svelte-yxmunn"}"><h1>RFC - Campaigns</h1>

  <h4 class="${"svelte-yxmunn"}">What is an RFC?</h4>
  <p>Requests for comments (or RFCs) are a community-driven mechanism for drafting, implementing, and
    launching new campaigns.
  </p>

  <h4 class="${"svelte-yxmunn"}">What do you mean by &quot;campaign&quot;?</h4>
  <p>While Late-Stage is biased toward action in everything it does, campaigns are intended to focus
    community action on exigent initiatives to drive profound, short-term impact.
  </p>

  <div class="${"quick-links svelte-yxmunn"}"${add_attribute("this", quickLinksNode, 0)}>${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => `<h2>${validate_component(OpenInNew, "OpenInNew").$$render($$result, {}, {}, {})} Quick Links</h2>
      <a rel="${"noopener noreferrer"}" target="${"_blank"}" href="${"https://late-stage.notion.site/f8709ff5bbed4fcb9bda3d802fabdac0?v=86dd875520eb4384a8a01424da6ad666"}" class="${"svelte-yxmunn"}">Roadmap</a>

      <a href="${"#campaign-idea-template"}" class="${"svelte-yxmunn"}">Campaign Idea Template</a>`
  })}</div>

  ${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => `<h2 class="${"petition-heading"}">${validate_component(Campaign, "CampaignIcon").$$render($$result, {}, {}, {})} I have a Campaign Idea!</h2>

    <p>We&#39;re excited to hear it! There are few things to consider before we take it on:</p>

    <h4 class="${"svelte-yxmunn"}">Focused, Time-Bound Impact</h4>
    <p>What is the desired end-state of the campaign? What impact will it have? What are the
      advantages of focusing the community on the actions in your campaign within a designated
      window of time, as opposed to simply adding it to the Late-Stage checklist? What are potential
      unintended consequences for concentrating community activity on your campaign?
    </p>

    <h4 class="${"svelte-yxmunn"}">Community Support</h4>
    <p>Is it an idea that the community rallies behind? What compromises must individuals be willing
      to make to carry out your campaign?
    </p>

    <p>Is it something that the average community member can perform? Does it alienate certain people
      from participation? How can we make its reach as widespread as possible?
    </p>

    <h4 class="${"svelte-yxmunn"}">Tangibility, provability, measurability</h4>

    <p>How can individuals prove that they have performed the action detailed in your campaign? What
      is the simplest, least resource-intensive way to prove that someone participated?
    </p>

    <p>Petition signatures don&#39;t work when our representation don&#39;t act with our best interest
      at-heart, so what is something tangible or observable that the Late-Stage platform can collect
      or record to indicate that your campaign was carried out <em class="${"svelte-yxmunn"}">en masse</em>?
    </p>

    <p>Does your campaign involve some level of compromise on the part of individual community
      members? It&#39;s critical that your campaign has an element of provability not only to
      communicate tangible impact to elected officials, but also to assuage doubt in the campaign
      amidst the community. If, for example, your campaign involves a general strike, perhaps the
      platform could collect a copy of a strike notice or correspondence with management about the
      terms of a strike. Having the platform create a paper trail in this way encourages others to
      take the leap too.
    </p>

    <h4 class="${"svelte-yxmunn"}">How does it fit in the ecosystem?</h4>
    <p>Late-Stage wants to make it as easy as possible for individuals to subvert extractionism and
      it does so by distilling actions community members can take into bite-sized to-dos on our
      checklist. Ideally, campaigns are intended to focus the community at large on checking an item
      off their list.
    </p>
    <p>The checklist introduces healthy competition within the community to check as many to-dos off
      the list as possible, and provides a sense of individual accomplishment to complement
      collective accomplishments on the petition dashboard.
    </p>

    <h4 class="${"svelte-yxmunn"}">Feasibility and Logistics</h4>
    <p>Late-Stage is currently developed and maintained by a single developer. Please take the time
      to consider 1) how your campaign might be implemented as simply as possible, and 2), how a
      compromise between your campaign&#39;s provability and the man-hours to validate that provability
      might be achieved.
    </p>

    <p>If your idea is time-sensitive and carries considerable community support, but is logistically
      infeasible to carry out in the allotted timeframe, consider volunteering time or resources to
      help see it to fruition.
    </p>`
  })}

  <section${add_attribute("this", campaignIdeaTemplateNode, 0)}>${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => `<h2>${validate_component(Pencil, "PencilIcon").$$render($$result, {}, {}, {})} Campaign Idea Template</h2>

      <p>Please use the following template to compose your campaign idea.</p>

      <p>Note: the below editor allows you to enter text, but <strong class="${"svelte-yxmunn"}">your input will not be saved.</strong> You can either enter your campaign info here and paste into Reddit when finished, or paste
        the template into Reddit and edit there.
      </p>

      <p>The template is in Markdown, so be sure to toggle &quot;Markdown Mode&quot; in Reddit before pasting.
        If your input has a bunch of HTML name codes (like <code>${escape("&#x200B;")}</code>), you&#39;ve done
        it in the wrong order: delete your input, click &quot;Markdown Mode,&quot; and paste again. And
        finally, before you post, please use the &quot;Campaign Idea&quot; flair.
      </p>`
  })}

    ${validate_component(MarkdownEditor, "MarkdownEditor").$$render($$result, { initialValue: value }, {}, {})}

    <button class="${"primary svelte-yxmunn"}">Copy To Clipboard and Open Reddit</button></section>
</main>`;
});
export { Campaign_rfcs as default };
