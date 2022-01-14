<div class="card">
  <slot />
</div>

<style>
  .card {
    background-color: var(--card-background);
    border-radius: var(--border-radius);
    padding: 24px 32px 16px;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
  }

  @media screen and (max-width: 600px) {
    .card {
      padding: 16px 24px 8px;
    }
  }
</style>
