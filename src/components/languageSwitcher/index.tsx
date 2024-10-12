"use client";

import MySelect from "../molecules/select/MySelect";
import { useTranslation } from "react-i18next";
import { setCookie } from "cookies-next";
import { I18N } from "@/configs/i18next/settings";

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation("translation");

  const handleLanguageChange = (langValue: string) => {
    i18n.changeLanguage(langValue);
    setCookie(I18N.cookieName, langValue);
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
