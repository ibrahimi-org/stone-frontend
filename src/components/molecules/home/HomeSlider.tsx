import * as React from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import ISlider from "@/configs/parse/classes";

interface IProps {
  slides: ISlider[];
}

const HomeSlider: React.FC<IProps> = ({ slides }) => {
  return (
    <Carousel className="w-full container px-0">
      <CarouselContent className="bg-blue-200 px-0">
        {slides?.map((slide, index) => (
          <CarouselItem key={index}>
            <AspectRatio ratio={16 / 6} className="relative">
              <picture>
                {slide.sources?.map((source, ind) => (
                  <source {...source} key={ind} />
                ))}
                <Image
                  className="w-full object-cover"
                  src={slide.image}
                  alt={slide.title ?? "Image title"}
                  // layout="fill"
                  fill
                />
              </picture>
              <div className="max-w-full md:max-w-80 bg-primary-hover/50 p-2 absolute z-10 left-5  top-2/3 rounded-md">
                {slide.title && <h1 className="text-primary text-3xl">{slide.title}</h1>}
                {slide.subtitle && <p>{slide.subtitle}</p>}
                {slide.description && <p className="mt-3 line-clamp-3">{slide.description}</p>}
              </div>
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-primary-alt" />
      <CarouselNext className="bg-primary-alt" />
    </Carousel>
  );
};

export default HomeSlider;
