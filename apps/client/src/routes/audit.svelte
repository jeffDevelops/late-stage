<script lang="ts">
  import { onMount } from 'svelte'
  import Controls from '../components/Controls.svelte'
  import Card from '../components/Card.svelte'
  import MicroscopeIcon from '../components/iconography/Microscope.svelte'
  import GearIcon from '../components/iconography/Gear.svelte'
  import CodeIcon from '../components/iconography/Code.svelte'
  import OpenInNew from '../components/iconography/OpenInNew.svelte'
  import PencilIcon from '../components/iconography/Pencil.svelte'
  import MarkdownEditor from '../components/MarkdownEditor.svelte'
  import { auditReport } from '../markdown-templates/audit-report'

  /**
   * STATE
   */

  let value: string = auditReport

  /**
   * LIFECYCLE
   */

  let quickLinksNode: HTMLElement
  let auditReportTemplateSectionNode: HTMLElement
  let auditReportTemplateSectionScrollPosition

  const handleScroll = () => {
    if (!quickLinksNode || !auditReportTemplateSectionNode) return

    auditReportTemplateSectionScrollPosition = auditReportTemplateSectionNode.offsetTop

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

  const scrollToAuditReportTemplate = () => {
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

    if (window?.location.hash === '#audit-report-template') {
      scrollToAuditReportTemplate()
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
  <title>Late-Stage: Audit</title>
</svelte:head>

<Controls />

<main class="audit">
  <h1>Audit Late-Stage</h1>

  <p>
    In an effort to maintain a healthy long-term relationship between the platform, its underlying
    software, and its community members, we encourage audits from the points of view of any and
    every discipline.
  </p>

  <div bind:this={quickLinksNode} class="quick-links">
    <Card>
      <h2><OpenInNew /> Quick Links</h2>

      <a rel="noopener noreferrer" target="_blank" href="https://github.com/jeffDevelops/late-stage"
        >View Source Code on GitHub</a
      >

      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://late-stage.notion.site/f8709ff5bbed4fcb9bda3d802fabdac0?v=270e59108e974efa986277b4d1c64149"
      >
        Track Audit Fixes in the Roadmap (Use the "Audit Fixes" view at the top left)</a
      >

      <a href="#audit-report-template" on:click={scrollToAuditReportTemplate}>
        Audit Report Template</a
      >
    </Card>
  </div>

  <Card>
    <h2 class="petition-heading"><MicroscopeIcon /> Perform an audit</h2>

    <p>
      Until an audit mechanism has been implemented on the platform, please write up your audit on
      our subreddit <a
        href="https://www.reddit.com/r/latestage/"
        rel="noopener noreferrer"
        target="_blank">r/latestage</a
      >. We've made this process easier
      <a href="#audit-report-template" on:click={scrollToAuditReportTemplate}> below</a>.
    </p>

    <p>
      We need and encourage audits from the points of view of all disciplines. Here are a few lenses
      you might use for framing your audit:
    </p>

    <ul>
      <li>- Sociology</li>
      <li>- Economics</li>
      <li>- Environmental impact</li>
      <li>- Diversity and inclusion</li>
      <li>- Accessibility</li>
      <li>- Web Security</li>
      <li>- User Experience</li>
      <li>- Legal</li>
    </ul>
  </Card>

  <Card>
    <h2><GearIcon /> How it works</h2>

    <h4>Pre-release Audits</h4>
    <p>
      Until an audit mechanism is built into the platform, the developer will use Reddit to call for
      audits when a new feature is to be released to the general public. Pre-release audits
      generally carry more priority, especially when it comes to shipping new, time-sensitive
      campaigns.
    </p>

    <p>
      A staging version of the site will be made available to view by technical and non-technical
      auditors; here, you will be able to see and interact with the web app as it will function
      before it is released to the general public. You can use this opportunity to write an audit
      report about the new feature(s), and the developer will make a concerted effort to address any
      feedback prior to release (depending on its severity or time-sensitivity).
    </p>

    <h4>Ongoing Audits</h4>
    <p>
      Audits can be conducted at any time. When you open an audit report on Reddit, other Redditors
      are encouraged to discuss your request. Be prepared to flesh out what impacts and unintended
      consequences your request would have on society and our community, the logistics for carrying
      out your request on the part of the developer and the community, and potential alternatives.
    </p>

    <p>
      When consensus is reached by the community about your outstanding feedback, it will be added
      to the roadmap. Priority is at the discretion of the community and the developer, depending on
      other current development work.
    </p>
  </Card>

  <Card>
    <h2><CodeIcon />Technical Audits</h2>

    <p>
      You can view the code as it runs in production on the <code>main</code> branch in our
      <a href="https://github.com/jeffDevelops/late-stage">public repository</a>.
    </p>

    <p>
      Releases take the form of pull-requests against the <code>main</code> branch on GitHub. Comments
      and code review are encouraged.
    </p>

    <p>
      Your audit could take the form of an issue filed with repository, or an audit report on
      Reddit. Late-Stage reserves the right to publish your findings wherever appropriate in order
      to seek council on priority for the roadmap.
    </p>

    <p>Your audit might include feedback on:</p>

    <ul>
      <li>
        - Ethical dependency management: how can we reduce the use of code and infrastructure
        produced by big tech?
      </li>
      <li>- Web application security</li>
      <li>- Code review</li>
      <li>- User privacy</li>
      <li>- Performance</li>
    </ul>

    <h4>Technology Stack</h4>
    <ul>
      <li>- Frontend framework: SvelteKit (isomorphic)</li>
      <li>- Networking: GraphQL (with simple <code>fetch</code>)</li>
      <li>- Backend: Node.js, Prisma, <code>type-graphql</code></li>
      <li>- Database: PostgreSQL</li>
      <li>- Testing: <code>uvu</code>, Cypress</li>
      <li>- Infrastructure: render.com</li>
      <li>- DNS: Namecheap</li>
      <li>- Languages: TypeScript, GraphQL, CSS</li>
    </ul>
  </Card>

  <section bind:this={auditReportTemplateSectionNode}>
    <Card>
      <h2><PencilIcon /> Audit Report Template</h2>

      <p>
        Please use the following template to compose your audit report. Note: the below editor
        allows you to enter text, but <strong>your input will not be saved.</strong> You can either enter
        your report here, or paste the template into Reddit. Finally, please use the "Audit Report" flair
        before posting.
      </p>

      <p>
        Don't worry about using this if you plan on sharing on GitHub: the issue template already
        exists there.
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
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }

  :global(.audit .opaque .card) {
    transition: background-color 1s, box-shadow 1s, backdrop-filter 1s;
  }

  main {
    width: 100%;
    padding: 72px 48px 16px;
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

  button {
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    main {
      padding: 72px 0 16px;
    }

    :global(.audit .quick-links .card) {
      padding-left: 32px;
    }
  }
</style>
