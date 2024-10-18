"use client";

import { useEffect, useMemo, useState } from "react";
import i18next from "i18next";
import { initReactI18next, useTranslation as useTranslationOrg } from "react-i18next";
import { setCookie, getCookie } from "cookies-next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { I18N } from "./settings";

const runsOnServerSide = typeof window === "undefined";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string | string[]) =>
        import(`../../../public/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...I18N.getOptions(),

    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? I18N.supportedLngs : [],
  });

export function useTranslation(ns: string, lang?: string, options: any = {}) {
  lang = lang ?? getCookie(I18N.cookieName) ?? I18N.fallbackLng;

  // init18n(lang, ns);
  console.log("locale from cookie in loop", lang);
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;
  if (runsOnServerSide && lang && i18n.resolvedLanguage !== lang) {
    i18n.changeLanguage(lang);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return;
      setActiveLng(i18n.resolvedLanguage);
    }, [activeLng, i18n.resolvedLanguage]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lang || i18n.resolvedLanguage === lang) return;
      i18n.changeLanguage(lang);
    }, [lang, i18n]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (getCookie(I18N.cookieName) === lang) return;
      setCookie(I18N.cookieName, lang, { path: "/" });
    }, [lang]);
  }
  return ret;
}
