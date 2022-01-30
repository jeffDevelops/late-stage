import { e as env } from "./env-288cfb0d.js";
const gqlRequest = (body, headers = {}) => {
  return [
    `${env.apiHost}${env.apiPath}`,
    {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${env.apiKey}`,
        ...headers
      },
      body: body ? JSON.stringify(body) : JSON.stringify({})
    }
  ];
};
export { gqlRequest as g };
