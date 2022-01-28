import fetch from "isomorphic-fetch";
import setCookieParser from "set-cookie-parser";
import { g as gqlRequest } from "../../../chunks/gqlRequest-35601cf5.js";
import "../../../chunks/env-288cfb0d.js";
import "dotenv";
const handleGraphQLErrors = (errors) => {
  console.log({ errors });
  if (errors.some(({ message }) => message === "Unable to find user with provided credentials.")) {
    return {
      status: 401,
      body: {
        error: {
          message: "Unable to find user with provided credentials."
        }
      }
    };
  }
};
const post = async ({ request }) => {
  const body = await request.json();
  try {
    const response = await fetch(...gqlRequest(body));
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
      },
      body: deserialized.data.authenticateUser
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
