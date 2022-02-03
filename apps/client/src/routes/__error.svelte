<script lang="ts">
  import DangerTriangle from '../components/iconography/DangerTriangle.svelte'
  import Card from '../components/Card.svelte'
</script>

<main class="error-page">
  <Card>
    <h2><DangerTriangle /> Something went wrong</h2>

    <p>Sorry about that!</p>
    <p>
      It's likely that we are already addressing this issue, but we might not know about it yet.
    </p>

    <p>
      The roadmap is governed by the <a href="https://www.reddit.com/r/latestage/">r/latestage</a> subreddit.
    </p>

    <p>
      If it seems your issue is new or unique, we encourage you to submit your issue to the
      subreddit via <a href="/audit#audit-report-template">this template</a> and we'll jump right on
      it.
    </p>
  </Card>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 24px);
    max-width: 750px;
    margin: 0 auto;
    height: calc(100vh - 160px);
  }

  :global(.error-page h2 svg) {
    fill: var(--error-color);
    width: 24px;
    height: 24px;
    margin-bottom: -2px;
    margin-right: 4px;
  }

  :global(.error-page .card) {
    width: 100%;
    background-color: var(--interactive-card-color);
  }
</style>
