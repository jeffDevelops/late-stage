import { b as buildPostEndpoint } from "../../../chunks/buildPostEndpoint-878f8475.js";
import "isomorphic-fetch";
import "set-cookie-parser";
import "../../../chunks/gqlRequest-35601cf5.js";
import "../../../chunks/env-288cfb0d.js";
import "dotenv";
import "../../../chunks/RefreshAccessToken-922ef447.js";
const post = buildPostEndpoint("sendPasswordResetEmail", null, false);
export { post };
