<script lang="ts">
  import { fade } from 'svelte/transition'
  import InfoIcon from '../../components/iconography/Info.svelte'

  /**
   * STATE
   */

  let isShowingHelpText = false
</script>

<h4>
  Step 2: Upload A Photo Of Your Cancellation <button
    class="info-button"
    on:click={() => (isShowingHelpText = !isShowingHelpText)}><InfoIcon /></button
  >
</h4>

{#if isShowingHelpText}
  <div in:fade out:fade>
    <p>
      Take a screenshot, either of the page Amazon directs you to after cancelling your Prime
      membership, or of the email message Amazon sends you shortly thereafter to confirm.
    </p>

    <p>
      Your screenshot will likely display personally identifiable information like your name, so <strong
        >be sure to redact any personal information in your photo</strong
      > by blacking it out.
    </p>

    <div class="info">
      <h4>Why are we asking for proof?</h4>
      <p>
        Late-Stage is different from any other petition campaign in that it's used to prove to
        lawmakers and those that maintain the status-quo that we are fighting <strong
          >ourselves</strong
        > against the institutions they maintain.
      </p>

      <p>
        We also want the people in our community to feel the tangible impact. Proof of participation
        fuels the campaign's credibility, encourages the more hesitant to participate, and creates a
        sense of solidarity and real accomplishment.
      </p>

      <p>
        If we get enough cancellations, we're hoping to create <a
          href="https://mosaically.com"
          target="_blank"
          rel="noopener noreferrer">a mosaic</a
        > of all participants' cancellations as a message of mass dissent.
      </p>
    </div>
  </div>
{/if}

<style>
  .info {
    background-color: var(--card-background);
    padding: 16px;
    border-radius: var(--border-radius);
    position: relative;
    margin-bottom: 16px;
  }

  .info p {
    color: var(--text-color-subdued);
    font-weight: 400;
    font-size: 0.8rem;
  }

  .info p:last-of-type {
    margin-bottom: 0;
  }
</style>
