<script lang="ts">
  import { onMount } from 'svelte'
  import dayjs from 'dayjs'

  export let startDate: string
  export let endDate: string
  export let id: string

  let container: HTMLElement

  onMount(() => {
    const setSandFullness = (percent: number) => {
      if (typeof document === 'undefined') return
      ;(document.querySelector(`#${id} .sand.top`) as HTMLElement).style.height = `${percent}%`
      ;(document.querySelector(`#${id} .sand.bottom`) as HTMLElement).style.height = `${
        100 - percent
      }%`
    }

    setTimeout(() => {
      container.classList.add('ready')

      setSandFullness(
        (dayjs(endDate).diff(dayjs(), 'day') / dayjs(endDate).diff(dayjs(startDate), 'day')) * 100,
      )
    }, 2000)
  })
</script>

<div {id}>
  <div id="hourglass" bind:this={container} class="ready">
    <div class="glass">
      <div class="sand top" />
    </div>
    <div class="glass bottom">
      <div class="sand bottom" />
    </div>
  </div>
</div>

<style>
  :root {
    --sandColor: var(--interactive-color);
    --glassColor: var(--visualization-color);
    --hourglassSize: 4.25rem;
  }

  #hourglass {
    display: inline-block;
    transition-property: transform;
    transition-duration: 700ms;
    transition-timing-function: ease;
  }

  .glass {
    z-index: 1;
    position: relative;
    background-color: var(--glassColor);
    clip-path: polygon(0 0, 100% 0, 50% 100%);
    height: var(--hourglassSize);
    width: calc(var(--hourglassSize) * 1.5);
    bottom: -0.2em;
    overflow: hidden;
    border-top-left-radius: 20% 100%;
    border-top-right-radius: 20% 100%;
    margin: 0 auto;
  }

  .top {
    z-index: 2;
  }

  .glass.bottom {
    z-index: 0;
    top: -0.2em;
    clip-path: polygon(50% 0, 100% 100%, 0 100%);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 20% 100%;
    border-bottom-right-radius: 20% 100%;
  }

  .sand.top:after {
    position: absolute;
    content: '';
    width: 100%;
    top: -20px;
    height: 20px;
    border-bottom-left-radius: 50% 70%;
    border-bottom-right-radius: 50% 70%;
    background-color: transparent;
    box-shadow: 0 10px 0 var(--sandColor);
  }

  .sand {
    position: absolute;
    background-color: var(--sandColor);
    min-width: 100%;
    height: 100%;
    bottom: 0;
  }

  #hourglass.ready .sand {
    transition-property: height;
    transition-timing-function: ease-out;
    transition-duration: 200ms;
  }

  .glass.bottom .sand {
    height: 0;
    border-top-left-radius: 50% 100%;
    border-top-right-radius: 50% 100%;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    transition-timing-function: ease-in;
  }

  .glass.bottom:before {
    position: absolute;
    content: '';
    background-color: var(--sandColor);
    height: 98%;
    width: 3px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
  }

  @keyframes kfSandStream {
    0% {
      height: 0;
      transform: rotate(10deg);
    }
    10% {
      height: 100%;
      top: 0;
      transform: rotate(-15deg);
    }
    95% {
      height: 100%;
      top: 0;
    }
    100% {
      height: 0;
      top: 100%;
    }
  }

  @keyframes kfSand {
    0% {
      border-top-left-radius: 20% 20%;
      border-top-right-radius: 20% 20%;
    }
    50% {
      border-top-left-radius: 50% 40%;
      border-top-right-radius: 50% 40%;
    }
  }
</style>
