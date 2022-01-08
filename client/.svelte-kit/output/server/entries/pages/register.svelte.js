import { c as create_ssr_component, o as onDestroy, v as validate_component, d as add_attribute, e as escape } from "../../chunks/index-7280390d.js";
import { a as Controls, C as Card } from "../../chunks/Controls-eb495844.js";
import { I as Info } from "../../chunks/Info-b727e8c2.js";
import "../../chunks/Theme-fc7d7766.js";
var DangerTriangle_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "svg.svelte-8mzg1d{fill:var(--text-color);width:60px;height:60px}",
  map: null
};
const DangerTriangle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<svg viewBox="${"0 0 24 24"}" fill="${"#000000"}" class="${"svelte-8mzg1d"}"><path d="${"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"}"></path></svg>`;
});
var register_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-121fvzr{width:100%;max-width:550px;padding:0 48px;margin:0 auto}h1.svelte-121fvzr{text-align:center;margin-bottom:40px}h3.svelte-121fvzr{color:var(--text-color-subdued);font-family:var(--font-sans);font-weight:400}p.svelte-121fvzr{color:var(--text-color-subdued);font-size:11px;font-weight:700;letter-spacing:0.05em}.register h3 svg{height:24px;width:24px;margin-bottom:-6px;margin-right:8px}.register .card{margin-top:40px}.register svg{fill:var(--interactive-color);height:16px;width:16px}.register label svg{margin-bottom:-3px;cursor:pointer}form.svelte-121fvzr{width:100%;max-width:550px;margin:0 auto}a.svelte-121fvzr{text-shadow:1px 1px 1px var(--app-background)}.error.svelte-121fvzr{font-weight:400;margin-top:4px;color:var(--error-color);text-shadow:1px 1px 1px var(--app-background)}",
  map: null
};
const Register = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let usernameInputNode;
  let emailInputNode;
  onDestroy(() => {
  });
  let password = "";
  let errors = {
    username: "",
    email: "",
    password: "",
    form: ""
  };
  let didAttemptSubmit = false;
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
  return `${validate_component(Controls, "Controls").$$render($$result, {}, {}, {})}

<main class="${"register svelte-121fvzr"}"><h1 class="${"svelte-121fvzr"}">Register</h1>

  <form class="${"svelte-121fvzr"}"><label for="${"register-username"}">Username <span class="${"tooltip-container"}" title="${"Your username is used to identify you when you participate in audits and RFCs."}">${validate_component(Info, "InfoIcon").$$render($$result, {}, {}, {})}</span></label>
    <input id="${"register-username"}"${add_attribute("this", usernameInputNode, 0)}>
    ${errors.username && didAttemptSubmit ? `<p class="${"error svelte-121fvzr"}">${escape(errors.username)}</p>` : ``}

    <label for="${"register-email"}">Email <span class="${"tooltip-container"}" title="${"Your email is used to recover your account if your forget your password. If you opt in, you can receive emails about new campaigns, new ways to subvert extractionism, and notifications about your RFCs and audits."}">${validate_component(Info, "InfoIcon").$$render($$result, {}, {}, {})}</span></label>
    <input id="${"register-email"}"${add_attribute("this", emailInputNode, 0)}>
    ${errors.email && didAttemptSubmit ? `<p class="${"error svelte-121fvzr"}">${escape(errors.email)}</p>` : ``}

    <label for="${"register-password"}">Password <span class="${"tooltip-container"}" title="${"Your password is hashed prior to storage, making it realistically improbable to retrieve if the system is hacked (feel free to audit the code for peace of mind). In general: use a password manager and don't reuse passwords."}">${validate_component(Info, "InfoIcon").$$render($$result, {}, {}, {})}</span></label>
    <input type="${"password"}" id="${"register-password"}"${add_attribute("value", password, 0)}>
    ${errors.password && didAttemptSubmit ? `<p class="${"error svelte-121fvzr"}">${escape(errors.password)}</p>` : ``}

    <div class="${"actions"}"><a href="${"/log-in"}" class="${"svelte-121fvzr"}">Already a member? Log In</a>
      <button type="${"submit"}" class="${"primary"}">Register</button></div></form>

  ${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => `<h3 class="${"svelte-121fvzr"}">${validate_component(DangerTriangle, "DangerTriangle").$$render($$result, {}, {}, {})} You might not need to register!</h3>
    <p class="${"svelte-121fvzr"}">We recognize that you may prefer to operate anonymously on Late-Stage.</p>

    <p class="${"svelte-121fvzr"}">Formally signing up is not required for basic uses of the platform, but due to technical
      constraints, anonymous activity can only be saved in the browser context.
    </p>

    <p class="${"svelte-121fvzr"}">This means that any action you might expect the webpage to save on your behalf will only
      persist in this browser, on this device, for as long as your cache isn&#39;t cleared. If you
      choose to go anonymous, your progress will be lost when you clear your cache!
    </p>

    <p class="${"svelte-121fvzr"}">Registering with an email address allows you to more reliably save your data, log in on other
      devices and browsers, and allows you to participate in RFCs and audits.
    </p>`
  })}
</main>`;
});
export { Register as default };
