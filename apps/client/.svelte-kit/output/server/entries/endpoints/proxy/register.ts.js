import { b as buildPostEndpoint } from "../../../chunks/buildPostEndpoint-878f8475.js";
import "isomorphic-fetch";
import "set-cookie-parser";
import "../../../chunks/gqlRequest-35601cf5.js";
import "../../../chunks/env-288cfb0d.js";
import "dotenv";
import "../../../chunks/RefreshAccessToken-922ef447.js";
const handleGraphQLErrors = (errors) => {
  console.log(errors);
  if (errors.some((error) => error.message === "A user with that username already exists. Please try another.")) {
    return {
      status: 409,
      body: {
        error: {
          message: "A user with that username already exists. Please try another."
        }
      }
    };
  }
  return {
    status: 500,
    body: {
      error: {
        message: "An unknown error occurred"
      }
    }
  };
};
const post = buildPostEndpoint("registerUser", handleGraphQLErrors);
export { post };
