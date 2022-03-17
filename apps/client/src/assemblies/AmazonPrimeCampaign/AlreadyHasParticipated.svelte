<script lang="ts">
  import Icon from '../../components/iconography/Solidarity.svelte'
</script>

<div class="already-has-participated">
  <Icon />
  <h4>Thank you for your solidarity!</h4>

  <p>You have already participated in this campaign.</p>
</div>

<style>
  .already-has-participated {
    margin: 56px auto;
    position: sticky;
    top: 72px;
  }

  .already-has-participated :global(svg) {
    height: 200px;
  }

  h4,
  p {
    text-align: center;
  }
</style>
