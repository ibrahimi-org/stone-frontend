import Link from "next/link";
import * as React from "react";

import { cn, joinForUrl, organizeHierarchy } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { serverFetch } from "@/configs/fetch/fetcher-server";
import { useTranslation } from "@/configs/i18next/i18n-server";
import { Batch, ICategory, INavigation, IPointer, QueryResult } from "@/configs/parse/classes";
import { isEmpty } from "lodash-es";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import ThemeToggler from "../ThemeToggler";
import { LanguageSwitcher } from "../LangSwitcher";
import { dir } from "i18next";
import { NavigationContent } from "./NavigationContent";

export async function Navbar({ lang }: any) {
  const { t } = await useTranslation("translation");
  let menus: INavigation[] = [];
  try {
    const requests = [
      {
        method: "GET",
        path: `/parse/classes/Category`,
        body: {
          where: { class: "Product" },
        },
      },

      {
        method: "GET",
        path: "/parse/classes/Navigation",
        body: {},
      },
    ];
    const test = (await serverFetch("/batch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requests }),
    }).then((r) => r.json())) as Batch<QueryResult>[];

    let categories = (test[0].success.results as ICategory[]).map<INavigation>((i) => ({
      name: i.name,
      desc: i.desc,
      href: joinForUrl(lang, "category", i.slug),
      icon: i.icon,
      parent: (i.parent as IPointer)?.objectId,
      objectId: i.objectId,
      createdAt: i.createdAt,
      updatedAt: i.updatedAt,
    }));
    console.log("categories", categories);
    categories = organizeHierarchy<ICategory>(categories, "menus", "parent", "objectId") as ICategory[];
    console.log("categories", categories);
    menus = test[1].success.results as INavigation[];
    const category = menus.find((m) => m.name === "category");
    if (category) category.menus = categories;
  } catch (error) {
    console.log("error in navbar", error);
  }

  return (
    <div className="pb-20 relative">
      <header className="absolute top-0 left-0 right-0 container z-50 mx-auto flex justify-between px-5 py-2 rounded-lg bg-accent-50/50 border-2 border-brand  drop-shadow-sm ">
        <div className="flex items-center">
          <Link href={"/"} hrefLang={lang}>
            <picture>
              <Image src="/next.svg" alt={"app name"} width={200} height={200} />
            </picture>
          </Link>
          <Separator orientation="vertical" className="mx-3" />
          <NavigationMenu className=" " dir={dir(lang)}>
            <ul className="flex gap-x-4">
              {menus?.map((menu, index) => (
                <NavigationMenuItem key={menu.name}>
                  {menu.href && !["#", "/#"].includes(menu.href) ? (
                    <NavigationMenuLink href={`/${lang}${menu.href}`} className={navigationMenuTriggerStyle()}>
                      {t(`menus.${menu.name}`)}
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger>{t(`menus.${menu.name}`)}</NavigationMenuTrigger>
                      {!isEmpty(menu.menus) ? (
                        <NavigationMenuContent className="bg-primary">
                          <NavigationContent menus={menu.menus!} />
                        </NavigationMenuContent>
                      ) : null}
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </ul>
          </NavigationMenu>
        </div>

        <div className="flex gap-x-5 items-center">
          <ThemeToggler />
          <LanguageSwitcher lang={lang} />
        </div>
      </header>
    </div>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
