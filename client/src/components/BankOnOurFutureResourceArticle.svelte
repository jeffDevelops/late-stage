<a
  href="https://bankonourfuture.org/"
  class="resource-article"
  target="_blank"
  rel="noopener noreferrer"
>
  <article>
    <div class="logo">
      <slot name="logo" />
    </div>

    <div>
      <p><strong>WE CAN STOP THE WORLD'S BANKS FROM FUNDING CLIMATE CHANGE.</strong></p>
      <p>
        Redirecting the money that’s funding more coal, oil and gas is one of the most important
        ways we can stop the climate crisis.
      </p>
    </div>
  </article>
</a>

<style>
  article {
    padding: 16px 24px;
    display: flex;
    border-radius: var(--border-radius);
    justify-content: flex-start;
    align-items: center;
    gap: 64px;
    overflow: hidden;
    background-color: #a2e801;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    margin-left: 16px;
  }

  :global(.resource-article svg) {
    height: 120px !important;
    width: 120px !important;
  }

  :global(.resource-article .logo g) {
    height: 80px !important;
    width: 80px !important;
    fill: #060801 !important;
  }

  p {
    color: #060801 !important;
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
    }

    article .logo {
      align-self: flex-start;
      margin-left: 24px;
    }
  }
</style>
