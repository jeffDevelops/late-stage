<a href="https://bank.green" class="resource-article" target="_blank" rel="noopener noreferrer">
  <article>
    <div class="logo">
      <slot name="logo" />
    </div>

    <div>
      <p><strong>Is your money being used to fund climate chaos?</strong></p>
      <p>
        Bank.Green is sounding the alarm on the climate-destroying activities of banks while
        recommending sustainable alternatives and empowering consumer action.
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
    background-color: #2a3145;
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
    }

    article .logo {
      align-self: flex-start;
      margin-left: 24px;
      margin-top: -16px;
      margin-bottom: -16px;
    }
  }
</style>
