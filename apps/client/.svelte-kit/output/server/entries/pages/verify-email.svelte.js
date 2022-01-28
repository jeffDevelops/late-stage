import { c as create_ssr_component, f as add_attribute, e as escape } from "../../chunks/index-f463a23b.js";
var verifyEmail_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-e7ttr4.svelte-e7ttr4{padding:72px 48px 0;max-width:750px;width:100%;margin:0 auto}h4.svelte-e7ttr4.svelte-e7ttr4{margin-top:48px}.verify-email h4 svg{fill:var(--interactive-color);margin-bottom:-6px}.verify-email.svelte-e7ttr4 .flex.svelte-e7ttr4{display:flex;justify-content:space-between;align-items:flex-end;gap:16px}.flex.svelte-e7ttr4 div.svelte-e7ttr4{width:calc(100% - 16px - 172px)}form.svelte-e7ttr4.svelte-e7ttr4{margin:0}label.svelte-e7ttr4.svelte-e7ttr4{margin-top:0}@media screen and (max-width: 730px){.flex.svelte-e7ttr4.svelte-e7ttr4{flex-direction:column}.flex.svelte-e7ttr4 button.svelte-e7ttr4{width:100%}.flex.svelte-e7ttr4 div.svelte-e7ttr4{width:100%}}@media screen and (max-width: 600px){main.svelte-e7ttr4.svelte-e7ttr4{padding:72px 0px 0}}",
  map: null
};
const Verify_email = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let emailError = "";
  let didAttemptSubmit = false;
  $$result.css.add(css);
  emailError = (() => {
    {
      return "Email address is required";
    }
  })();
  return `<main class="${"verify-email svelte-e7ttr4"}"><h1>Verify Your Email</h1>

  <p>Thank you for signing up!</p>

  <p>An email was sent to the email address you provided. You&#39;ll need to click the confirmation link
    in that email to finish registering.
  </p>

  <p>For your security, it expires in five minutes.</p>

  <p>You may now close this tab in your browser.</p>

  ${`<h4 class="${"svelte-e7ttr4"}">Didn&#39;t get an email?</h4>
    <form class="${"flex svelte-e7ttr4"}"><div class="${"svelte-e7ttr4"}"><label for="${"verify-email-input"}" class="${"svelte-e7ttr4"}">Email Address</label>
        <input id="${"verify-email-input"}" type="${"text"}"${add_attribute("value", email, 0)}>

        ${emailError && didAttemptSubmit ? `<p class="${"error-message"}">${escape(emailError)}</p>` : ``}</div>

      <button style="${"margin-bottom: " + escape(emailError && didAttemptSubmit ? "37px" : "0") + ";"}" type="${"submit"}" class="${["secondary svelte-e7ttr4", ""].join(" ").trim()}">Send It Again</button></form>`}
</main>`;
});
export { Verify_email as default };
