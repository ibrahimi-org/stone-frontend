"use client";

import { I18N } from "@/configs/i18next/settings";
import { setCookie } from "cookies-next";
import MySelect from "./select/MySelect";
import { useTranslation } from "@/configs/i18next/i18n-client";
import { useRouter, usePathname, useParams } from "next/navigation";
import { trimStart } from "lodash-es";

export const LanguageSwitcher = ({ lang }: { lang: string }) => {
  const { t, i18n } = useTranslation("translation");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const handleLanguageChange = (langValue: string) => {
    i18n.changeLanguage(langValue);
    setCookie(I18N.cookieName, langValue, { path: "/" });
    const path = "/" + langValue + trimStart("/" + params.lang, pathname);
    console.log("pathname", pathname, params, path);
    router.replace(path);
  };

  return (
    <MySelect
      value={lang}
      onChange={handleLanguageChange}
      options={I18N.supportedLngs}
      renderItem={(o) => o}
      getItemValue={(o) => o}
    />
  );
};
