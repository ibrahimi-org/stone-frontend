import ServiceItem from "@/components/molecules/services/ServiceItem";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { serverFetch } from "@/configs/fetch/fetcher-server";
import { IService, QueryResult } from "@/configs/parse/classes";
import Image from "next/image";

export default async function Service({ params: { lang, slug } }: any) {
  const results = (await serverFetch(
    `/classes/Services?${new URLSearchParams({ where: JSON.stringify({ slug }) }).toString()}`
  ).then((r) => r.json())) as QueryResult<IService>;
  const service = results.results[0];

  return (
    <main className="md:h-screen scroll-hidden overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <section className="md:h-[calc(100vh-4rem)] snap-start pt-16 flex flex-col items-center space-y-5">
        <span className="flex flex-col items-center">
          <h1 className="text-3xl md:text-6xl font-bold ">{service.title}</h1>
          <p className="font-sm">{service.subtitle}</p>
        </span>
        <p className="font-md">{service.description}</p>
        <AspectRatio ratio={16 / 6} className="bg-green-300">
          <picture>
            {service.sources?.map((src, ind) => (
              <source key={ind} {...src} />
            ))}
            <Image className="w-full object-cover" src={service.image!} alt={service.title} fill />
          </picture>
        </AspectRatio>
      </section>
      {service.headings?.map((head, index) => (
        <>
          <Separator orientation="horizontal" />
          <section
            key={head.title + index}
            className={`container snap-start my-8 md:my-0 md:h-screen flex flex-col gap-y-3 md:flex-row md:gap-y-0 md:gap-x-5 md:justify-between items-center ${
              index & 1 ? "" : ""
            }`}
          >
            <ServiceItem head={head} index={index} />
          </section>
        </>
      ))}
    </main>
  );
}
