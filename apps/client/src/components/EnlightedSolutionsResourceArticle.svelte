<a
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
  article {
    padding: 0px 24px;
    display: flex;
    border-radius: var(--border-radius);
    justify-content: flex-start;
    align-items: center;
    gap: 40px;
    overflow: hidden;
    background-color: #5072a9;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    min-width: 120px;
  }

  :global(.resource-article img) {
    height: auto !important;
    width: 120px !important;
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
      width: 100%;
    }
  }
</style>
