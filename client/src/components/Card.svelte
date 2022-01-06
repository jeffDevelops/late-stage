<div class="card">
  <slot />
</div>

<style>
  .card {
    position: relative;
    background-color: var(--card-background);
    border-radius: var(--border-radius);
    padding: 24px 32px 16px;
    backdrop-filter: blur(3px);
  }
</style>
