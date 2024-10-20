import { AppConstants } from "@/lib/constants";
import { getBaseApiUrl } from "@/lib/utils";
import merge from "lodash-es/merge";
import set from "lodash-es/set";
import { cookies } from "next/headers";

type RequestOption = RequestInit & {
  query?: any;
};

export async function serverFetch(url: string | URL, options?: RequestOption) {
  const { query, ...requestInit } = options ?? {};
  const baseUrl = getBaseApiUrl(url);

  if (query) {
    Object.keys(query).forEach((r) => {
      const value = query[r];
      baseUrl.searchParams.append(
        r,
        typeof value === "string" ? value : typeof value === "object" ? JSON.stringify(value) : value
      );
    });
  }
  const sessionToken = cookies().get(AppConstants.ParseSessionCookieName)?.value;
  const defaultOptions: RequestInit = {
    headers: {
      "X-PARSE-APPLICATION-ID": process.env.NEXT_PUBLIC_PARSE_APP_ID!,
      "X-PARSE-REST-API-KEY": process.env.NEXT_PUBLIC_PARSE_REST_API_KEY!,
      "Content-Type": "application/json",
    },
  };

  if (sessionToken) {
    set(defaultOptions.headers!, "X-SESSION-TOKEN", sessionToken);
  }

  const obj = merge({}, defaultOptions, requestInit);

  return fetch(baseUrl, obj);
}
