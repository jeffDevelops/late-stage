<script lang="ts">
  import { LocalStorageKeys } from '../types/LocalStorageKeys'
  import ChecklistItem from '../components/ChecklistItem.svelte'
  import Controls from '../components/Controls.svelte'
  import Card from '../components/Card.svelte'
  import IdeaIcon from '../components/iconography/Idea.svelte'
  import InfoIcon from '../components/iconography/Info.svelte'
</script>

<Controls />

<main class="checklist">
  <section>
    <h1>Checklist</h1>
    <p>
      These are things you can do today to limit your participation in extractionist capitalism.
    </p>

    <ChecklistItem
      participationLink={`/campaigns/1`}
      checked={typeof window !== 'undefined' &&
        localStorage.getItem(LocalStorageKeys.HasCompletedBankChecklistItem) === 'true'}
    />
  </section>

  <div class="disclosure">
    <Card>
      <h4><InfoIcon /> That's it? It's not much of a checklist...</h4>
      <p>
        Development of the platform is a volunteer effort (what corporation is going to pay for
        something like this?), and development of new features takes time.
      </p>
    </Card>
  </div>

  <div class="disclosure">
    <Card>
      <h4><IdeaIcon /> Have an idea for the checklist?</h4>
      <p>
        We're looking to field ideas from passionate advocates and subject-matter experts like you.
        The roadmap for the platform consists of input from the r/latestage community on Reddit; the
        following template helps us nail down specifics for your idea and allows for easy posting on
        Reddit for the community to see:
      </p>

      <a href="/checklist-rfcs#checklist-idea-template">Checklist Idea Template</a>
    </Card>
  </div>
</main>

<style>
  main {
    max-width: 750px;
    width: 100%;
    margin: 0 auto;
  }

  .disclosure {
    margin-top: 16px;
  }

  :global(.checklist .checklist-item:last-of-type .card) {
    margin-bottom: 64px !important;
  }

  .disclosure *:not(a) {
    font-size: 90%;
    color: var(--text-color-subdued);
  }

  .disclosure p {
    font-weight: 300;
  }

  :global(.checklist .disclosure:last-of-type .card) {
    padding-bottom: 24px;
  }

  :global(.checklist .disclosure h4 svg) {
    fill: var(--interactive-color);
    margin-bottom: -6px;
    margin-right: 4px;
  }

  @media screen and (max-width: 600px) {
    h1 {
      font-size: 2rem;
    }

    .disclosure h4 {
      line-height: 1.6em;
    }

    :global(.checklist .disclosure h4 svg) {
      width: 18px;
      height: 18px;
      margin-bottom: -4px;
      margin-right: 2px;
    }
  }
</style>
