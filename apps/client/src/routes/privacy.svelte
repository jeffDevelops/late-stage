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
  <h2><Shield /> Privacy & Anonymity</h2>

  <section class="grid">
    <div style="grid-area: left-row-1;">
      <Card>
        <h4><Crosshairs /> Late-Stage is a honeypot</h4>
        <p>
          Late-Stage is realistic in recognizing that we're likely to make some enemies, which could
          make us a target for hackers or even government agencies in near-future administrations.
        </p>
        <p>
          If it is ever compromised,
          <strong
            >protect yourself from being singled out by using an email and/or username that is not
            linked to any other personally identifying accounts.</strong
          >
        </p>
      </Card>
    </div>

    <div class="my-security-status" style="grid-area: right-column;">
      <Card>
        <h2><ChecklistIcon /> My Privacy Status</h2>

        <EmailAddressStatus />
        <VPNStatus />

        <footer class="credits">
          <p>IP and Geolocation Detection Powered By:</p>

          <div class="flex">
            <a target="_blank" rel="noopener noreferrer" href="https://www.ipify.org/">ipify API</a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.geoplugin.com/"
              >geoPlugin</a
            >
          </div>
        </footer>
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
    max-width: 1000px;
    width: calc(100% - 48px);
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

  p {
    color: var(--text-color-subdued);
  }

  :global(.my-security-status > .card) {
    position: relative;
    padding-bottom: 72px;
    overflow: auto;
  }

  .credits {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    font-size: 0.8em;
    color: #999;
    width: 100%;
    padding: 16px;
    border-top: 1px solid var(--interactive-color);
    background-color: var(--card-background);
  }

  .credits .flex {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin: 0 auto;
  }

  .credits p {
    color: var(--text-color-subdued);
    font-size: 0.8rem;
    display: block;
    text-align: center;
    width: auto;
    margin: 0 auto 8px;
  }

  .credits a {
    display: block;
  }

  :global(.personal-security h2 svg) {
    fill: var(--interactive-color);
    height: 28px;
    width: 28px;
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
    font-size: 1.4rem;
  }

  :global(.personal-security .card h2 svg) {
    height: 24px;
    width: 24px;
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

  :global(.personal-security .my-security-status > .card .card:last-of-type) {
    margin-bottom: 16px;
  }

  :global(.personal-security .grid > div > .card) {
    height: 100%;
  }

  @media screen and (max-width: 800px) {
    h2 {
      font-size: 1.4rem !important;
    }
    main {
      width: 100%;
    }

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

  @media screen and (max-width: 600px) {
    h2 {
      font-size: 1.1rem !important;
    }
  }
</style>
