import { c as create_ssr_component, a as subscribe, v as validate_component, f as add_attribute, e as escape } from "../../chunks/index-4390b0b8.js";
import { I as Info } from "../../chunks/Info-cceca9a5.js";
import { V as VisibilityOn } from "../../chunks/VisibilityOff.svelte_svelte_type_style_lang-a615afa2.js";
import { C as Controls } from "../../chunks/Controls-6346f8a0.js";
import { n as navigationStatePriorToLogin } from "../../chunks/NavigationPriorToLogin-20542646.js";
import "../../chunks/Logo-e158a041.js";
import "../../chunks/index-b462fd7a.js";
var logIn_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-18g5m5c.svelte-18g5m5c{height:calc(100vh - 140px);width:100%}section.svelte-18g5m5c.svelte-18g5m5c{width:100%;max-width:550px;padding:40px 48px 0;margin:0 auto}h1.svelte-18g5m5c.svelte-18g5m5c{text-align:center;margin-bottom:40px}p.svelte-18g5m5c.svelte-18g5m5c{color:var(--text-color-subdued);font-size:11px;font-weight:700;letter-spacing:0.05em}.log-in h3 svg{height:24px;width:24px;margin-bottom:-6px;margin-right:8px}.log-in .card{margin-top:40px}.log-in svg{fill:var(--interactive-color);height:16px;width:16px}.log-in label svg{margin-bottom:-3px;cursor:pointer}form.svelte-18g5m5c.svelte-18g5m5c{width:100%;max-width:550px;margin:0 auto}a.svelte-18g5m5c.svelte-18g5m5c{text-shadow:1px 1px 1px var(--app-background)}button.secondary.svelte-18g5m5c.svelte-18g5m5c{padding:0 16px;text-shadow:1px 1px 1px var(--app-background);font-size:0.75rem}button.secondary.svelte-18g5m5c span.svelte-18g5m5c{text-transform:none}.error-message.svelte-18g5m5c.svelte-18g5m5c{margin-top:16px}.actions.svelte-18g5m5c.svelte-18g5m5c{margin-top:16px;display:flex;justify-content:space-between;align-items:center}.flex.svelte-18g5m5c.svelte-18g5m5c{display:flex;justify-content:space-between;align-items:center;gap:16px}.flex.svelte-18g5m5c input.svelte-18g5m5c{width:calc(100% - 16px - 40px)}.flex.svelte-18g5m5c button.secondary.svelte-18g5m5c{width:40px;min-width:0;margin-bottom:0;padding:3px 0 0 0}.forgot-password.svelte-18g5m5c.svelte-18g5m5c{margin-top:8px;display:inline-block}@media screen and (min-width: 1500px){section.svelte-18g5m5c.svelte-18g5m5c{height:auto;position:absolute;bottom:14vh;right:15vw}}@media screen and (min-width: 800px) and (min-height: 800px){section.svelte-18g5m5c.svelte-18g5m5c{height:auto;position:absolute;bottom:14vh;right:15vw}}@media screen and (min-width: 700px) and (min-height: 800px){section.svelte-18g5m5c.svelte-18g5m5c{height:auto;position:absolute;bottom:16vh;right:13vw}}@media screen and (max-width: 700px){.actions.svelte-18g5m5c.svelte-18g5m5c{flex-direction:column-reverse}button.primary.svelte-18g5m5c.svelte-18g5m5c,button.secondary.svelte-18g5m5c.svelte-18g5m5c{display:block;width:100%;margin-bottom:16px}}@media screen and (max-width: 600px){section.svelte-18g5m5c.svelte-18g5m5c{max-width:400px;padding:60px 0px 0}}",
  map: null
};
let emailTaken = false;
const Log_in = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_navigationStatePriorToLogin;
  $$unsubscribe_navigationStatePriorToLogin = subscribe(navigationStatePriorToLogin, (value) => value);
  let email = "";
  let password = "";
  let errors = { email: "", password: "", form: "" };
  let didAttemptSubmit = false;
  $$result.css.add(css);
  {
    {
      errors = (() => {
        {
          errors.email = "Email address is required";
          return errors;
        }
      })();
    }
  }
  {
    {
      errors = (() => {
        {
          errors.password = "Password is required";
          return errors;
        }
      })();
    }
  }
  Object.values(errors).some((value) => !!value);
  $$unsubscribe_navigationStatePriorToLogin();
  return `${validate_component(Controls, "Controls").$$render($$result, {}, {}, {})}

<main class="${"svelte-18g5m5c"}"><section class="${"log-in svelte-18g5m5c"}"><h1 class="${"svelte-18g5m5c"}">Log In</h1>

    <form class="${"svelte-18g5m5c"}"><label for="${"log-in-email"}">Email <span class="${"tooltip-container"}" title="${"Your email is used to identify you within the system without having to remember your username, and prevents you from getting locked out of your account in the event you forget your password."}">${validate_component(Info, "InfoIcon").$$render($$result, {}, {}, {})}</span></label>
      <input id="${"log-in-email"}"${add_attribute("value", email, 0)}>
      ${errors.email && emailTaken ? `<p class="${"error-message svelte-18g5m5c"}">${escape(errors.email)}</p>` : ``}

      <label for="${"log-in-password"}">Password</label>
      <div class="${"flex svelte-18g5m5c"}">${`<input type="${"password"}" id="${"log-in-password"}" class="${"svelte-18g5m5c"}"${add_attribute("value", password, 0)}>`}

        <button type="${"button"}" class="${["secondary svelte-18g5m5c", ""].join(" ").trim()}">${`${validate_component(VisibilityOn, "VisibilityOnIcon").$$render($$result, {}, {}, {})}`}</button></div>

      ${errors.password && didAttemptSubmit ? `<p class="${"error-message svelte-18g5m5c"}">${escape(errors.password)}</p>` : ``}

      <a class="${"forgot-password svelte-18g5m5c"}" href="${"/reset-password"}">Forgot password?</a>

      ${errors.form ? `<p class="${"error-message svelte-18g5m5c"}">${escape(errors.form)}</p>` : ``}

      <div class="${"actions svelte-18g5m5c"}"><a href="${"/register"}" class="${"svelte-18g5m5c"}"><button type="${"button"}" class="${"secondary svelte-18g5m5c"}"><span class="${"svelte-18g5m5c"}">Not registered yet?</span> Register</button></a>
        <button type="${"submit"}" class="${[
    "primary svelte-18g5m5c",
    ""
  ].join(" ").trim()}">Log In</button></div></form></section>
</main>`;
});
export { Log_in as default };
