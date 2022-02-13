<script lang="ts">
  import Card from '../components/Card.svelte'
  import Controls from '../components/Controls.svelte'

  import InfoIcon from '../components/iconography/Info.svelte'
  import TwitterIcon from '../components/iconography/Twitter.svelte'
  import TikTokIcon from '../components/iconography/Tiktok.svelte'
  import LinktreeIcon from '../components/iconography/Linktree.svelte'
  import RedditIcon from '../components/iconography/Reddit.svelte'
  import IdeaIcon from '../components/iconography/Idea.svelte'
  import EnlightenedSolutionsResourceArticle from '../components/EnlightedSolutionsResourceArticle.svelte'
  import ProjectNoirResourceArticle from '../components/ProjectNoirResourceArticle.svelte'
  import BankGreenResourceArticle from '../components/Bank.GreenResourceArticle.svelte'
  import BankGreenLogo from '../components/iconography/Bank.Green.svelte'
  import BankOnOurFutureLogo from '../components/iconography/BankOnOurFuture.svelte'
  import BOOFResourceArticle from '../components/BankOnOurFutureResourceArticle.svelte'
</script>

<Controls />
<main id="resources">
  <h1><InfoIcon /> Resources</h1>
  <p>
    We've compiled a list of resources to learn more about reducing your participation in extractive
    capitalism, insititutional racism, wealth inequality, and human rights violations.
  </p>

  <Card>
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <figure class="flex">
      <img
        src="https://pbs.twimg.com/profile_images/1481782157450395648/83T_viO2_400x400.jpg"
        alt="Michael Mezz's Profile Image"
      />

      <figcaption>
        <div>
          <h4>Michael Mezz</h4>

          <div class="social-container">
            <a href="https://twitter.com/michaelmezz"><TwitterIcon /></a>
            <a href="https://www.tiktok.com/@michael_mezz"><TikTokIcon /></a>
            <a href="https://linktr.ee/michaelmezz"><LinktreeIcon /></a>
          </div>
        </div>
      </figcaption>
    </figure>
    <p>
      Late-Stage was inspired by Michael's TikTok series "How to reduce your participation in
      extractive capitalism." Be sure to check out that series and follow for more ideas around
      building a better economy.
    </p>
  </Card>

  <Card>
    <h2>Individual Advocacy</h2>
    <p>
      By providing people with an interactive checklist, Late-Stage is an individual advocacy app
      that seeks to empower individuals by distilling activism into bite-sized units. Its checklist
      and campaigns are driven by expert research and analysis.
    </p>
    <ul>
      <li class="enlightened-solutions-group">
        <EnlightenedSolutionsResourceArticle>
          <div slot="logo">
            <img
              class="enlightened-solutions-logo"
              src="./images/EnlightenedSolutions.webp"
              alt="Enlightened Solutions Logo"
            />
          </div>
        </EnlightenedSolutionsResourceArticle>

        <ProjectNoirResourceArticle>
          <div slot="logo">
            <img
              class="enlightened-solutions-logo"
              src="./images/ESLogoForPNWebsite.webp"
              alt="Enlightened Solutions Project Noir Logo"
            />
          </div>
        </ProjectNoirResourceArticle>
      </li>
    </ul>
  </Card>

  <Card>
    <h2>Finding A Better Bank</h2>
    <h4>Environmental Impact</h4>
    <p>Learn more about how banks fund climate change, and which banks to avoid.</p>

    <ul>
      <li>
        <BankGreenResourceArticle>
          <div slot="logo">
            <BankGreenLogo />
          </div>
        </BankGreenResourceArticle>
      </li>
      <li>
        <BOOFResourceArticle>
          <div slot="logo">
            <BankOnOurFutureLogo />
          </div>
        </BOOFResourceArticle>
      </li>
      <li>
        <a target="_blank}" rel="noopener noreferrer" href="https://www.carbonbubble.net/">
          Report: The Global Emissions of the US Financial Sector</a
        >
      </li>
    </ul>
  </Card>

  <Card>
    <h2>The Great Resignation</h2>
    <p>
      Find solidarity and comaraderie in navigating the late-stage workplace with the following
      communities:
    </p>
    <ul>
      <li>
        <a target="_blank" rel="noopener noreferrer" href="https://www.reddit.com/r/antiwork/"
          ><RedditIcon /> r/antiwork</a
        >
      </li>
      <li>
        <a target="_blank" rel="noopener noreferrer" href="https://www.reddit.com/r/recruitinghell/"
          ><RedditIcon /> r/recruitinghell</a
        >
      </li>
    </ul>
  </Card>

  <Card>
    <h4><IdeaIcon /> I know of a good resource to feature here!</h4>
    <p>
      Would you like to be featured here? Ideas for the platform are sourced and vetted by the
      community on Reddit.
    </p>

    <a href="https://www.reddit.com/r/latestage/">r/latestage</a>
  </Card>
</main>

<style>
  main {
    margin: 0 auto 0 auto;
    padding: 0 0 24px 0;
    width: 100%;
    max-width: 800px;
  }

  :global(#resources h1 svg) {
    fill: var(--interactive-color);
    height: 32px;
    width: 32px;
    margin-left: 8px;
  }

  .flex {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 24px;
  }

  figure {
    margin: 0 0 24px;
    max-width: 300px;
  }

  figcaption {
    max-width: 400px;
    justify-content: center;
  }

  figcaption h4 {
    text-align: center;
  }

  .social-container {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 4px;
    margin-left: -8px;
  }

  img {
    border-radius: var(--border-radius);
    height: 100px;
    width: 100px;
  }

  h4 {
    margin-bottom: 16px;
  }

  :global(#resources .card:not(:first-of-type)) {
    margin-top: 16px;
  }

  :global(#resources .card h4) {
    line-height: 1.7em;
  }

  :global(#resources .card p) {
    color: var(--text-color-subdued);
    font-size: 0.8rem;
  }

  :global(#resources .card p:last-child) {
    margin-bottom: 0;
  }

  :global(#resources a svg, #resources .card h4 svg) {
    fill: var(--interactive-color);
    height: 23px;
    width: 23px;
    margin-bottom: -6px;
  }

  :global(#resources a:focus-visible) {
    text-decoration: none;
  }

  li {
    display: flex;
    justify-content: flex-start;
    gap: 16px;
  }

  li:not(:last-of-type) {
    margin-bottom: 16px;
  }

  .enlightened-solutions-logo {
    height: auto;
  }

  @media (max-width: 802px) {
    .enlightened-solutions-group {
      flex-direction: column;
    }
  }

  @media screen and (max-width: 600px) {
    main {
      padding-top: 72px;
    }
  }
</style>
