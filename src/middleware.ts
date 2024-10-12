import acceptLanguage from "accept-language";
import { NextRequest, NextResponse } from "next/server";
import { PRIVATE_ROUTES } from "./lib/http/contants";
import { I18N } from "./configs/i18next/settings";

acceptLanguage.languages(I18N.supportedLngs);

export async function middleware(request: NextRequest) {
  let lng;
  if (request.cookies.has(I18N.cookieName))
    lng = acceptLanguage.get(request.cookies.get(I18N.cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(request.headers.get("Accept-Language"));
  if (!lng) lng = I18N.fallbackLng;

  const response = NextResponse.next();

  response.cookies.set(I18N.cookieName, lng);
  response.headers.set("Accept-Language", lng);
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.icosw.js|site.webmanifest).*)",
    ...PRIVATE_ROUTES,
  ],
};
