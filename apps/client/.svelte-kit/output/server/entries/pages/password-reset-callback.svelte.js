import { c as create_ssr_component, a as subscribe, v as validate_component, f as add_attribute } from "../../chunks/index-4390b0b8.js";
import { C as Card } from "../../chunks/Card-0ad50115.js";
import { V as VisibilityOn } from "../../chunks/VisibilityOff.svelte_svelte_type_style_lang-a615afa2.js";
import { L as Lock } from "../../chunks/Lock-271953a6.js";
import { n as navigationStatePriorToLogin } from "../../chunks/NavigationPriorToLogin-20542646.js";
import "../../chunks/index-b462fd7a.js";
var passwordResetCallback_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-lb28ls.svelte-lb28ls{max-width:500px;margin:72px auto}form.svelte-lb28ls.svelte-lb28ls{width:100%;margin:0 auto;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start}.flex.svelte-lb28ls.svelte-lb28ls{width:100%;display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:16px}.action.svelte-lb28ls.svelte-lb28ls{display:flex;justify-content:flex-end;width:100%}.flex.svelte-lb28ls input.svelte-lb28ls{width:calc(100% - 16px - 40px)}.flex.svelte-lb28ls button.secondary.svelte-lb28ls{width:40px;min-width:0;margin-bottom:0;padding:3px 0 0 0}#password-reset svg{fill:var(--interactive-color);margin-bottom:-4px}button.svelte-lb28ls.svelte-lb28ls{width:100%}",
  map: null
};
async function load({ fetch, url, session }) {
  const email = url.searchParams.get("email");
  const token = url.searchParams.get("token");
  if (!token || !email || session?.user?.email && session?.user?.email !== email) {
    return { redirect: "/__error", status: 303 };
  }
  return { status: 200, props: { email, token } };
}
const Password_reset_callback = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_navigationStatePriorToLogin;
  $$unsubscribe_navigationStatePriorToLogin = subscribe(navigationStatePriorToLogin, (value) => value);
  let { token } = $$props;
  let { email } = $$props;
  let password = "";
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.email === void 0 && $$bindings.email && email !== void 0)
    $$bindings.email(email);
  $$result.css.add(css);
  $$unsubscribe_navigationStatePriorToLogin();
  return `<main id="${"password-reset"}" class="${"svelte-lb28ls"}"><h1>Reset Password</h1>
  <h4>(Step 2 of 2)</h4>

  ${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<h4>${validate_component(Lock, "LockIcon").$$render($$result, {}, {}, {})} Enter your new password</h4>

    <form class="${"svelte-lb28ls"}"><label for="${"log-in-password"}">Password</label>
      <div class="${"flex svelte-lb28ls"}">${`<input type="${"password"}" id="${"log-in-password"}" class="${"svelte-lb28ls"}"${add_attribute("value", password, 0)}>`}

        <button type="${"button"}" class="${["secondary svelte-lb28ls", ""].join(" ").trim()}">${`${validate_component(VisibilityOn, "VisibilityOnIcon").$$render($$result, {}, {}, {})}`}</button></div>

      ${``}

      ${``}

      ${``}

      <div class="${"action svelte-lb28ls"}"><button type="${"submit"}" class="${"primary svelte-lb28ls"}">Update Password</button></div></form>`;
    }
  })}
</main>`;
});
export { Password_reset_callback as default, load };
