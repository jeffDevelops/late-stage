import { c as create_ssr_component, a as subscribe, v as validate_component, f as add_attribute, i as add_classes, e as escape } from "../../chunks/index-4390b0b8.js";
import { a as session } from "../../chunks/Logo-e158a041.js";
import { C as Controls } from "../../chunks/Controls-6346f8a0.js";
import { C as Card } from "../../chunks/Card-0ad50115.js";
import { L as Lock } from "../../chunks/Lock-271953a6.js";
import "../../chunks/index-b462fd7a.js";
var resetPassword_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-hzfgjj.svelte-hzfgjj{padding:72px 48px 0;max-width:750px;width:100%;margin:0 auto}.password-reset-email-verification h4 svg{fill:var(--interactive-color);margin-bottom:-6px}.password-reset-email-verification.svelte-hzfgjj .flex.svelte-hzfgjj{display:flex;justify-content:space-between;align-items:flex-end;gap:16px}.flex.svelte-hzfgjj div.svelte-hzfgjj{width:calc(100% - 16px - 172px)}form.svelte-hzfgjj.svelte-hzfgjj{margin:24px 0 0}label.svelte-hzfgjj.svelte-hzfgjj{margin-top:0}.card h4:last-child{margin-bottom:0}.card h4 svg{margin-right:4px}@media screen and (max-width: 730px){.flex.svelte-hzfgjj.svelte-hzfgjj{flex-direction:column}.flex.svelte-hzfgjj button.svelte-hzfgjj{width:100%}.flex.svelte-hzfgjj div.svelte-hzfgjj{width:100%}}@media screen and (max-width: 600px){main.svelte-hzfgjj.svelte-hzfgjj{padding:72px 0px 0}}",
  map: null
};
const Reset_password = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $session, $$unsubscribe_session;
  $$unsubscribe_session = subscribe(session, (value) => $session = value);
  let email = $session?.user?.email ?? "";
  let emailWasLoadedFromSession = !!$session?.user?.email;
  let emailError = "";
  let didAttemptSubmit = false;
  $$result.css.add(css);
  emailError = (() => {
    if (!email) {
      return "Email address is required";
    }
    if (!email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
      return "Email address format invalid";
    }
    return "";
  })();
  $$unsubscribe_session();
  return `${validate_component(Controls, "Controls").$$render($$result, {}, {}, {})}

<main class="${"password-reset-email-verification svelte-hzfgjj"}"><h1>Reset Password</h1>
  <h4>(Step 1 of 2)</h4>

  ${`<div>${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<h4>${validate_component(Lock, "LockIcon").$$render($$result, {}, {}, {})} Verify Your Identity</h4>
        <p>Before we reset your password, we need to make sure it&#39;s really you.</p>
        <p>Enter your email below. If an account with that email address exists, we&#39;ll send a magic
          link to that email inbox with instructions on how to reset your password.
        </p>
        <form class="${"flex svelte-hzfgjj"}"><div class="${"svelte-hzfgjj"}"><label for="${"password-reset-email-verification-input"}" class="${"svelte-hzfgjj"}">Email Address</label>
            <input ${emailWasLoadedFromSession ? "disabled" : ""}${add_attribute("title", emailWasLoadedFromSession ? `You are currently logged in with email ${email} and can only reset that account's password unless you log out.` : "Enter the email associated with your account", 0)} id="${"password-reset-email-verification-input"}" type="${"text"}"${add_classes((emailWasLoadedFromSession ? "disabled" : "").trim())}${add_attribute("value", email, 0)}>

            ${emailError && didAttemptSubmit ? `<p class="${"error-message"}">${escape(emailError)}</p>` : ``}</div>

          <button style="${"margin-bottom: " + escape(emailError && didAttemptSubmit ? "37px" : "0") + ";"}" type="${"submit"}" class="${["secondary svelte-hzfgjj", ""].join(" ").trim()}">Send</button></form>`;
    }
  })}</div>`}
</main>`;
});
export { Reset_password as default };
