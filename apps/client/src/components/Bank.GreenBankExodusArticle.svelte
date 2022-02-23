<script lang="ts">
  import BankGreenLogo from '../components/iconography/Bank.Green.svelte'
</script>

<a href="https://bank.green" class="resource-article" target="_blank" rel="noopener noreferrer">
  <article>
    <div class="logo">
      <BankGreenLogo />
    </div>

    <div>
      <p>
        Bank.Green maintains an international list of the most reputable banks when it comes to
        their environmental impact. Use their interactive tool to make sure your new bank doesn't
        invest in fossil fuels.
      </p>
    </div>
  </article>
</a>

<style>
  article {
    margin: 8px 0 16px;
    padding: 16px 24px 8px 16px;
    display: flex;
    border-radius: var(--border-radius);
    justify-content: flex-start;
    align-items: center;
    gap: 24px;
    overflow: hidden;
    background-color: #2a3145;
  }

  article div p {
    font-size: 0.9rem;
    margin-bottom: 0;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
  }

  :global(.resource-article svg) {
    height: 120px !important;
    width: 120px !important;
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
