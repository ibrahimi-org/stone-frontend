import { AspectRatio } from "@/components/ui/aspect-ratio";
import { serverFetch } from "@/configs/fetch/fetcher-server";
import { IService, QueryResult } from "@/configs/parse/classes";
import Image from "next/image";

export default async function Service({ params: { lang, slug } }: any) {
  const results = (await serverFetch(
    `/classes/Services?${new URLSearchParams({ where: JSON.stringify({ slug }) }).toString()}`
  ).then((r) => r.json())) as QueryResult<IService>;
  const service = results.results[0];
  return (
    <main className="container">
      <article className="w-full">
        <section className="h-screen flex flex-col items-center space-y-5">
          <span className="flex flex-col items-center">
            <h1 className="text-3xl md:text-6xl font-bold ">{service.title}</h1>
            <p className="font-sm">{service.subtitle}</p>
          </span>
          <p className="font-md">{service.description}</p>
          <AspectRatio ratio={16 / 7}>
            <picture>
              {service.sources?.map((src, ind) => (
                <source key={ind} {...src} />
              ))}
              <Image src={service.image!} alt={service.title} fill />
            </picture>
          </AspectRatio>
        </section>
        {service.headings?.map((head, index) => (
          <section
            key={head.title + index}
            className={`h-screen flex flex-col gap-y-5 md:flex-row md:gap-y-0 md:gap-x-5 md:justify-between items-center ${
              index & 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <AspectRatio ratio={16 / 10}>
              <picture>
                {head.sources?.map((src, ind) => (
                  <source key={ind} {...src} />
                ))}
                <Image src={head.image!} alt={head.title} fill />
              </picture>
            </AspectRatio>
            <div>
              <h2 className="text-3xl font-bold line-clamp-1">{head.title}</h2>
              <p className="text-sm text-gray-600">{head.subtitle}</p>
              <p>{head.description}</p>
              <ul className="flex flex-col gap-y-1 ps-2">
                {head.headings?.map((head, index) => (
                  <span key={head.title + index} className="flex gap-x-3 items-center">
                    <span className="rounded-full pl-1.5 pb-1.5 bg-brand-solid"></span>
                    <h3 className="text-sm line-clamp-1">{head.title}</h3>
                  </span>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </article>
    </main>
  );
}
