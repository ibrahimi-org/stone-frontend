import { InitOptions } from "i18next";

export class I18N {
  public static defaultNS = "translation";
  public static fallbackNS = "translation";
  public static supportedLngs = ["en", "fa"];
  public static fallbackLng = "en";
  public static cookieName = "i18next";

  public static getOptions(
    lng: string = I18N.fallbackLng,
    ns: string | string[] = I18N.fallbackNS
  ): InitOptions {
    return {
      lng,
      ns,
      defaultNS: I18N.defaultNS,
      fallbackLng: I18N.fallbackLng,
      supportedLngs: I18N.supportedLngs,
      fallbackNS: I18N.fallbackNS,
    };
  }
}
