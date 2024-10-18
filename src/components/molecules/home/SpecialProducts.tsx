"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/configs/i18next/i18n-client";
import { IProduct } from "@/configs/parse/classes";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  products?: IProduct[];
  lang?: string;
}
export const SpecialProduct: React.FC<IProps> = ({ products, lang }) => {
  const { t } = useTranslation("translation");
  const scrollList = useRef<HTMLUListElement | undefined>();
  const [canScrollNext, setCanScrollNext] = useState();
  const [canScrollPrev, setCanScrollPrev] = useState();

  useEffect(() => {}, []);

  const scrollNext = (e: any) => {};
  const scrollPrev = (e: any) => {};

  return (
    <section className="w-full ">
      <h1 className="text-3xl font-bold mb-5">{t("special_discount")}</h1>
      <ul
        ref={scrollList as any}
        className="bg-brand-error-secondary rounded p-5 flex flex-row gap-x-2 overflow-x-auto scroll-h-sm relative"
      >
        <Button
          variant={"link"}
          size={"icon_sm"}
          className={cn("absolute h-8 w-8 rounded-full right-3 top-1/2 -translate-y-1/2")}
          disabled={!canScrollNext}
          onClick={scrollNext}
        >
          <ArrowRightIcon className="h-4 w-4" />
          <span className="sr-only">Next Product</span>
        </Button>
        <Button
          variant={"link"}
          size={"icon_sm"}
          className={cn("absolute h-8 w-8 rounded-full eft-3 top-1/2 -translate-y-1/2")}
          disabled={!canScrollPrev}
          onClick={scrollPrev}
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="sr-only">Previous product</span>
        </Button>
        {Array(20)
          .fill(products[0])
          .map((product, index) => (
            <ProductDiscountCard product={product} key={product.id ?? index} />
          ))}
      </ul>
    </section>
  );
};

interface IProductCardProps {
  product: IProduct;
}
const ProductDiscountCard: React.FC<IProductCardProps> = ({ product }) => {
  const calcDiscountPercentage = () =>
    100 - ((product.price.discount ?? product.price.amount) / product.price.amount) * 100;

  return (
    <li>
      <div className="flex flex-col space-y-2 min-w-48">
        <AspectRatio ratio={1 / 1.2}>
          <Image src={product.image.image!} alt={product.image.title ?? product.name} fill />
        </AspectRatio>
        <h1>
          <cite>{product.name}</cite>
        </h1>
        <div className="flex text-sm gap-x-2">
          <span>{product.price.currency}</span>
          <div className="flex flex-col space-y-1 flex-grow">
            <span>
              <ins>{product.price.discount?.toLocaleString()}</ins>
            </span>
            <span className="text-disabled text-xs">
              <del>{product.price.amount?.toLocaleString()}</del>
            </span>
          </div>
          <span className="text-fg-error-primary bg-brand-error-primary h-max px-2 py-1 rounded-xl">
            {calcDiscountPercentage() + " %"}
          </span>
        </div>
      </div>
    </li>
  );
};
const ProductSuggestionCard: React.FC<IProductCardProps> = ({ product }) => {
  const calcDiscountPercentage = () => {
    const dis = (product.price.discount ?? product.price.amount / product.price.amount) * 100;
    console.log("------", dis);
    return dis;
  };
  return (
    <li>
      <div className="flex space-y-2">
        <AspectRatio ratio={1 / 1}>
          <Image className="w-32 h-32" src={product.image.image!} alt={product.image.title ?? product.name} fill />
        </AspectRatio>
        <h1>
          <cite>{product.name}</cite>
        </h1>
        <div className="flex ">
          <span>{product.price.currency}</span>
          <div className="flex flex-col space-y-3 flex-grow">
            <span>
              <ins>{product.price.discount}</ins>
            </span>
            <span>
              <del>{product.price.amount}</del>
            </span>
          </div>
          <span className="text-fg-error-primary bg-brand-error-primary px-3 py-2 rounded-xl">
            {calcDiscountPercentage()}
          </span>
        </div>
      </div>
    </li>
  );
};
