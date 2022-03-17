<script lang="ts">
  export let type: 'submit' | 'button' = 'button'
</script>

<button class="fab" {type} on:click on:mouseenter>
  <slot />
</button>

<style>
  button {
    padding-bottom: 2px;
    height: 40px;
    width: 40px;
    max-height: 40px;
    max-width: 40px;
    border-radius: 20px;
    background-color: var(--card-background);
    border: 2px solid var(--visualization-color);
    cursor: pointer;
    margin-bottom: 8px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.25s, outline 0.25s;
    transform: perspective(1000px) translateZ(0px);
    outline: 1px solid transparent;
    padding: 0;
  }

  button:hover {
    transition: transform 0.5s;
    transform: perspective(1000px) translateZ(40px);
  }

  :global(button.fab svg) {
    transition: transform 0.25s;
    fill: var(--text-color);
  }

  :global(button.fab:hover > svg) {
    transform: perspective(1000px) translateZ(40px);
    transition: transform 0.5s;
  }

  :global(.fab.disabled) {
    filter: grayscale(0.5);
    transition: filter 0.2s;
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
