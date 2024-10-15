import acceptLanguage from "accept-language";
import { NextRequest, NextResponse } from "next/server";
import { I18N } from "./configs/i18next/settings";
import { AppConstants } from "./lib/constants";

acceptLanguage.languages(I18N.supportedLngs);

function extractLang(pathname: string) {
  let [first, second] = pathname?.split("/");
  first = first || second;
  return I18N.supportedLngs.find((lng) => first === lng);
}

export async function middleware(request: NextRequest) {
  let lang;
  let sessionToken = request.cookies.get(AppConstants.ParseSessionCookieName)?.value; // session token

  const { pathname } = request.nextUrl;
  lang = extractLang(pathname);
  const hasLocale = lang !== undefined;

  if (!lang && request.cookies.has(I18N.cookieName))
    lang = acceptLanguage.get(request.cookies.get(I18N.cookieName)?.value);
  if (!lang) lang = acceptLanguage.get(request.headers.get("Accept-Language"));
  if (!lang) lang = I18N.fallbackLng;

  request.nextUrl.pathname = `/${lang}${pathname}`;
  let response;

  if (!hasLocale) {
    // if the pathname doesn't have a lang, then redirect to detected lang.
    response = NextResponse.redirect(request.nextUrl);
    response.headers.set("Accept-Language", lang);
    response.cookies.set(I18N.cookieName, lang, { path: "/" });
    return response;
  }

  const isProd = process.env.NODE_ENV === "production";
  if (sessionToken) {
    response = NextResponse.next();
    response.cookies.set(AppConstants.ParseSessionCookieName, sessionToken, {
      path: "/",
      secure: isProd,
      httpOnly: isProd,
    });
  } else {
    response = NextResponse.next();
    response.cookies.delete(AppConstants.ParseSessionCookieName);
  }

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.icosw.js|site.webmanifest|favicon.ico|next.svg).*)"],
};
