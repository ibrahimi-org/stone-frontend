import { useTranslation } from "@/configs/i18next/i18n-server";

export default async function Home({ params: { lang } }: any) {
  const { t } = await useTranslation("translation", lang);
  return (
    <div className="container ">
      <p className="text-white">{t("appName")}</p>
    </div>
  );
}
