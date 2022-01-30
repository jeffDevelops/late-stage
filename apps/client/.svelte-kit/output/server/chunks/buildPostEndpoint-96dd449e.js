import fetch from "isomorphic-fetch";
import setCookieParser from "set-cookie-parser";
import { g as gqlRequest } from "./gqlRequest-ef7d088a.js";
import { r as refreshAccessToken } from "./RefreshAccessToken-922ef447.js";
const buildPostEndpoint = (accessor, errorHandler, shouldRetryAfterTokenRefresh = true) => async function post(requestEvent) {
  const { request: endpointRequest } = requestEvent;
  const bodyString = await endpointRequest.text();
  const body = JSON.parse(bodyString);
  const { deserialized: originalDeserialized } = await makeRequest(body, {
    cookie: endpointRequest.headers.get("cookie")
  });
  if (!originalDeserialized.errors)
    return success(originalDeserialized.data[accessor]);
  const unauthorized = originalDeserialized.errors.some(({ message }) => message.startsWith("Unauthorized"));
  if (shouldRetryAfterTokenRefresh && unauthorized) {
    return await retryAfterTokenRefresh(requestEvent, body, accessor, errorHandler);
  }
  return runCallsiteErrorHandler(errorHandler, originalDeserialized.errors);
};
async function retryAfterTokenRefresh(requestEvent, body, accessor, errorHandler) {
  const { response: refreshResponse, deserialized: refreshDeserialized } = await refreshToken(requestEvent);
  if (!refreshDeserialized.errors) {
    const { merged, accessCookie } = mergeCookies(refreshResponse, requestEvent.request);
    const { deserialized: retriedDeserialized } = await makeRequest(body, {
      cookie: merged
    });
    if (!retriedDeserialized.errors)
      return success(retriedDeserialized.data[accessor], {
        "Set-Cookie": accessCookie
      });
    return runCallsiteErrorHandler(errorHandler, retriedDeserialized.errors);
  }
  return runCallsiteErrorHandler(errorHandler, refreshDeserialized.errors);
}
function mergeCookies(refreshResponse, endpointRequest) {
  const [accessCookie] = setCookieParser.splitCookiesString(refreshResponse.headers.get("set-cookie"));
  const refreshCookie = endpointRequest.headers.get("cookie");
  const cookies = [accessCookie, refreshCookie].join(", ");
  return {
    accessCookie,
    refreshCookie,
    merged: cookies
  };
}
function runCallsiteErrorHandler(errorHandler, errors) {
  if (errorHandler) {
    const output = errorHandler(errors);
    if (output)
      return output;
  }
  return genericErrorOutput();
}
function success(body, headers = void 0) {
  return {
    status: 200,
    body,
    headers
  };
}
function genericErrorOutput() {
  return {
    status: 500,
    body: {
      error: {
        message: "An unknown error occurred"
      }
    }
  };
}
async function makeRequest(body, headers) {
  const response = await fetch(...gqlRequest(body, headers));
  const deserialized = await response.json();
  console.log({ response, deserialized });
  console.log(deserialized?.errors);
  return {
    response,
    deserialized
  };
}
async function refreshToken({ request, locals }) {
  const refreshResponse = await fetch(...gqlRequest({
    query: refreshAccessToken
  }, {
    cookie: request.headers.get("cookie")
  }));
  const deserialized = await refreshResponse.json();
  if (!deserialized.errors) {
    locals.user = deserialized.data.refreshAccessToken;
  }
  return {
    response: refreshResponse,
    deserialized
  };
}
export { buildPostEndpoint as b };
