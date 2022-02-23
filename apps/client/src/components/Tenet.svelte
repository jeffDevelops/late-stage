<p class="tenet">
  <slot />
</p>

<style>
  .tenet {
    border-radius: var(--border-radius);
    padding: 8px 16px 8px 32px;
    position: relative;
    margin-bottom: 0;
    line-height: 1.6em;
    letter-spacing: 0.015em;
    font-weight: 400;
    font-size: 14px;
  }

  .tenet:last-of-type {
    margin-bottom: 32px;
  }

  .tenet::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 16px;
    border-radius: 4px;
    height: calc(100% - 16px);
    width: 4px;
    z-index: 2;
    background-color: var(--interactive-color);
  }

  p {
    color: var(--text-color-subdued);
  }
</style>
