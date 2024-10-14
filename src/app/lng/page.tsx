import Link from "next/link";

import { LanguageSwitcher } from "@/components/languageSwitcher";
import { cookies } from "next/headers";

export default async function Page({ params }: { params: { lng: string } }) {
  const cookieStore = cookies();
  const lng = cookieStore.get("i18next");

  return (
    <>
      {/* <h1>{t("title")}</h1>
      <Link
        href={{ pathname: "/lng/second-page", query: { language: lng?.value } }}
      >
        {t("to-second-page")}
      </Link>
      <br />
      <Link
        href={{ pathname: "/lng/client-page", query: { language: lng?.value } }}
      >
        {t("to-client-page")}
      </Link> */}

      {/* <LanguageSwitcher lng={params.lng} /> */}
    </>
  );
}
