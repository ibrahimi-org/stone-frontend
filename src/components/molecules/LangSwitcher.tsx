"use client";

import { I18N } from "@/configs/i18next/settings";
import { setCookie } from "cookies-next";
import { useTranslation } from "react-i18next";
import MySelect from "./select/MySelect";

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation("translation");

  const handleLanguageChange = (langValue: string) => {
    i18n.changeLanguage(langValue);
    setCookie(I18N.cookieName, langValue, { path: "/" });
    window.location.reload();
  };

  return (
    <MySelect
      onChange={handleLanguageChange}
      options={I18N.supportedLngs}
      renderItem={(o) => o}
      getItemValue={(o) => o}
    />
  );
};
