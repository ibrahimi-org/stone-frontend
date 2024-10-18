import { IItem, IService } from "@/configs/parse/classes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";

interface IProps {
  service: IService;
  lang?: string;
}
const ServiceCard: React.FC<IProps> = ({ service, lang }) => {
  return (
    <li key={service.slug} className="w-full md:w-64 border-2 rounded-md p-3 hover:bg-primary-hover">
      <article>
        <Link href={`/${lang}/services/${service.slug}`} hrefLang={lang}>
          <div className="flex flex-col space-y-3">
            <AspectRatio ratio={16 / 7}>
              <picture>
                {service.sources?.map((src, ind) => (
                  <source key={ind} {...src} />
                ))}
                <Image src={service.image!} alt={service.title} fill />
              </picture>
            </AspectRatio>
            <span>
              <h2 className="text-xl font-bold whitespace-nowrap">{service.title}</h2>
              <p className="text-xs whitespace-nowrap m-0 p-0">{service.subtitle}</p>
            </span>
            <p className="text-sm mt-5 line-clamp-3">{service.description}</p>
            <ul className="flex flex-col gap-y-1 ps-2">
              {service.headings?.map((head, index) => (
                <span key={head.title + index} className="flex gap-x-3 items-center">
                  <span className="rounded-full pl-1.5 pb-1.5 bg-brand-solid"></span>
                  <h3 className="text-sm line-clamp-1">{head.title}</h3>
                </span>
              ))}
            </ul>
          </div>
        </Link>
      </article>
    </li>
  );
};

export default ServiceCard;
