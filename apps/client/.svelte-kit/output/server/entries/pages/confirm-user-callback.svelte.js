import { c as create_ssr_component, v as validate_component, e as escape } from "../../chunks/index-4390b0b8.js";
import { e as env } from "../../chunks/env-cb046133.js";
import { g as gqlRequest } from "../../chunks/gqlRequest-8b3b303a.js";
import { C as Card } from "../../chunks/Card-0ad50115.js";
import { D as DangerTriangle } from "../../chunks/DangerTriangle-724c9700.js";
const verifyEmailAddress = (subfields) => `#graphql
mutation VerifyEmailAddress ($email: String!, $token: String!) {
  verifyEmailAddress(token: $token, email: $email) {
    ${subfields}
  }
}`;
var confirmUserCallback_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-1wq0ik0{display:flex;justify-content:center;align-items:center;width:calc(100% - 24px);max-width:750px;margin:0 auto}.confirm-user-callback h2 svg{fill:var(--error-color);width:24px;height:24px;margin-bottom:-2px;margin-right:4px}.confirm-user-callback .card{width:100%;background-color:var(--interactive-card-color)}",
  map: null
};
async function load({ fetch, url }) {
  const email = url.searchParams.get("email");
  const token = url.searchParams.get("token");
  if (!token || !email) {
    return { redirect: "/__error", status: 303 };
  }
  const response = await fetch(`${env.viteHostAddress}/proxy/verify-email-address`, gqlRequest({
    query: verifyEmailAddress(`
          id
          email
          username
          emailIsVerified
          cred
          isAdmin
          banned
          createdAt
        `),
    variables: { token, email }
  }));
  const deserialized = await response.json();
  if (deserialized.error) {
    return {
      props: { error: deserialized.error.message }
    };
  }
  return { status: 303, redirect: "/log-in" };
}
const Confirm_user_callback = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { error } = $$props;
  if ($$props.error === void 0 && $$bindings.error && error !== void 0)
    $$bindings.error(error);
  $$result.css.add(css);
  return `${error ? `<main class="${"confirm-user-callback svelte-1wq0ik0"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<h2>${validate_component(DangerTriangle, "DangerTriangle").$$render($$result, {}, {}, {})} Hmm, that magic link didn&#39;t work</h2>

      <p>${escape(error)}</p>

      ${error === "Magic link expired. Please send yourself another confirmation email and try again." ? `<p>You can you send yourself another one <a href="${"/verify-email"}" sveltekit:prefetch>here</a>.
        </p>` : ``}`;
    }
  })}</main>` : ``}`;
});
export { Confirm_user_callback as default, load };
