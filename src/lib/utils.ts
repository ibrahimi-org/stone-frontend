import { type ClassValue, clsx } from "clsx";
import { trimStart } from "lodash-es";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomString(length: number) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const getBaseApiAddress = (url: string | URL) =>
  url instanceof URL
    ? url
    : url.indexOf("://") > 0 || url.indexOf("//") === 0
    ? url
    : `${process.env.NEXT_PUBLIC_PARSE_ADDRESS}/${trimStart(url, "/")}`;
