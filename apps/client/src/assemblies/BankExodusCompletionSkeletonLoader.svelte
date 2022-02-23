<script lang="ts">
  import Card from '../components/Card.svelte'
</script>

<div class="bank-campaign-skeleton-loader">
  <Card>
    <article>
      <div class="image-placeholder" />
      <div class="content-placeholder">
        <div class="overline" />
        <div class="headline" />
        <div class="text" />
        <div class="text text-1" />
      </div>
    </article>
  </Card>
</div>

<style>
  .bank-campaign-skeleton-loader {
    height: 160px;
    width: 100%;
    margin-top: 16px;
  }

  .bank-campaign-skeleton-loader :global(.card) {
    padding-left: 0;
    padding-top: 0;
    padding-bottom: 0;
    height: 100%;
    overflow: hidden;
  }

  article {
    display: flex;
    justify-content: flex-start;
    height: 100%;
  }

  @keyframes fade-in-out {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .image-placeholder {
    max-width: 320px;
    width: calc(50% - 24px);
    height: 100%;
    background-color: var(--input-background);
    animation: fade-in-out 1.5s infinite;
  }

  .content-placeholder {
    width: 60%;
    height: 100%;
    padding: 24px;
  }

  .overline {
    height: 16px;
    width: 20%;
    max-width: 240px;
    border-radius: var(--border-radius);
    background-color: var(--input-background);
    animation: fade-in-out 1.5s infinite;
    margin-bottom: 8px;
  }

  .headline {
    height: 32px;
    width: 70%;
    max-width: 600px;
    border-radius: var(--border-radius);
    background-color: var(--input-background);
    animation: fade-in-out 1.5s infinite;
  }

  .text {
    margin-top: 8px;
    height: 16px;
    width: 100%;
    max-width: 800px;
    border-radius: var(--border-radius);
    background-color: var(--input-background);
    animation: fade-in-out 1.5s infinite;
  }

  .text-1 {
    width: 90%;
    max-width: 700px;
  }
</style>
