<script lang="ts">
  import { onMount } from 'svelte'
  import Controls from '../components/Controls.svelte'
  import Card from '../components/Card.svelte'
  import CampaignIcon from '../components/iconography/Campaign.svelte'
  import OpenInNew from '../components/iconography/OpenInNew.svelte'
  import PencilIcon from '../components/iconography/Pencil.svelte'
  import MarkdownEditor from '../components/MarkdownEditor.svelte'
  import { campaignIdeaTemplate } from '../markdown-templates/campaign-idea-template'

  /**
   * STATE
   */

  let value: string = campaignIdeaTemplate

  /**
   * LIFECYCLE
   */

  let quickLinksNode: HTMLElement
  let campaignIdeaTemplateNode: HTMLElement
  let auditReportTemplateSectionScrollPosition

  const handleScroll = () => {
    if (!quickLinksNode || !campaignIdeaTemplate) return

    auditReportTemplateSectionScrollPosition = campaignIdeaTemplateNode.offsetTop

    if (quickLinksNode.getBoundingClientRect().top === 0) {
      quickLinksNode.classList.add('opaque')
    } else {
      quickLinksNode.classList.remove('opaque')
    }
  }

  const registerScrollEffect = () => {
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
  }

  const scrollToChecklistItemIdeaTemplate = () => {
    window.scrollTo({
      behavior: 'smooth',
      top:
        auditReportTemplateSectionScrollPosition -
        quickLinksNode.getBoundingClientRect().height -
        16,
    })
  }

  onMount(async () => {
    registerScrollEffect()

    if (window?.location.hash === '#campaign-idea-template') {
      scrollToChecklistItemIdeaTemplate()
    }

    if (typeof window === 'undefined') return

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  })

  /**
   * METHODS
   */

  const handleClick = async () => {
    await navigator.clipboard.writeText(value)

    window.open('https://www.reddit.com/r/latestage/submit', '_blank')
  }
</script>

<svelte:head>
  <title>Late-Stage: Campaign RFC</title>
</svelte:head>

<Controls />

<main class="audit">
  <h1>RFC - Campaigns</h1>

  <h4>What is an RFC?</h4>
  <p>
    Requests for comments (or RFCs) are a community-driven mechanism for drafting, implementing, and
    launching new campaigns.
  </p>

  <h4>What do you mean by "campaign"?</h4>
  <p>
    While Late-Stage is biased toward action in everything it does, campaigns are intended to focus
    community action on exigent initiatives to drive profound, short-term impact.
  </p>

  <div bind:this={quickLinksNode} class="quick-links">
    <Card>
      <h2><OpenInNew /> Quick Links</h2>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://late-stage.notion.site/f8709ff5bbed4fcb9bda3d802fabdac0?v=86dd875520eb4384a8a01424da6ad666"
      >
        Roadmap</a
      >

      <a href="#campaign-idea-template" on:click={scrollToChecklistItemIdeaTemplate}
        >Campaign Idea Template</a
      >
    </Card>
  </div>

  <Card>
    <h2 class="petition-heading"><CampaignIcon /> I have a Campaign Idea!</h2>

    <p>We're excited to hear it! There are few things to consider before we take it on:</p>

    <h4>Focused, Time-Bound Impact</h4>
    <p>
      What is the desired end-state of the campaign? What impact will it have? What are the
      advantages of focusing the community on the actions in your campaign within a designated
      window of time, as opposed to simply adding it to the Late-Stage checklist? What are potential
      unintended consequences for concentrating community activity on your campaign?
    </p>

    <h4>Community Support</h4>
    <p>
      Is it an idea that the community rallies behind? What compromises must individuals be willing
      to make to carry out your campaign?
    </p>

    <p>
      Is it something that the average community member can perform? Does it alienate certain people
      from participation? How can we make its reach as widespread as possible?
    </p>

    <h4>Tangibility, provability, measurability</h4>

    <p>
      How can individuals prove that they have performed the action detailed in your campaign? What
      is the simplest, least resource-intensive way to prove that someone participated?
    </p>

    <p>
      Petition signatures don't work when our representation don't act with our best interest
      at-heart, so what is something tangible or observable that the Late-Stage platform can collect
      or record to indicate that your campaign was carried out <em>en masse</em>?
    </p>

    <p>
      Does your campaign involve some level of compromise on the part of individual community
      members? It's critical that your campaign has an element of provability not only to
      communicate tangible impact to elected officials, but also to assuage doubt in the campaign
      amidst the community. If, for example, your campaign involves a general strike, perhaps the
      platform could collect a copy of a strike notice or correspondence with management about the
      terms of a strike. Having the platform create a paper trail in this way encourages others to
      take the leap too.
    </p>

    <h4>How does it fit in the ecosystem?</h4>
    <p>
      Late-Stage wants to make it as easy as possible for individuals to subvert extractionism and
      it does so by distilling actions community members can take into bite-sized to-dos on our
      checklist. Ideally, campaigns are intended to focus the community at large on checking an item
      off their list.
    </p>
    <p>
      The checklist introduces healthy competition within the community to check as many to-dos off
      the list as possible, and provides a sense of individual accomplishment to complement
      collective accomplishments on the petition dashboard.
    </p>

    <h4>Feasibility and Logistics</h4>
    <p>
      Late-Stage is currently developed and maintained by a single developer. Please take the time
      to consider 1) how your campaign might be implemented as simply as possible, and 2), how a
      compromise between your campaign's provability and the man-hours to validate that provability
      might be achieved.
    </p>

    <p>
      If your idea is time-sensitive and carries considerable community support, but is logistically
      infeasible to carry out in the allotted timeframe, consider volunteering time or resources to
      help see it to fruition.
    </p>
  </Card>

  <section bind:this={campaignIdeaTemplateNode}>
    <Card>
      <h2><PencilIcon /> Campaign Idea Template</h2>

      <p>Please use the following template to compose your campaign idea.</p>

      <p>
        Note: the below editor allows you to enter text, but <strong
          >your input will not be saved.</strong
        > You can either enter your campaign info here and paste into Reddit when finished, or paste
        the template into Reddit and edit there.
      </p>

      <p>
        The template is in Markdown, so be sure to toggle "Markdown Mode" in Reddit before pasting.
        If your input has a bunch of HTML name codes (like <code>{'&#x200B;'}</code>), you've done
        it in the wrong order: delete your input, click "Markdown Mode," and paste again. And
        finally, before you post, please use the "Campaign Idea" flair.
      </p>
    </Card>

    <MarkdownEditor initialValue={value} on:change={(e) => (value = e.detail.value)} />

    <button on:click={handleClick} class="primary">Copy To Clipboard and Open Reddit</button>
  </section>
</main>

<style>
  :global(.audit .opaque .card) {
    transition: background-color 1s, box-shadow 1s, backdrop-filter 1s;
    border-top-right-radius: 0 !important;
    border-top-left-radius: 0 !important;
    box-shadow: 0px 2px 10px 6px rgba(10, 10, 10, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  :global(.audit .opaque .card) {
    transition: background-color 1s, box-shadow 1s, backdrop-filter 1s;
  }

  main {
    width: 100%;
    padding: 0 48px 16px;
    margin: 0 auto;
    max-width: 750px;
  }

  :global(.audit h2 svg) {
    fill: var(--interactive-color);
    margin-bottom: -3px;
  }

  :global(.audit .card:not(:first-of-type), .audit section) {
    margin-top: 16px;
  }

  :global(.audit .code-icon) {
    margin-right: 8px;
  }

  h4 {
    margin-top: 24px;
  }

  .quick-links {
    position: sticky;
    top: 0px;
    z-index: 5;
  }

  .quick-links a {
    display: block;
    margin-bottom: 8px;
  }

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }

  button {
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    main {
      padding: 0 0 16px;
    }
  }
</style>
