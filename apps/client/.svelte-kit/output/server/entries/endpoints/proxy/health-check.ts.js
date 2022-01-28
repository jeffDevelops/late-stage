import fetch from "isomorphic-fetch";
import { e as env } from "../../../chunks/env-288cfb0d.js";
import "dotenv";
const get = async () => {
  try {
    const response = await fetch(`${env.apiHost}/_healthcheck`, {
      method: "GET"
    });
    await response.json();
    return {
      status: 200
    };
  } catch (error) {
    if (error.code === "ECONNREFUSED" || error.message.startsWith("invalid json response body at")) {
      return {
        status: 500,
        body: {
          error: {
            message: "Could not connect to server"
          }
        }
      };
    }
    console.log(error);
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
export { get };
