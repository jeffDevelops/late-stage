<script lang="ts">
  export let type: 'submit' | 'button' = 'button'
</script>

<button {type} on:click on:mouseenter>
  <slot />
</button>

<style>
  button {
    height: 40px;
    width: 40px;
    max-height: 40px;
    max-width: 40px;
    border-radius: 20px;
    background-color: var(--card-background);
    border: 1px solid #55555522;
    cursor: pointer;
    margin-bottom: 8px;

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

  :global button > svg {
    transform: scale(1);
    transition: transform 0.25s;
  }

  :global(button:hover > svg) {
    transform: scale(1.05);
    transition: transform 0.5s;
  }
</style>
