<script lang="ts">
  import { browser } from '$app/env'

  import CommunityBuiltArt from './iconography/CommunityBuilt.svelte'
</script>

<section class="community-built">
  <div class="container">
    <CommunityBuiltArt />

    <div class="alignment">
      <p>
        If you are an expert in <strong
          >sociology, economics, political science, law, campaign strategy, or if you are a
          passionate advocate</strong
        >, we need your insights to steer the development of this project..
      </p>
      <p>
        If you are an expert in <strong
          >project management, visual- or user experience design, marketing, copy editing, content
          strategy, software development, or web security</strong
        >, we need your help in distilling the needs of this community into project requirements for
        the development of campaigns that are actionable by the general public.
      </p>

      <div class="actions">
        <a target="_blank" rel="noopener noreferrer" href="https://www.reddit.com/r/latestage/"
          ><button class="secondary">I want to help build it</button></a
        >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://late-stage.notion.site/f8709ff5bbed4fcb9bda3d802fabdac0?v=86dd875520eb4384a8a01424da6ad666"
        >
          <button
            class="secondary"
            on:click={() =>
              browser &&
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })}>View Roadmap</button
          >
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .community-built {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .container {
    height: auto;
    width: 100%;
    max-width: 600px;
    margin-left: -56px;
  }

  .alignment {
    padding-left: 56px;
    margin-top: -80px;
  }

  :global(.community-built svg) {
    margin-bottom: 32px;
  }

  .actions {
    margin-top: 32px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media screen and (max-width: 600px) {
    .community-built {
      padding: 0;
      padding-left: 24px;
    }

    .container {
      width: 100%;
      margin-left: 0;
    }

    :global(.community-built svg) {
      width: 100%;
      margin-left: -32px;
    }

    .alignment {
      margin-top: -56px;
      padding-left: 0;
      padding-right: 24px;
    }

    .actions {
      flex-direction: column;
      align-items: flex-start;
    }

    .actions a,
    .actions a button,
    .actions button {
      width: 100%;
    }

    .actions button:first-of-type {
      margin-bottom: 8px;
    }
  }
</style>
