<script lang="ts">
  import Card from '../components/Card.svelte'
  import ThumbsUp from '../components/iconography/ThumbsUp.svelte'
  import ThumbsDown from '../components/iconography/ThumbsDown.svelte'
  import Spinner from './iconography/Spinner.svelte'

  import { ip } from '../stores/IP'

  /**
   * STATE
   */
  let notBrowsingWithVPN: null | boolean = null

  /**
   * REACTIVE
   */

  // If the poll detects a new IP, make the user confirm their location again
  $: if (typeof $ip === 'object' && $ip.browsingFromNewIP) {
    notBrowsingWithVPN = null
  }

  // Once the user has confirmed they're on VPN, we can stop asking them to confirm
  $: if (typeof $ip === 'object' && !$ip.browsingFromNewIP && $ip.didConfirmBrowsingWithVPN) {
    notBrowsingWithVPN = false
  }
</script>

<Card>
  <h4>
    {#if notBrowsingWithVPN === false}
      <span class="success-svg">
        <ThumbsUp />
      </span>
    {:else if $ip === 'LOADING'}
      <span class="loading-svg">
        <Spinner />
      </span>
    {:else}
      <ThumbsDown />
    {/if} VPN Status
  </h4>
  {#if notBrowsingWithVPN === false}
    <p class="info-text success-text">
      Thanks for confirming that you're browsing privately. You're good to go!
    </p>
    <p class="info-text">
      We'll keep looking for network changes, and notify you if anything changes.
    </p>
  {:else if typeof $ip === 'object' && notBrowsingWithVPN === null}
    <p class="info-text">
      We detected that you are browsing from a new IP address. Here's where we think you are:
    </p>
    <p class="info-text ip-info">
      <strong>IP</strong>: <span class="value">{typeof $ip === 'object' && $ip.ip}</span>
    </p>
    <p class="info-text ip-info">
      <strong>City</strong>:
      <span class="value">{typeof $ip === 'object' && $ip.geo.geoplugin_city}</span>
    </p>
    <p class="info-text ip-info">
      <strong>State / Region</strong>:
      <span class="value">{typeof $ip === 'object' && $ip.geo.geoplugin_region}</span>
    </p>
    <p class="info-text ip-info">
      <strong>Country Code</strong>:
      <span class="value">{typeof $ip === 'object' && $ip.geo.geoplugin_countryCode}</span>
    </p>
    <p class="info-text ip-info">
      <strong>Continent</strong>:
      <span class="value">{typeof $ip === 'object' && $ip.geo.geoplugin_continentName}</span>
    </p>

    <p class="info-text ip-info">
      <strong>Country Name</strong>:
      <span class="value">{typeof $ip === 'object' && $ip.geo.geoplugin_countryName}</span>
    </p>
    <p class="info-text ip-info">
      <strong>Latitude</strong>:
      <span class="value">{typeof $ip === 'object' && $ip.geo.geoplugin_latitude}</span>
    </p>
    <p class="info-text ip-info">
      <strong>Longitude</strong>:
      <span class="value">{typeof $ip === 'object' && $ip.geo.geoplugin_longitude}</span>
    </p>

    <div class="actions">
      <button
        type="button"
        class="primary success"
        on:click={() => {
          notBrowsingWithVPN = false
          ip.confirmIP()
        }}
      >
        Fooled you!</button
      >
      <button type="button" class="primary" on:click={() => (notBrowsingWithVPN = true)}
        >You got me!</button
      >
    </div>
  {:else if notBrowsingWithVPN}
    <p class="info-text">
      We'd highly recommend browsing this site behind a VPN, and we highly recommend getting behind
      a VPN before navigating to the site.
    </p>

    <p class="info-text error-text">
      While there are free VPNs out there, be wary of free options that log your data or fail to
      mask your IP.
    </p>

    <p class="info-text">Here are some options (not sponsored).</p>

    <p class="info-text">
      <strong>Free / cheaper options, compromising slower speeds:</strong>
    </p>
    <ul>
      <li>
        <ul>
          <li><a href="https://protonvpn.com/pricing">ProtonVPN</a></li>
        </ul>
      </li>
    </ul>
    <p class="info-text">
      <strong
        >Paid options (expect $11-13 / month, with additional deals for paying annually):</strong
      >
    </p>

    <ul>
      <li>
        <a target="_blank" rel="noopener noreferrer" href="https://nordvpn.com/pricing/">Nord VPN</a
        >
      </li>
      <li>
        <a target="_blank" rel="noopener noreferrer" href="https://www.expressvpn.com/order"
          >ExpressVPN</a
        >
      </li>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.cyberghostvpn.com/en_US/buy/cyberghost-vpn-4">Cyberghost VPN</a
        >
      </li>
    </ul>
  {/if}
</Card>

<style>
  .actions {
    margin-top: 16px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .actions button.primary {
    margin-bottom: 0;
  }

  .actions button {
    width: 100%;
  }

  .actions button:first-of-type {
    margin-bottom: 16px;
  }

  ul {
    margin-bottom: 16px;
  }

  .info-text.ip-info {
    margin-bottom: 2px;
  }

  .value {
    color: var(--interactive-color);
  }

  .success {
    background-color: var(--success-color);
    margin-bottom: 8px;
  }

  .info-text {
    margin-bottom: 16px;
    font-size: 0.9rem;
    color: var(--text-color-subdued);
  }

  .success-text {
    color: var(--success-color);
  }

  @media screen and (max-width: 800px) {
    .actions {
      flex-direction: row;
      justify-content: space-between;
    }

    .actions button {
      width: calc(50% - 8px);
    }

    .actions button.primary {
      margin-bottom: 0;
    }

    .actions button {
      min-width: 172px;
    }
  }

  @media screen and (max-width: 496px) {
    .actions {
      flex-direction: column;
    }
    .actions button {
      width: 100%;
    }
    .actions button:first-of-type {
      margin-bottom: 16px;
    }
  }
</style>
