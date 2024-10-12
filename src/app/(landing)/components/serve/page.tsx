import { useTranslation } from "@/configs/i18next/i18n-server";

export default async function ServerPage() {
  const t = await useTranslation("second-page");
  return (
    <div>
      <p>{t("appName")}</p>
    </div>
  );
}
