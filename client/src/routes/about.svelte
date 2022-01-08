<script lang="ts">
  import Controls from '../components/Controls.svelte'
  import Card from '../components/Card.svelte'
  import PetitionIcon from '../components/iconography/Petition.svelte'
  import ChecklistIcon from '../components/iconography/Checklist.svelte'
</script>

<Controls />

<main>
  <section class="about">
    <h1>What is Late-Stage?</h1>

    <p>
      Late-Stage is an advocacy platform that strives to shed light on opportunities to eradicate
      extractionist patterns in our society.
    </p>

    <Card>
      <h2 class="petition-heading"><PetitionIcon /> A Living Petition</h2>

      <p>
        We aim to quantify "putting our money where our mouth is" to demonstrate to lawmakers that
        we reject the many institutionalized dark patterns built to extract money from the working
        class.
      </p>

      <p>
        Government has bipartisanly demonstrated that they do not vote with their constituents in
        mind, so rather than hand them a petition with simple ink signatures, Late-Stage's petition
        serves as a public record of acts already fulfilled to meaningfully denounce the system they
        uphold.
      </p>
    </Card>

    <Card>
      <h2 class="checklist-heading"><ChecklistIcon /> A Personal Checklist</h2>

      <p>
        Late-Stage curates a checklist to help navigate our late-stage capitalist society in order
        to identify opportunities to reject and combat extractionism.
      </p>

      <p>
        When you check items off your list, your personal accomplishment is tallied as part of the
        petition dashboard. Your own personal impact lives in solidarity with that of all other
        petitioners, as a collective receipt of actioned denouncement.
      </p>
    </Card>
  </section>

  <section>
    <h1>Team</h1>

    <article>
      <img src="Jeff.jpeg" alt="Portrait of Jeff Reynolds" />

      <Card>
        <h3>Jeff Reynolds</h3>
        <h4>UX Designer, Developer</h4>

        <p>
          I'm hoping to foster a community interested in making a difference for the people that
          create the value in our society.
        </p>

        <p>
          Like many, I am extremely frustrated by our representation's blatant disregard for their
          constituents. They've proven inept to respresent us, so it's time to take matters into our
          own hands.
        </p>

        <p>
          I can't do it alone! My expertise is primarily technical, and so I'm building a platform
          of requests for comment (RFCs) in hopes of informing a direction for the platform by
          passionate people more specialized in disciplines with more direct investment in
          socioeconomic change.
        </p>

        <p>
          This is my full-time endeavor. If you would like to contribute money to the project, you
          can <a href="https://buymeacoffee.com/latestage.jeff">buy me a coffee</a>. This gives me
          the runway I need to continue working on the project, and pays for server and database
          costs, image hosting, and moderation man-hours.
        </p>
      </Card>
    </article>
  </section>
</main>

<style>
  section {
    margin: 0 auto;
    padding: 0 0 24px;
    width: 100%;
    max-width: 750px;
  }

  section:first-of-type {
    padding-top: 40px;
  }

  :global(.petition-heading svg, .checklist-heading svg) {
    height: 30px;
    width: 30px;
    fill: var(--interactive-color);
    margin-bottom: -6px;
  }

  :global(.about .card:not(:last-of-type)) {
    margin-bottom: 16px;
  }

  img {
    align-self: flex-start;
    width: 180px;
    height: 180px;
    border-radius: var(--border-radius);
  }

  article {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  article h3 {
    margin-bottom: 8px;
  }

  article section p:last-of-type {
    margin: 0;
  }

  @media screen and (max-width: 600px) {
    main {
      padding: 0 0 16px;
    }

    img {
      width: 80px;
      height: 80px;
    }
  }
</style>
