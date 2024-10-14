import acceptLanguage from "accept-language";
import { NextRequest, NextResponse } from "next/server";
import { I18N } from "./configs/i18next/settings";
import { AppContants } from "./lib/constants";

acceptLanguage.languages(I18N.supportedLngs);

export async function middleware(request: NextRequest) {
  let lng;
  let sessionToken;
  if (request.cookies.has(I18N.cookieName))
    lng = acceptLanguage.get(request.cookies.get(I18N.cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(request.headers.get("Accept-Language"));
  if (!lng) lng = I18N.fallbackLng;

  if (request.cookies.has(AppContants.ParseSessionCookieName))
    sessionToken = request.cookies.get(
      AppContants.ParseSessionCookieName
    )?.value;

  const response = sessionToken
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/auth/sign-in", request.url));
  response.headers.set("Accept-Language", lng);

  response.cookies.set(I18N.cookieName, lng);

  if (sessionToken) {
    try {
      response.cookies.set(AppContants.ParseSessionCookieName, sessionToken);
    } catch (error) {
      console.error("error", error);
    }
  } else {
    response.cookies.delete(AppContants.ParseSessionCookieName);
  }
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.icosw.js|site.webmanifest|auth|test).*)",
    "/dashboard/:path*",
  ],
};
