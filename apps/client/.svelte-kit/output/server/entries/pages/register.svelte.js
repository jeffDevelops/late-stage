import { c as create_ssr_component, v as validate_component, i as add_classes, f as add_attribute, e as escape } from "../../chunks/index-4390b0b8.js";
import lodash from "lodash";
import "validator";
import { I as Info } from "../../chunks/Info-cceca9a5.js";
import { V as VisibilityOn } from "../../chunks/VisibilityOff.svelte_svelte_type_style_lang-a615afa2.js";
import { C as Controls } from "../../chunks/Controls-6346f8a0.js";
import { e as env } from "../../chunks/env-cb046133.js";
import { g as gqlRequest } from "../../chunks/gqlRequest-8b3b303a.js";
import "../../chunks/Logo-e158a041.js";
import "../../chunks/index-b462fd7a.js";
const userWhereUniqueInput = (subfields) => `#graphql
query UserWhereUniqueInput ($where: UserWhereUniqueInput!) {
  user(where: $where ) {
    ${subfields}
  }
}
`;
var register_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-tc6nj5.svelte-tc6nj5{height:calc(100vh - 140px);width:100%}section.svelte-tc6nj5.svelte-tc6nj5{width:100%;max-width:550px;padding:50px 48px 0;margin:0 auto}h1.svelte-tc6nj5.svelte-tc6nj5{text-align:center;margin-bottom:40px}p.svelte-tc6nj5.svelte-tc6nj5{color:var(--text-color-subdued);font-size:11px;font-weight:700;letter-spacing:0.05em}.register h3 svg{height:24px;width:24px;margin-bottom:-6px;margin-right:8px}.register .card{margin-top:40px}.register svg{fill:var(--interactive-color);height:16px;width:16px}.register .secondary svg{fill:var(--interactive-color)}.register label svg{margin-bottom:-3px;cursor:pointer}form.svelte-tc6nj5.svelte-tc6nj5{width:100%;max-width:550px;margin:0 auto}.password-warning.svelte-tc6nj5.svelte-tc6nj5{color:var(--text-color-subdued);font-size:11px;font-weight:700;letter-spacing:0.05em;margin-top:8px}.zip-code.svelte-tc6nj5.svelte-tc6nj5{position:absolute;top:0px;opacity:0;width:calc(100% - 96px)}button.primary.svelte-tc6nj5.svelte-tc6nj5{padding:0 24px;min-width:0;width:auto}button.secondary.svelte-tc6nj5.svelte-tc6nj5{padding:0 16px;text-shadow:1px 1px 1px var(--app-background)}button.secondary.svelte-tc6nj5 span.svelte-tc6nj5{text-transform:none}.actions.svelte-tc6nj5.svelte-tc6nj5{margin-top:16px;display:flex;justify-content:space-between;align-items:center}.flex.svelte-tc6nj5.svelte-tc6nj5{display:flex;justify-content:space-between;align-items:center;gap:16px}.flex.svelte-tc6nj5 input.svelte-tc6nj5{width:calc(100% - 16px - 40px)}.flex.svelte-tc6nj5 button.secondary.svelte-tc6nj5{width:40px;min-width:0;margin-bottom:0;padding:3px 0 0 0}@media screen and (min-width: 1500px){section.svelte-tc6nj5.svelte-tc6nj5{height:auto;position:absolute;bottom:14vh;right:15vw}}@media screen and (min-width: 800px) and (min-height: 800px){section.svelte-tc6nj5.svelte-tc6nj5{height:auto;position:absolute;bottom:14vh;right:15vw}}@media screen and (min-width: 700px) and (min-height: 800px){section.svelte-tc6nj5.svelte-tc6nj5{height:auto;position:absolute;bottom:16vh;right:13vw}}@media screen and (max-width: 700px){section.svelte-tc6nj5.svelte-tc6nj5{padding:160px 0px 0}}@media screen and (max-width: 600px){section.svelte-tc6nj5.svelte-tc6nj5{max-width:400px;padding:140px 0px 0}.actions.svelte-tc6nj5.svelte-tc6nj5{flex-direction:column-reverse}button.primary.svelte-tc6nj5.svelte-tc6nj5,a.svelte-tc6nj5.svelte-tc6nj5,button.secondary.svelte-tc6nj5.svelte-tc6nj5{display:block;width:100%;margin-bottom:16px}}",
  map: null
};
const Register = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const { debounce } = lodash;
  let username = "";
  let usernameTaken = false;
  let email = "";
  let password = "";
  let passwordWarning = "";
  let honeypot = "";
  let errors = {
    username: "",
    email: "",
    password: "",
    form: ""
  };
  let didAttemptSubmit = false;
  debounce(async () => {
    const result = await fetch(`${env.viteSveltekitHost}/proxy/user-where`, gqlRequest({
      query: userWhereUniqueInput("id"),
      variables: { where: { username } }
    })).then(async (response) => await response.json());
    usernameTaken = !!result;
  }, 500);
  $$result.css.add(css);
  {
    {
      errors = (() => {
        {
          errors.username = "Username is required";
          return errors;
        }
      })();
    }
  }
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
  {
    {
      passwordWarning = (() => {
        if (password.trim() !== password) {
          return "Did you mean to add whitespace to the beginning or end of your password?";
        }
        return "";
      })();
    }
  }
  return `${validate_component(Controls, "Controls").$$render($$result, {}, {}, {})}

<main class="${"svelte-tc6nj5"}"><section class="${"register svelte-tc6nj5"}"><h1 class="${"svelte-tc6nj5"}">Register</h1>

    <form class="${"svelte-tc6nj5"}"><label for="${"register-username"}">Username</label>
      <input id="${"register-username"}"${add_classes("".trim())}${add_attribute("value", username, 0)}>
      ${errors.username && usernameTaken ? `<p class="${"error-message svelte-tc6nj5"}">${escape(errors.username)}</p>` : ``}

      <label for="${"register-email"}">Email <span class="${"tooltip-container"}" title="${"Your email is used log in and recover your account if your forget your password."}">${validate_component(Info, "InfoIcon").$$render($$result, {}, {}, {})}</span></label>
      <input id="${"register-email"}"${add_classes("".trim())}${add_attribute("value", email, 0)}>
      ${errors.email && didAttemptSubmit ? `<p class="${"error-message svelte-tc6nj5"}">${escape(errors.email)}</p>` : ``}

      <div class="${"zip-code svelte-tc6nj5"}"><label for="${"zip-code"}">Zip code</label>
        <input id="${"zip-code"}" autocomplete="${"off"}" aria-label="${"If you are reading this, do not fill this out."}"${add_classes("".trim())}${add_attribute("value", honeypot, 0)}></div>

      <label for="${"register-password"}"${add_classes("".trim())}>Password</label>
      <div class="${"flex svelte-tc6nj5"}">${`<input type="${"password"}" id="${"register-password"}" class="${"svelte-tc6nj5"}"${add_attribute("value", password, 0)}>`}

        <button type="${"button"}" class="${["secondary svelte-tc6nj5", ""].join(" ").trim()}">${`${validate_component(VisibilityOn, "VisibilityOnIcon").$$render($$result, {}, {}, {})}`}</button></div>
      ${errors.password && didAttemptSubmit ? `<p class="${"error-message svelte-tc6nj5"}">${escape(errors.password)}</p>` : ``}

      ${passwordWarning ? `<p class="${"password-warning svelte-tc6nj5"}">${escape(passwordWarning)}</p>` : ``}

      ${errors.form ? `<p class="${"error-message svelte-tc6nj5"}">${escape(errors.form)}</p>` : ``}

      <div class="${"actions svelte-tc6nj5"}"><a class="${"secondary svelte-tc6nj5"}" href="${"/log-in"}"><button class="${"secondary svelte-tc6nj5"}"><span class="${"svelte-tc6nj5"}">Already a member?</span> Log In</button></a>
        <button type="${"submit"}" class="${[
    "primary svelte-tc6nj5",
    ""
  ].join(" ").trim()}">Register</button></div></form></section>
</main>`;
});
export { Register as default };
