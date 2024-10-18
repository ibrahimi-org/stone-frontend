import ServiceCard from "@/components/molecules/ServiceCard";
import { serverFetch } from "@/configs/fetch/fetcher-server";
import { useTranslation } from "@/configs/i18next/i18n-server";
import { IService, QueryResult } from "@/configs/parse/classes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
};

export default async function OurServicesPage({ params: { lang } }: any) {
  const { t } = await useTranslation("translation", lang);
  const services = (await serverFetch("/classes/Services").then((r) => r.json())) as QueryResult<IService>;
  return (
    <main className="container flex flex-col space-y-16">
      <h1 className="text-3xl text-center">{t("ourDiverseServices")}</h1>
      <ul className="flex flex-col md:flex-row md:flex-wrap gap-5 items-center justify-center">
        {services.results?.map((service, index) => (
          <ServiceCard lang={lang} service={service} key={service.slug + index} />
        ))}
      </ul>
    </main>
  );
}
