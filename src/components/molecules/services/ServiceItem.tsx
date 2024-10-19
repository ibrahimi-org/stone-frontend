"use client";
import { IService } from "@/configs/parse/classes";
import React from "react";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

interface IProps {
  head: IService;
  index: number;
}

const variants = {
  rightOffScreen: {
    x: 300,
    opacity: 0,
  },
  leftOffScreen: {
    x: -300,
    opacity: 0,
  },
  onscreen: {
    // rotate: -10,
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 1,
    },
  },
};

const ServiceItem: React.FC<IProps> = ({ head, index }) => {
  return (
    <>
      <motion.div
        initial={index & 1 ? "rightOffScreen" : "leftOffScreen"}
        whileInView="onscreen"
        className={`w-full md:w-1/2 ${index & 1 && "md:order-2"}`}
        variants={variants}
        // viewport={{ once: false, amount: 0.9 }}
      >
        <AspectRatio ratio={16 / 10}>
          <picture>
            {head.sources?.map((src, ind) => (
              <source key={ind} {...src} />
            ))}
            <Image src={head.image!} alt={head.title} fill />
          </picture>
        </AspectRatio>
      </motion.div>
      <motion.div
        initial={index & 1 ? "leftOffScreen" : "rightOffScreen"}
        whileInView="onscreen"
        className={`w-full md:w-1/2`}
        variants={variants}
      >
        <h2 className="text-3xl font-bold line-clamp-1">{head.title}</h2>
        <p className="text-sm text-gray-600">{head.subtitle}</p>
        <p className="mt-3">{head.description}</p>
        <ul className="flex flex-col gap-y-1 ps-2">
          {head.headings?.map((head, index) => (
            <span key={head.title + index} className="flex gap-x-3 items-center">
              <span className="rounded-full pl-1.5 pb-1.5 bg-brand-solid"></span>
              <h3 className="text-sm line-clamp-1">{head.title}</h3>
            </span>
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default ServiceItem;
