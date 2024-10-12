import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-resources-to-backend";
import { cookies } from "next/headers";
import { I18N } from "./settings";

const isServer = typeof window === "undefined";

export async function useTranslation(ns?: string | string[]) {
  const lng = cookies().get(I18N.cookieName)?.value ?? I18N.fallbackLng;

  return await i18n
    .use(
      HttpBackend(
        (lng: string, ns: string | string[]) =>
          import(`../../../public/locales/${lng}/${ns}.json`)
      )
    ) // Load translations via HTTP
    .use(LanguageDetector)

    .init({
      fallbackLng: I18N.fallbackLng,
      lng,
      ns,
      debug: !isServer,
      interpolation: {
        escapeValue: false, // React already protects from XSS
      },

      react: {
        useSuspense: false, // Disable suspense mode for SSR
      },
    });
}

export default i18n;
