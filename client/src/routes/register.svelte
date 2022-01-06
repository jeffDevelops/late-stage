<script lang="ts">
  import { onDestroy } from 'svelte'
  import { fade } from 'svelte/transition'
  import { env } from '../networking/env'
  import Card from '../components/Card.svelte'
  import DangerTriangle from '../components/iconography/DangerTriangle.svelte'
  import InfoIcon from '../components/iconography/Info.svelte'
  import Controls from '../components/Controls.svelte'

  /**
   * LIFECYCLE
   */

  let usernameInputNode: HTMLInputElement
  let emailInputNode: HTMLInputElement

  onDestroy(() => {
    if (usernameInputNode) usernameInputNode.value = ''
    if (emailInputNode) emailInputNode.value = ''
  })

  /**
   * STATE
   */

  let username = ''
  let usernameUniquenessCheckLoading = false

  let email = ''
  let emailUniquenessCheckLoading = false

  let password = ''
  let passwordIsMasked = true

  let errors = {
    username: '',
    email: '',
    password: '',

    form: '',
  }

  let didAttemptSubmit = false

  /**
   * REACTIVE
   */

  // Username
  $: {
    errors = (() => {
      if (!username) {
        errors.username = 'Username is required'
        return errors
      }

      if (username.length < 2) {
        errors.username = 'Username must be at least 2 characters'
        return errors
      }

      if (!username.match(/^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)) {
        errors.username =
          'Username must be alphanumeric. Periods and underscores may only be used as separators.'
        return errors
      }

      errors.username = ''
      return errors
    })()
  }

  $: {
    errors = (() => {
      if (!email) {
        errors.email = 'Email address is required'
        return errors
      }

      if (
        !email.match(
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        )
      ) {
        errors.email = 'Email address invalid'
        return errors
      }

      errors.email = ''
      return errors
    })()
  }

  $: {
    errors = (() => {
      if (!password) {
        errors.password = 'Password is required'
        return errors
      }

      if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters in length'
        return errors
      }

      errors.password = ''
      return errors
    })()
  }

  /**
   * METHODS
   */

  const handleSubmit = async () => {
    didAttemptSubmit = true
    const formContainsErrors = Object.values(errors).some((value) => !!value)

    // Prevent submission if there are any errors
    if (formContainsErrors) return

    // TODO:
  }

  const handleUsernameInput = async () => {
    usernameUniquenessCheckLoading = true
    const result = await fetch(`${env.sveltekitUrl}/api/users-where` /* TODO: */)
  }

  const handleEmailInput = async () => {
    emailUniquenessCheckLoading = true
    const result = await fetch(`${env.sveltekitUrl}/api/users-where` /* TODO: */)
  }
</script>

<Controls />

<main class="register">
  <h1>Register</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <label for="register-username"
      >Username <span
        class="tooltip-container"
        title="Your username is used to identify you when you participate in audits and RFCs."
        ><InfoIcon /></span
      ></label
    >
    <input id="register-username" bind:this={usernameInputNode} on:input={handleUsernameInput} />
    {#if errors.username && didAttemptSubmit}
      <p in:fade out:fade class="error">{errors.username}</p>
    {/if}

    <label for="register-email"
      >Email <span
        class="tooltip-container"
        title="Your email is used to recover your account if your forget your password. If you opt in, you can receive emails about new campaigns, new ways to subvert extractionism, and notifications about your RFCs and audits."
        ><InfoIcon /></span
      ></label
    >
    <input id="register-email" bind:this={emailInputNode} on:input={handleEmailInput} />
    {#if errors.email && didAttemptSubmit}
      <p in:fade out:fade class="error">{errors.email}</p>
    {/if}

    <label for="register-password"
      >Password <span
        class="tooltip-container"
        title="Your password is hashed prior to storage, making it realistically improbable to retrieve if the system is hacked (feel free to audit the code for peace of mind). In general: use a password manager and don't reuse passwords."
        ><InfoIcon /></span
      ></label
    >
    <input type="password" id="register-password" bind:value={password} />
    {#if errors.password && didAttemptSubmit}
      <p in:fade out:fade class="error">{errors.password}</p>
    {/if}

    <div class="actions">
      <a href="/log-in">Already a member? Log In</a>
      <button type="submit" class="primary">Register</button>
    </div>
  </form>

  <Card>
    <h3><DangerTriangle /> You might not need to register!</h3>
    <p>We recognize that you may prefer to operate anonymously on Late-Stage.</p>

    <p>
      Formally signing up is not required for basic uses of the platform, but due to technical
      constraints, anonymous activity can only be saved in the browser context.
    </p>

    <p>
      This means that any action you might expect the webpage to save on your behalf will only
      persist in this browser, on this device, for as long as your cache isn't cleared. If you
      choose to go anonymous, your progress will be lost when you clear your cache!
    </p>

    <p>
      Registering with an email address allows you to more reliably save your data, log in on other
      devices and browsers, and allows you to participate in RFCs and audits.
    </p>
  </Card>
</main>

<style>
  main {
    width: 100%;
    max-width: 550px;
    padding: 0 48px;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
    margin-bottom: 40px;
  }

  h3 {
    color: var(--text-color-subdued);
    font-family: var(--font-sans);
    font-weight: 400;
  }

  p {
    color: var(--text-color-subdued);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  :global(.register h3 svg) {
    height: 24px;
    width: 24px;
    margin-bottom: -6px;
    margin-right: 8px;
  }

  :global(.register .card) {
    margin-top: 40px;
  }

  :global(.register svg) {
    fill: var(--interactive-color);
    height: 16px;
    width: 16px;
  }

  :global(.register label svg) {
    margin-bottom: -3px;
    cursor: pointer;
  }

  form {
    width: 100%;
    max-width: 550px;
    margin: 0 auto;
  }

  a {
    text-shadow: 1px 1px 1px var(--app-background);
  }

  .error {
    font-weight: 400;
    margin-top: 4px;
    color: var(--error-color);
    text-shadow: 1px 1px 1px var(--app-background);
  }
</style>
