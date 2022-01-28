import fetch from "isomorphic-fetch";
import setCookieParser from "set-cookie-parser";
import { g as gqlRequest } from "../../../chunks/gqlRequest-35601cf5.js";
import "../../../chunks/env-288cfb0d.js";
import "dotenv";
const handleGraphQLErrors = (errors) => {
  console.log({ errors });
};
const post = async ({ request }) => {
  const body = await request.json();
  try {
    const response = await fetch(...gqlRequest(body, {
      cookie: request.headers.get("cookie")
    }));
    const deserialized = await response.json();
    if (deserialized.errors) {
      const output = handleGraphQLErrors(deserialized.errors);
      if (output)
        return output;
      return {
        status: 500,
        body: {
          error: {
            message: "An unknown error occurred"
          }
        }
      };
    }
    return {
      status: 200,
      headers: {
        "Set-Cookie": setCookieParser.splitCookiesString(response.headers.get("set-cookie"))
      }
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: {
        error: {
          message: "An unknown error occurred"
        }
      }
    };
  }
};
export { post };
