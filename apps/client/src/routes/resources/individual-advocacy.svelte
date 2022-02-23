<script lang="ts">
  import Card from '../../components/Card.svelte'
  import Controls from '../../components/Controls.svelte'
  import InfoIcon from '../../components/iconography/Info.svelte'
  import IdeaIcon from '../../components/iconography/Idea.svelte'

  import EnlightenedSolutionsResourceArticle from '../../components/EnlightedSolutionsResourceArticle.svelte'
  import ProjectNoirResourceArticle from '../../components/ProjectNoirResourceArticle.svelte'
</script>

<Controls />
<main id="resources">
  <h2><InfoIcon /> Individual Advocacy</h2>

  <p>
    Individual advocacy is all about empowering individuals to exercise their rights. You can do
    that by giving them the tools they need to voice concerns, access information needed to be
    successful, and identify available support options to help them resolve issues effectively.
  </p>

  <p>
    Late-Stage takes part by distilling activism into bite-sized units. Here are some more resources
    to learn more.
  </p>

  <Card>
    <h2>Enlightened Solutions</h2>
    <h4>Research &amp; Organizational Change</h4>
    <p>
      In January, 2022, Enlightened Solutions conducted <a
        href="https://www.surveymonkey.com/stories/SM-GCPXQBHQ/">this research study</a
      > on r/antiwork and similar Subreddits. There was overwhelming support for boycotts, unionization,
      and solidarity pledges, as well as middling support for debt striking and walkouts. Late-Stage
      seeks to build trust within the community by making individuals prove their solidarity in these
      activities so that we can empower individuals to participate in riskier, but more impactful intiatives.
    </p>
    <ul>
      <li class="enlightened-solutions-group">
        <EnlightenedSolutionsResourceArticle>
          <div slot="logo">
            <img
              class="enlightened-solutions-logo"
              src="../images/EnlightenedSolutions.webp"
              alt="Enlightened Solutions Logo"
            />
          </div>
        </EnlightenedSolutionsResourceArticle>

        <ProjectNoirResourceArticle>
          <div slot="logo">
            <img
              class="enlightened-solutions-logo"
              src="../images/ESLogoForPNWebsite.webp"
              alt="Enlightened Solutions Project Noir Logo"
            />
          </div>
        </ProjectNoirResourceArticle>
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
    padding: 72px 0 24px 0;
    width: 100%;
    max-width: 800px;
  }

  :global(#resources h2 svg) {
    fill: var(--interactive-color);
    height: 24px;
    width: 24px;
    margin-right: 8px;
  }

  img {
    border-radius: var(--border-radius);
    height: 100px;
    width: 100px;
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
