<script lang="ts">
  import Card from '../components/Card.svelte'
  import Controls from '../components/Controls.svelte'
  import Shield from '../components/iconography/Shield.svelte'
  import PrivacyTip from '../components/iconography/PrivacyTip.svelte'
  import Crosshairs from '../components/iconography/Crosshairs.svelte'
  import VisibilityOff from '../components/iconography/VisibilityOff.svelte'
  import ChecklistIcon from '../components/iconography/Checklist.svelte'
  import EmailAddressStatus from '../components/EmailAddressStatus.svelte'
  import VPNStatus from '../components/VPNStatus.svelte'
</script>

<Controls />
<main class="personal-security">
  <h2><Shield /> Security, Privacy, and Anonymity</h2>

  <section class="grid">
    <div style="grid-area: left-row-1;">
      <Card>
        <h4><Crosshairs /> Late-Stage is a honeypot</h4>
        <p>
          Late-Stage doesn’t incite illegal activity, but we are realistic in recognizing that we're
          likely to make some enemies.
        </p>

        <p>
          In the event that it is compromised, protect yourself from being singled out by using an
          email and/or username that is not linked to any other personally identifying accounts.
        </p>
      </Card>
    </div>

    <div class="my-security-status" style="grid-area: right-column;">
      <Card>
        <h2><ChecklistIcon /> My Security Status</h2>

        <EmailAddressStatus />
        <VPNStatus />
      </Card>
    </div>

    <div style="grid-area: left-row-2;">
      <Card>
        <h4><PrivacyTip /> Do your part to protect yourself</h4>
        <p>
          We follow industry-standard best practices around encryption and user authentication, but
          much of security on the web falls on the shoulders of the individual.
        </p>

        <p>
          Take special care in following the recommendations on this page so that you don't get
          singled out in the event of a breach.
        </p>

        <p>
          Using private browsers, such as Brave or Firefox, and using private browsing windows is
          also highly recommended.
        </p>
      </Card>
    </div>

    <div style="grid-area: left-row-3;">
      <Card>
        <h4><VisibilityOff /> Privacy Policy</h4>

        <p>
          We will never ask for personally identifiable information, and please be extremely guarded
          in giving it out to anyone on the platform.
        </p>
        <p>
          While we do often require documents as artifacts of your activism, we will always ask that
          you redact <em>all</em> personally identifiable information, no matter how trivial it seems.
        </p>
      </Card>
    </div>
  </section>
</main>

<style>
  main {
    max-width: 1150px;
    width: calc(100% - 24px);
    margin: auto;
    padding: 72px 0;
  }

  .grid {
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-template-rows: minmax(0px, auto) minmax(0px, auto) minmax(0px, auto);
    grid-template-areas:
      'left-row-1 right-column'
      'left-row-2 right-column'
      'left-row-3 right-column';
    gap: 16px;
  }

  h4,
  h2 {
    line-height: 1.8em;
  }

  :global(.personal-security h2 svg) {
    fill: var(--interactive-color);
    height: 32px;
    width: 32px;
    margin-right: 8px;
    margin-bottom: -4px;
  }

  :global(.personal-security h4 svg) {
    fill: var(--interactive-color);
    height: 24px;
    width: 24px;
    margin-right: 8px;
    margin-bottom: -4px;
  }

  :global(.personal-security h4 svg.crosshairs) {
    fill: var(--interactive-color);
    height: 24px;
    width: 24px;
    margin-right: 8px;
    margin-bottom: 6px;
  }

  :global(.personal-security .card h2) {
    font-size: 1.25rem;
  }

  :global(.personal-security .card h2 svg) {
    font-size: 1.25rem;
    margin-bottom: -7px;
  }

  :global(.personal-security .success-svg svg) {
    fill: var(--success-color);
  }

  :global(.personal-security .my-security-status > .card) {
    border: 1px solid var(--interactive-color);
  }

  :global(.personal-security .my-security-status > .card .card) {
    margin-top: 16px;
  }

  :global(.personal-security .grid > div > .card) {
    height: 100%;
  }

  @media screen and (max-width: 800px) {
    .grid {
      grid-template-columns: 100%;
      grid-template-rows: repeat(3, minmax(204px, auto));
      grid-template-areas:
        'right-column'
        'left-row-1'
        'left-row-2'
        'left-row-3';
    }
  }
</style>
