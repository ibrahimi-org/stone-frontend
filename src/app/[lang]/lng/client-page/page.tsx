"use client";

import Link from "next/link";
import { useTranslation } from "@/configs/i18next/client";
import { useSearchParams } from "next/navigation";

export default function Page({ params }: { params: { lng: string } }) {
  const searchParams = useSearchParams();
  const language = searchParams.get("language");
  const { t } = useTranslation(language ?? undefined, "client-page");

  return (
    <>
      <h1>{t("title")}</h1>
      <Link href={`/lng`}>{t("back-to-home")}</Link>
      {/* <LanguageSwitcher lng={params.lng} /> */}
    </>
  );
}
