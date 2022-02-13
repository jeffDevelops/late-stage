<script lang="ts">
  import Updoot from './iconography/Updoot.svelte'
  import Retweet from './iconography/Retweet.svelte'
  import Love from './iconography/Love.svelte'
  import Like from './iconography/Like.svelte'
  import Metrics from './iconography/Metrics.svelte'
  import Solidarity from './iconography/Solidarity.svelte'
  import Protest from './iconography/Protest.svelte'
  import Checkbox from './iconography/Checkbox.svelte'
  import { onMount } from 'svelte'

  const issues = [
    'wealth inequality',
    'climate change',
    'institutional racism',
    'human rights violations',
    'dark patterns',
  ]

  let interval: NodeJS.Timeout
  let currentIssue = issues[0]

  onMount(() => {
    interval = setInterval(() => {
      const newRandom = () => {
        const random = Math.floor(Math.random() * issues.length)
        if (issues[random] === currentIssue) {
          return newRandom()
        }

        return issues[random]
      }

      currentIssue = newRandom()
    }, 900)

    return () => {
      clearInterval(interval)
    }
  })
</script>

<section class="less-updooting">
  <div class="grid">
    <div class="less-container" style="grid-area: less;">
      <h1 class="spraypaint less">LeSS</h1>
      <div class="flex social-icons">
        <Updoot />
        <Retweet />
        <Love />
        <Like />
      </div>
    </div>
    <div class="issues-container" style="grid-area: issues;">
      <p>Late-Stage brings you the power of profound change to your fingertips.</p>
      <p>
        We work hard to bring you a checklist of all the simple things you can do today to take a
        stand against
      </p>

      <h2 class="issues">{currentIssue}</h2>
    </div>
    <div class="more-container" style="grid-area: more;">
      <h1 class="spraypaint more">MORE</h1>
      <div class="flex late-stage-icons">
        <Protest />
        <Checkbox />
        <Metrics />
        <Solidarity />
      </div>
    </div>
  </div>
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
    padding: 0 0 0 48px;
    overflow: hidden;
  }

  .grid {
    display: grid;
    height: 100%;
    width: 100%;
    max-width: 1200px;
    grid-template-columns: 2fr 2fr;
    grid-template-rows: minmax(0, 424px) minmax(0, auto);
    grid-template-areas:
      'less issues'
      'more more';
    gap: 24px;
  }

  .spraypaint {
    font-family: 'Spray Paint', var(--font-display);
    font-size: 20vw;
    text-transform: none;
    line-height: 0.8em;
    background: url('./brick-wall.jpg') center;
    background-size: cover;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: invert(0);
    transition: filter 0.2s;
    transform: skewY(3deg);
  }

  :global(.light-theme .spraypaint) {
    filter: invert(0.9);
    transition: filter 0.2s;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
  }

  .less-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .social-icons {
    width: 60%;
    max-width: 500px;
    padding-right: 2vw;
  }

  .less {
    width: auto;
    text-align: center;
  }

  :global(.less-updooting .social-icons svg) {
    width: 3vw;
    min-width: 24px;
  }

  :global(.less-updooting .retweet-icon) {
    width: 5vw !important;
  }

  .issues-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 550px;
    padding-right: 48px;
    margin-top: 24px;
  }

  .issues {
    font-weight: 900;
    color: var(--interactive-color);
    font-family: var(--font-sans);
    margin-bottom: 0;
  }

  .more-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    transform: translateY(-140px);
  }

  .more {
    width: 100%;
    text-align: center;
    font-size: 40vw;
    line-height: 0.78em;
  }

  .late-stage-icons {
    width: 100%;
    max-width: 70vw;
    margin-top: -40px;
  }

  :global(.less-updooting .late-stage-icons svg) {
    width: 2vw;
    min-width: 24px;
    height: auto;
  }

  :global(.less-updooting .protest-icon) {
    width: 16vw !important;
    margin-left: -6vw;
  }

  :global(.less-updooting .checkbox-icon) {
    width: 3vw !important;
  }

  :global(.less-updooting .metrics-icon) {
    width: 6vw !important;
  }

  :global(.less-updooting .solidarity-icon) {
    width: 20vw !important;
    margin-right: -6vw;
  }

  @media (min-width: 1400px) {
    .less {
      font-size: 18rem;
    }

    .more {
      font-size: 40rem;
    }

    .late-stage-icons {
      margin-top: -40px;
    }

    :global(.less-updooting .protest-icon) {
      width: 240px !important;
      margin-left: -100px;
    }

    :global(.less-updooting .checkbox-icon) {
      width: 80px !important;
    }

    :global(.less-updooting .metrics-icon) {
      width: 160px !important;
    }

    :global(.less-updooting .solidarity-icon) {
      width: 220px !important;
      margin-right: -60px;
    }
  }

  @media (max-width: 800px) {
    .grid {
      grid-template-columns: 1fr;
      grid-template-rows: minmax(0, 150px) minmax(0, 200px) minmax(0, auto);
      grid-template-areas:
        'less'
        'more'
        'issues';
    }

    .less-container {
      margin-top: 0;
    }

    .social-icons {
      max-width: 250px;
    }

    .issues-container {
      margin-top: 72px;
      padding: 0 32px;
      justify-content: flex-start;
    }

    .more-container {
      transform: translateY(-60px);
    }

    .late-stage-icons {
      height: 120px;
    }

    :global(.less-updooting .checkbox-icon) {
      width: 6vw !important;
      margin-left: -4vw;
    }

    :global(.less-updooting .metrics-icon) {
      width: 8vw !important;
      margin-right: -4vw;
    }

    .more {
      margin-left: 0;
      transform: translateY(0);
    }
  }

  @media screen and (min-width: 600px) and (max-width: 800px) {
    .issues-container {
      margin-top: 120px;
      max-width: calc(100% - 48px);
    }
  }

  @media screen and (max-width: 600px) {
    .issues-container {
      margin-top: 0px;
    }
  }
</style>
