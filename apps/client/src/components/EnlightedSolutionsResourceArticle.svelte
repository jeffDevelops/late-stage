<a
  id="enlightened-solutions"
  href="https://enlightened-solutions.com"
  class="resource-article"
  target="_blank"
  rel="noopener noreferrer"
>
  <article>
    <div class="logo">
      <slot name="logo" />
    </div>

    <div>
      <p><strong>Enlightened Solutions</strong></p>
      <p>A workplace research, individual advocacy, and organizational change firm.</p>
    </div>
  </article>
</a>

<style>
  a {
    width: calc(34% - 8px);
    height: 100%;
    display: block;
  }

  article {
    height: 164px;
    padding: 16px 20px 16px 16px;
    display: flex;
    border-radius: var(--border-radius);
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    overflow: hidden;
    background-color: #5072a9;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    min-width: 48px;
  }

  :global(#enlightened-solutions.resource-article img) {
    height: auto !important;
    width: 48px !important;
    margin-top: 8px;
    margin-left: -8px;
  }

  p {
    color: #ffffff !important;
    margin-bottom: 8px;
  }

  a:hover {
    text-decoration: none !important;
  }

  a article {
    transition: transform 0.2s;
    transform: perspective(1000px) translateZ(0px);
  }

  a:hover article {
    transform: perspective(1000px) translateZ(10px);
    transition: transform 0.2s;
  }

  @media (max-width: 802px) {
    a {
      width: 100%;
    }

    article {
      height: auto;
    }

    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 76px;
      height: 76px;
      min-width: 76px;
    }

    :global(#enlightened-solutions.resource-article img) {
      height: auto !important;
      width: 76px !important;
      margin-top: 8px;
      margin-left: -8px;
    }
  }

  @media screen and (max-width: 600px) {
    article {
      flex-direction: column;
      gap: 8px;
      padding-bottom: 16px;
    }

    article .logo {
      align-self: flex-start;
      margin-left: -8px;
    }

    article div {
      margin-top: 16px;
      width: 100%;
    }

    article div {
      margin-top: 0px;
      width: 100%;
    }

    :global(#enlightened-solutions.resource-article img) {
      margin-left: 0;
      margin-top: 0;
    }
  }
</style>
