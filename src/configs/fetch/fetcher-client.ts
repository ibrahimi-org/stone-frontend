import { AppConstants } from "@/lib/constants";
import merge from "lodash-es/merge";
import set from "lodash-es/set";
import { getCookie } from "cookies-next";

export async function clientFetch(url: string | URL | globalThis.Request, options: RequestInit) {
  const sessionToken = getCookie(AppConstants.ParseSessionCookieName);
  const defaultOptions: RequestInit = {
    headers: {
      "X-PARSE-APPLICATION-ID": process.env.NEXT_PUBLIC_PARSE_APP_ID!,
      "X-PARSE-REST-API-KEY": process.env.NEXT_PUBLIC_PARSE_REST_API_KEY!,
    },
  };

  if (sessionToken) {
    set(defaultOptions.headers!, "X-SESSION-TOKEN", sessionToken);
  }
  return fetch(url, merge(defaultOptions, options));
}
