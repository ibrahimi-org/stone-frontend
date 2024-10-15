import { AppConstants } from "@/lib/constants";
import { getBaseApiAddress } from "@/lib/utils";
import merge from "lodash-es/merge";
import set from "lodash-es/set";
import { cookies } from "next/headers";

export async function serverFetch(url: string | URL, options?: RequestInit) {
  const sessionToken = cookies().get(AppConstants.ParseSessionCookieName)?.value;
  const defaultOptions: RequestInit = {
    headers: {
      "X-PARSE-APPLICATION-ID": process.env.NEXT_PUBLIC_PARSE_APP_ID!,
      "X-PARSE-REST-API-KEY": process.env.NEXT_PUBLIC_PARSE_REST_API_KEY!,
    },
  };

  if (sessionToken) {
    set(defaultOptions.headers!, "X-SESSION-TOKEN", sessionToken);
  }
  return fetch(getBaseApiAddress(url), merge(defaultOptions, options));
}
