<div class="card">
  <slot />
</div>

<style>
  .card {
    background-color: var(--card-background);
    border-radius: var(--border-radius);
    padding: 24px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  @media screen and (max-width: 600px) {
    .card {
      padding: 16px;
    }
  }
</style>
