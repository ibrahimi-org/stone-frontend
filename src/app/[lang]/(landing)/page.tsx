import HomeSlider from "@/components/molecules/home/HomeSlider";
import { SpecialProduct } from "@/components/molecules/home/SpecialProducts";
import { serverFetch } from "@/configs/fetch/fetcher-server";
import { useTranslation } from "@/configs/i18next/i18n-server";
import ISlider, { Batch, IProduct, QueryResult } from "@/configs/parse/classes";
import { URLSearchParams } from "url";

export default async function Home({ params: { lang } }: any) {
  const { t } = await useTranslation("translation", lang);
  const requests = [
    {
      method: "GET",
      path: "/parse/classes/Slider",
    },
  ];

  const menus = (await serverFetch(
    "/classes/Slider"
    //   {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ requests: requests }),
    // }
  ).then((r) => r.json())) as QueryResult<ISlider>;
  const discountWhere = {
    "price.discount": { $exists: true },
  };
  const products = (await serverFetch(
    // `/classes/Product?where=${new URLSearchParams(JSON.stringify(discountWhere)).toString()}`
    `/classes/Product`
  ).then((r) => r.json())) as QueryResult<IProduct>;
  return (
    <div className=" ">
      <HomeSlider slides={menus.results} />
      <div className="container mt-12 ">
        <SpecialProduct products={products.results} lang={lang} />
      </div>

      <p className="text-white">{t("appName")}</p>
    </div>
  );
}
