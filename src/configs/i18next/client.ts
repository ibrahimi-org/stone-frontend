"use client";

import { useEffect, useState } from "react";
import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import { useCookies } from "react-cookie";
import resourcesToBackend from "i18next-resources-to-backend";
import { getOptions, languages, cookieName } from "./settings";
import { importI18nNamespace } from "@/lib/i18n.util";

const runsOnServerSide = typeof window === "undefined";

//
i18next
  .use(initReactI18next)
  .use(resourcesToBackend(importI18nNamespace))
  .init(
    {
      ...getOptions(),
      lng: "en", // let detect the language on client side
      detection: {
        order: ["path", "htmlTag", "cookie", "navigator"],
      },
      preload: runsOnServerSide ? languages : [],
    }
    // (err, t) => {
    //   if (err) return console.log("something went wrong loading", err);
    //   t("key");
    // }
  );

export function useTranslation(
  lng: string = "en",
  ns: string[] | string,
  options?: Record<string, any>
) {
  const [cookies, setCookie] = useCookies([cookieName]);
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  }
  //else {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   useEffect(() => {
  //     if (activeLng === i18n.resolvedLanguage) return;
  //     setActiveLng(i18n.resolvedLanguage);
  //   }, [activeLng, i18n.resolvedLanguage]);
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   useEffect(() => {
  //     if (!lng || i18n.resolvedLanguage === lng) return;
  //     i18n.changeLanguage(lng);
  //   }, [lng, i18n]);
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   if (cookies.i18next === lng) return;
  //   setCookie(cookieName, lng, { path: "/" });
  // }, [lng, cookies.i18next]);
  // }
  return ret;
}
