<a
  id="project-noir"
  href="https://www.projectnoircle.com/"
  class="resource-article"
  target="_blank"
  rel="noopener noreferrer"
>
  <article>
    <div class="logo">
      <slot name="logo" />
    </div>

    <div>
      <p><strong>Project Noir</strong></p>
      <p>
        In 2020, Cleveland was ranked the worst city in America for Black Women by
        CityLab/Bloomberg. Enlightened Solutions interviewed 450+ Black Women + Femmes in Northeast
        Ohio, to amplify their experiences in education, healthcare and workplaces.
      </p>
    </div>
  </article>
</a>

<style>
  a {
    width: calc(66% - 8px);
  }

  article {
    height: 164px;
    padding: 16px 24px;
    display: flex;
    border-radius: var(--border-radius);
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
    overflow: hidden;
    background-color: #679693;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    min-width: 60px;
  }

  :global(#project-noir.resource-article img) {
    height: auto !important;
    width: 60px !important;
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
  }

  @media screen and (max-width: 600px) {
    article {
      flex-direction: column;
      gap: 8px;
      padding-bottom: 16px;
      padding-left: 16px;
    }

    article .logo {
      align-self: flex-start;
    }

    article div {
      margin-top: 16px;
      width: 100%;
    }

    :global(#project-noir.resource-article img) {
      margin-left: 0;
    }
  }
</style>
