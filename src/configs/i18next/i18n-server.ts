import { createInstance } from "i18next";
import HttpBackend from "i18next-resources-to-backend";
import { cookies } from "next/headers";
import { I18N } from "./settings";

async function initI18Next(ns?: string | string[], lang?: string) {
  lang = lang ?? cookies().get(I18N.cookieName)?.value ?? I18N.fallbackLng;
  const instance = createInstance();
  await instance
    .use(
      HttpBackend(
        (lng: string, ns: string) =>
          import(`../../../public/locales/${lng}/${ns}.json`)
      )
    )
    .init(I18N.getOptions(lang, ns));
  return instance;
}

export async function useTranslation(
  ns?: string | string[],
  lang?: string,
  options?: any
) {
  lang = lang ?? cookies().get(I18N.cookieName)?.value ?? I18N.fallbackLng;

  const i18nextInstance = await initI18Next(ns, lang);
  return {
    t: i18nextInstance.getFixedT(lang, ns, options?.keyPrefix),
    i18n: i18nextInstance,
  };
}
