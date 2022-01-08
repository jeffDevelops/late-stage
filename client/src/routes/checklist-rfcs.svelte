<script lang="ts">
  import { onMount } from 'svelte'
  import Controls from '../components/Controls.svelte'
  import Card from '../components/Card.svelte'
  import ChecklistIcon from '../components/iconography/Checklist.svelte'
  import OpenInNew from '../components/iconography/OpenInNew.svelte'
  import PencilIcon from '../components/iconography/Pencil.svelte'
  import MarkdownEditor from '../components/MarkdownEditor.svelte'
  import { checklistIdeaTemplate } from '../markdown-templates/checklist-idea-template'

  /**
   * STATE
   */
  let value: string = checklistIdeaTemplate

  let quickLinksNode: HTMLElement
  let checklistIdeaTemplateNode: HTMLElement
  let checklistIdeaTemplateScrollPosition

  /**
   * LIFECYCLE
   */

  const handleScroll = () => {
    if (!quickLinksNode || !checklistIdeaTemplateNode) return

    checklistIdeaTemplateScrollPosition = checklistIdeaTemplateNode.offsetTop

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
      top: checklistIdeaTemplateScrollPosition - quickLinksNode.getBoundingClientRect().height - 16,
    })
  }

  onMount(async () => {
    registerScrollEffect()

    if (window?.location.hash === '#checklist-idea-template') {
      console.log(window?.location.hash)
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

<Controls />

<main class="audit">
  <h1>RFC - Checklist</h1>

  <h4>What is an RFC?</h4>
  <p>
    Requests for comments (or RFCs) are a community-driven mechanism for drafting, implementing, and
    launching new checklist items.
  </p>

  <h4>What do you mean by "checklist item"?</h4>
  <p>
    The Late-Stage Checklist is a to-do list to help individuals mitigate their participation in
    extractionist capitalism.
  </p>

  <p>
    Checking an item off of your list is saved so that you can view your individual accomplishments,
    but it's also tallied on the petition dashboard, where you can see how your individual action
    has contributed to the greater good.
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

      <a href="#checklist-idea-template" on:click={scrollToChecklistItemIdeaTemplate}
        >Checklist Idea Template</a
      >
    </Card>
  </div>

  <Card>
    <h2 class="petition-heading"><ChecklistIcon /> I have a Checklist Idea!</h2>

    <p>Great! Take a moment to consider these things before submitting it:</p>

    <h4>Community Support</h4>

    <p>
      Is it an idea that the community will rally behind? What compromises must individuals be
      willing to make to check it off their list?
    </p>

    <p>
      Is it something that the average community member can perform? Does it alienate certain people
      from participation? How can we make its reach as widespread as possible?
    </p>

    <h4>Tangibility, provability, measurability</h4>

    <p>How can individuals prove that they have performed the action in your checklist item?</p>

    <p>
      Petition signatures don't work when our representation don't act with our best interest
      at-heart, so what is something tangible or observable that the Late-Stage platform can collect
      or record to indicate that your campaign was carried out <em>en masse</em>?
    </p>

    <p>
      Does your checklist item involve some level of compromise on the part of individual community
      members? It's critical that your idea has an element of provability not only to communicate
      tangible impact to elected officials, but also to assuage doubt amidst the community. If, for
      example, your checklist item involves cancelling your Amazon Prime subscription, perhaps the
      platform could collect participants' screenshots of the cancellation page. Having the platform
      create a paper trail in this way encourages others to make compromises like this too.
    </p>

    <h4>Feasibility and Logistics</h4>
    <p>
      Late-Stage is currently developed and maintained by a single developer. Please take the time
      to consider 1) how your checklist item might be implemented as simply as possible, and 2), how
      a compromise between your checklist item's provability and the man-hours to validate that
      provability might be achieved.
    </p>

    <p>
      If your idea carries considerable community support, but is logistically infeasible to carry
      out, consider volunteering time or resources to help see it to fruition.
    </p>
  </Card>

  <section bind:this={checklistIdeaTemplateNode}>
    <Card>
      <h2><PencilIcon /> Checklist Idea Template</h2>

      <p>Please use the following template to compose your checklist idea.</p>

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
        finally, before you post, please use the "Checklist Idea" flair.
      </p>
    </Card>

    <MarkdownEditor initialValue={value} on:change={(e) => (value = e.detail.value)} />

    <button on:click={handleClick} class="primary">Copy Input to Clipboard and Open Reddit</button>
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
