<section>
  <!-- Variability in caps makes the spraypaint look organic -->
  <h1 class="spraypaint line-1">prOvE THE</h1>
  <h1 class="spraypaint line-2">MOVEmENT</h1>
</section>

<style>
  section {
    height: 100vh;
    width: 100vw;
    margin: 0 auto 0 -48px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .spraypaint {
    font-family: 'Spray Paint', var(--font-display);
    font-size: 20vw;
    text-transform: none;
    line-height: 0.8em;
    background: url('brick-wall.jpg') center;
    background-size: cover;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: invert(0);
    transition: filter 0.2s;
  }

  .line-1 {
    transform: skewY(3deg);
    padding-left: 2vw;
  }

  .line-2 {
    transform: translateY(-0.25em) skewY(3deg);
  }

  :global(.light-theme .spraypaint) {
    filter: invert(0.9);
    transition: filter 0.2s;
  }

  @media screen and (max-width: 600px) {
    section {
      margin: 0 auto 0 -24px;
    }
  }
</style>
