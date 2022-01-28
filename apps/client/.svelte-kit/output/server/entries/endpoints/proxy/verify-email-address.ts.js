import { b as buildPostEndpoint } from "../../../chunks/buildPostEndpoint-878f8475.js";
import "isomorphic-fetch";
import "set-cookie-parser";
import "../../../chunks/gqlRequest-35601cf5.js";
import "../../../chunks/env-288cfb0d.js";
import "dotenv";
import "../../../chunks/RefreshAccessToken-922ef447.js";
const handleGraphQLErrors = (errors) => {
  console.log(errors);
  if (errors.some(({ message }) => message === "JWT expired. Please send yourself another confirmation email and try again.")) {
    return {
      status: 200,
      body: {
        error: {
          message: "Magic link expired. Please send yourself another confirmation email and try again."
        }
      }
    };
  }
};
const post = buildPostEndpoint("verifyEmailAddress", handleGraphQLErrors);
export { post };
