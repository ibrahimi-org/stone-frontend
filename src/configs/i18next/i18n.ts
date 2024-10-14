import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import { I18N } from "./settings";

i18n
  .use(
    HttpBackend(
      (lng: string, ns: string | string[]) =>
        import(`../../../public/locales/${lng}/${ns}.json`)
    )
  ) // Load translations via HTTP
  .use(LanguageDetector)
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    fallbackLng: I18N.fallbackLng,
    debug: false,

    interpolation: {
      escapeValue: false, // React already protects from XSS
    },

    react: {
      useSuspense: true, // Disable suspense mode for SSR
    },
  });

export default i18n;
