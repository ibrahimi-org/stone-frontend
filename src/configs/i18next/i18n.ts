import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { I18N } from "./settings";

const isServer = typeof window === "undefined";

export class Internationalization {
  public static defaultNS = "translation";
  public static fallbackNS = "translation";
  public static supportedLngs = ["en", "fa"];
  public static fallbackLng = "en";
}

i18n
  .use(HttpBackend) // Load translations via HTTP
  .use(LanguageDetector)
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    fallbackLng: I18N.fallbackLng,
    debug: !isServer,

    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to translation files
    },
    react: {
      useSuspense: false, // Disable suspense mode for SSR
    },
  });

export default i18n;
