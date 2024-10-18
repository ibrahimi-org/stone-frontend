export class I18N {
  static defaultNS = "translation";
  static fallbackNS = "translation";
  static supportedLngs = ["en", "fa"];
  static fallbackLng = "fa";
  static cookieName = "i18next";

  static getOptions(lng = I18N.fallbackLng, ns: string | string[] = I18N.fallbackNS) {
    return {
      // debug: typeof window === "undefined",
      debug: false,
      lng,
      ns,
      fallbackLng: I18N.fallbackLng,
      supportedLngs: I18N.supportedLngs,
      defaultNS: I18N.defaultNS,
      fallbackNS: I18N.fallbackNS,
    };
  }
}
