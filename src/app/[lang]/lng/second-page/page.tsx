import { useTranslation } from "@/configs/i18next";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page({ params }: { params: { lng: string } }) {
  const cookieStore = cookies();
  const lng = cookieStore.get("i18next");
  const { t } = await useTranslation(lng?.value ?? undefined, "second-page");

  return (
    <>
      <h1>{t("title")}</h1>
      <Link href={`/lng`}>{t("back-to-home")}</Link>

      {/* <LanguageSwitcher lng={params.lng} /> */}
    </>
  );
}
