import get from "lodash-es/get";
import groupBy from "lodash-es/groupBy";
import map from "lodash-es/map";
import trimStart from "lodash-es/trimStart";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import trim from "lodash-es/trim";

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

export const getBaseApiUrl = (url: string | URL): URL =>
  url instanceof URL
    ? url
    : url.indexOf("://") > 0 || url.indexOf("//") === 0
    ? new URL(url)
    : new URL(`${process.env.NEXT_PUBLIC_PARSE_ADDRESS}/${trimStart(url, "/")}`);

// Function to organize hierarchy
export function organizeHierarchy<T = any>(
  items: any[],
  as: string = "items",
  iteratee: string = "parent",
  parentField: string = "objectId"
): T[] {
  // Group items by parent id
  const groupedByParent = groupBy(items, (o) => get(o, iteratee, null));

  // Recursive function to assign child items to their parents
  const buildTree = (pId = null): T[] => {
    //@ts-ignore
    return map(groupedByParent[pId] || [], (item) => {
      // Recursively find and assign children
      item[as] = buildTree(get(item, parentField));
      return item;
    });
  };

  // Start with items whose parent is null (top-level items)
  return buildTree();
}

export function joinForUrl(...urls: string[]): string {
  return urls.map((s, i) => (i == 0 ? "/" + trim(s, "/") : trim(s, "/"))).join("/");
}
