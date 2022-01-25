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
    background-color: var(--interactive-card-color);
    border: 1px solid #ff596455;
    cursor: pointer;
    margin-bottom: 8px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.25s, outline 0.25s;
    transform: scale(1);
    outline: 1px solid transparent;
  }

  button:focus {
    outline: 1px solid var(--interactive-color);
    transition: outline 0.5s;
  }

  button:hover {
    transform: scale(1.05);
    transition: transform 0.5s;
  }

  :global(button svg) {
    transform: scale(1);
    transition: transform 0.25s;
  }

  :global(button:hover > svg) {
    transform: scale(1.05);
    transition: transform 0.5s;
  }

  :global(.fab.disabled) {
    filter: grayscale(0.5);
    transition: filter 0.2s;
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
