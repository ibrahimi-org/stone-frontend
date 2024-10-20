import HomeSlider from "@/components/molecules/home/HomeSlider";
import { serverFetch } from "@/configs/fetch/fetcher-server";
import { Batch, ICategory, ISlider, QueryResult } from "@/configs/parse/classes";

interface IProps {
  params: {
    lang: string;
    slug: string;
  };
}
export default async function CategoryPage({ params: { lang, slug } }: IProps) {
  let sliders: ISlider[];
  try {
    const query = {
      where: { slug },
    };
    const categories = (await serverFetch("/classes/Category", { query }).then((r) =>
      r.json()
    )) as QueryResult<ICategory>;

    const category = categories?.results[0] ?? null;
    console.log("-----------------------------------------", category);
    const requests = [
      {
        method: "GET",
        path: "/parse/classes/Slider",
        body: {
          where: { place: "category", parentId: category?.objectId },
        },
      },
      {
        method: "GET",
        path: "/parse/classes/Product",
        body: {
          where: { categories: "category", parentSlug: slug },
        },
      },
    ];
    const res = (await serverFetch("/batch", {
      method: "POST",
      body: JSON.stringify({ requests }),
    }).then((r) => r.json())) as Batch<QueryResult>[];
    sliders = res[0].success.results as ISlider[];
  } catch (error) {
    console.error("error in page", error);
  }
  return (
    <main>
      <header>
        <HomeSlider slides={sliders!} />
      </header>
    </main>
  );
}
