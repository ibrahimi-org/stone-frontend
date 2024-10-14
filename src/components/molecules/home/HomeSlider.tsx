import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ISlider from "@/lib/models/Slide";
import Image from "next/image";

interface IProps {
  slides: ISlider[];
}

const HomeSlider: React.FC<IProps> = ({ slides }) => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <picture>
                <Image
                  className="w-full object-cover"
                  src={slide.image}
                  alt={slide.title ?? "Image title"}
                  width={1920}
                  height={835}
                />
              </picture>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default HomeSlider;
