<script lang="ts">
  import Card from './Card.svelte'
</script>

<div class="campaign-feed-empty-state">
  <Card>
    <div class="content">
      <h4>Nobody has participated yet.</h4>
      <p>You can be the first! Click "Campaign" above to see how to participate.</p>
    </div>
  </Card>
</div>

<style>
  .content {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  h4,
  p {
    text-align: center;
    color: var(--text-color-subdued);
  }
</style>
