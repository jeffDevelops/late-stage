import { c as create_ssr_component, v as validate_component, d as add_attribute, e as escape } from "../../chunks/index-7280390d.js";
import { a as Controls, C as Card, O as OpenInNew } from "../../chunks/Controls-eb495844.js";
import { C as Checklist } from "../../chunks/Checklist-cb88cdff.js";
import { P as Pencil, M as MarkdownEditor } from "../../chunks/MarkdownEditor-30623696.js";
import "../../chunks/Theme-fc7d7766.js";
const checklistIdeaTemplate = `# [Your checklist item title here (how it will appear on the website)]

**CHECKLIST IDEA**


## Priority
##### What is the priority level of getting your checklist item onto the website? Why should this idea be prioritized such? Where does this idea fall in reference to other outstanding ideas for the platform?

[Your answer here]



## Impact and Unintended Consequences
#### What is the **collective impact** of many people executing on your checklist item?

[Your answer here]



#### What are potential **unintended consequences** of facilitating mass participation in your idea?

[Your answer here]



#### How should the results of individuals completing your checklist item be communicated on the petition dashboard?

[Your answer here]




## Tangibility, Provability, Measurability
#### What metric(s) would indicate an individual's participation? What can the website collect, measure, or tally to prove to the community that others are completing your task, and prove to our representation that we aren't messing around?

[Your answer here]



#### How would participation be validated / proven? Examples: Pictures of withdrawal receipts indicating that funds were removed from the big banks, screenshots of subscription removals, screenshots of strike notices.

[Your answer here]





## Feasibility and Logistics

#### How might the checklist item be implemented as simply as possible, by a small, one-person development team? What challenges might arise in developing a solution before launch?

[Your answer here]



#### What are potential logistical bottlenecks in validating participation? Examples: validating unsubscribe pages from extractionist payment models that add little end-user value.

[Your answer here]



#### Avoiding compounding bottlenecks - adding a checklist item incurs logistical debt, in that partication will need to be measured and validated long-term, on top of developing and maintaining new ones. How can validation be simplified so that the developer can focus on developing new checklist items, campaigns, and improving the platform?

[Your answer here]



#### Additional Notes

[Anything else you'd like to say here]
`;
var checklistRfcs_svelte_svelte_type_style_lang = "";
const css = {
  code: ".audit .opaque .card{transition:background-color 1s, box-shadow 1s, backdrop-filter 1s;border-top-right-radius:0 !important;border-top-left-radius:0 !important;box-shadow:0px 2px 10px 6px rgba(10, 10, 10, 0.1);backdrop-filter:blur(10px)}.audit .opaque .card{transition:background-color 1s, box-shadow 1s, backdrop-filter 1s}main.svelte-yxmunn.svelte-yxmunn{width:100%;padding:0 48px 16px;margin:0 auto;max-width:750px}.audit h2 svg{fill:var(--interactive-color);margin-bottom:-3px}.audit .card:not(:first-of-type), .audit section{margin-top:16px}.audit .code-icon{margin-right:8px}h4.svelte-yxmunn.svelte-yxmunn{margin-top:24px}.quick-links.svelte-yxmunn.svelte-yxmunn{position:sticky;top:0px;z-index:5}.quick-links.svelte-yxmunn a.svelte-yxmunn{display:block;margin-bottom:8px}strong.svelte-yxmunn.svelte-yxmunn{font-weight:700}em.svelte-yxmunn.svelte-yxmunn{font-style:italic}button.svelte-yxmunn.svelte-yxmunn{width:100%}@media screen and (max-width: 600px){main.svelte-yxmunn.svelte-yxmunn{padding:0 0 16px}}",
  map: null
};
const Checklist_rfcs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let value = checklistIdeaTemplate;
  let quickLinksNode;
  let checklistIdeaTemplateNode;
  $$result.css.add(css);
  return `${validate_component(Controls, "Controls").$$render($$result, {}, {}, {})}

<main class="${"audit svelte-yxmunn"}"><h1>RFC - Checklist</h1>

  <h4 class="${"svelte-yxmunn"}">What is an RFC?</h4>
  <p>Requests for comments (or RFCs) are a community-driven mechanism for drafting, implementing, and
    launching new checklist items.
  </p>

  <h4 class="${"svelte-yxmunn"}">What do you mean by &quot;checklist item&quot;?</h4>
  <p>The Late-Stage Checklist is a to-do list to help individuals mitigate their participation in
    extractionist capitalism.
  </p>

  <p>Checking an item off of your list is saved so that you can view your individual accomplishments,
    but it&#39;s also tallied on the petition dashboard, where you can see how your individual action
    has contributed to the greater good.
  </p>

  <div class="${"quick-links svelte-yxmunn"}"${add_attribute("this", quickLinksNode, 0)}>${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => `<h2>${validate_component(OpenInNew, "OpenInNew").$$render($$result, {}, {}, {})} Quick Links</h2>

      <a rel="${"noopener noreferrer"}" target="${"_blank"}" href="${"https://late-stage.notion.site/f8709ff5bbed4fcb9bda3d802fabdac0?v=86dd875520eb4384a8a01424da6ad666"}" class="${"svelte-yxmunn"}">Roadmap</a>

      <a href="${"#checklist-idea-template"}" class="${"svelte-yxmunn"}">Checklist Idea Template</a>`
  })}</div>

  ${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => `<h2 class="${"petition-heading"}">${validate_component(Checklist, "ChecklistIcon").$$render($$result, {}, {}, {})} I have a Checklist Idea!</h2>

    <p>Great! Take a moment to consider these things before submitting it:</p>

    <h4 class="${"svelte-yxmunn"}">Community Support</h4>

    <p>Is it an idea that the community will rally behind? What compromises must individuals be
      willing to make to check it off their list?
    </p>

    <p>Is it something that the average community member can perform? Does it alienate certain people
      from participation? How can we make its reach as widespread as possible?
    </p>

    <h4 class="${"svelte-yxmunn"}">Tangibility, provability, measurability</h4>

    <p>How can individuals prove that they have performed the action in your checklist item?</p>

    <p>Petition signatures don&#39;t work when our representation don&#39;t act with our best interest
      at-heart, so what is something tangible or observable that the Late-Stage platform can collect
      or record to indicate that your campaign was carried out <em class="${"svelte-yxmunn"}">en masse</em>?
    </p>

    <p>Does your checklist item involve some level of compromise on the part of individual community
      members? It&#39;s critical that your idea has an element of provability not only to communicate
      tangible impact to elected officials, but also to assuage doubt amidst the community. If, for
      example, your checklist item involves cancelling your Amazon Prime subscription, perhaps the
      platform could collect participants&#39; screenshots of the cancellation page. Having the platform
      create a paper trail in this way encourages others to make compromises like this too.
    </p>

    <h4 class="${"svelte-yxmunn"}">Feasibility and Logistics</h4>
    <p>Late-Stage is currently developed and maintained by a single developer. Please take the time
      to consider 1) how your checklist item might be implemented as simply as possible, and 2), how
      a compromise between your checklist item&#39;s provability and the man-hours to validate that
      provability might be achieved.
    </p>

    <p>If your idea carries considerable community support, but is logistically infeasible to carry
      out, consider volunteering time or resources to help see it to fruition.
    </p>`
  })}

  <section${add_attribute("this", checklistIdeaTemplateNode, 0)}>${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => `<h2>${validate_component(Pencil, "PencilIcon").$$render($$result, {}, {}, {})} Checklist Idea Template</h2>

      <p>Please use the following template to compose your checklist idea.</p>

      <p>Note: the below editor allows you to enter text, but <strong class="${"svelte-yxmunn"}">your input will not be saved.</strong> You can either enter your campaign info here and paste into Reddit when finished, or paste
        the template into Reddit and edit there.
      </p>

      <p>The template is in Markdown, so be sure to toggle &quot;Markdown Mode&quot; in Reddit before pasting.
        If your input has a bunch of HTML name codes (like <code>${escape("&#x200B;")}</code>), you&#39;ve done
        it in the wrong order: delete your input, click &quot;Markdown Mode,&quot; and paste again. And
        finally, before you post, please use the &quot;Checklist Idea&quot; flair.
      </p>`
  })}

    ${validate_component(MarkdownEditor, "MarkdownEditor").$$render($$result, { initialValue: value }, {}, {})}

    <button class="${"primary svelte-yxmunn"}">Copy Input to Clipboard and Open Reddit</button></section>
</main>`;
});
export { Checklist_rfcs as default };
