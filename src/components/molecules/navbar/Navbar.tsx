import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useTranslation } from "@/configs/i18next/i18n-server";
import { Classes, INavigation } from "@/configs/parse/classes";
import ParseNode from "@/configs/parse/parse-node";
import { isEmpty } from "lodash-es";
import Image from "next/image";

export async function Navbar({ lang }: any) {
  const { t } = await useTranslation("translation");
  // const lang = i18n.resolvedLanguage;
  const Navigation = ParseNode.Object.extend(Classes.Navigation);
  const query = new ParseNode.Query<INavigation>(Navigation);
  const menus = await query.equalTo("place", "navbar").find();
  console.log("menus are", menus[0].attributes?.menus);
  return (
    <header className="container mx-auto flex justify-between mt-12 px-5 py-2 rounded-lg bg-accent-50/85 border-2 border-brand  drop-shadow-sm ">
      <Link href={"/"} hrefLang={lang}>
        <picture>
          <Image src="next.svg" alt={"app name"} width={200} height={200} />
        </picture>
      </Link>
      <NavigationMenu className=" ">
        <ul className="flex gap-x-4">
          {menus.map((menu, index) => (
            <NavigationMenuItem key={menu.attributes.name}>
              {menu.attributes.href && !["#", "/#"].includes(menu.attributes.href) ? (
                <NavigationMenuLink href={`/${lang}/${menu.attributes.href}`} className={navigationMenuTriggerStyle()}>
                  {t(`menus.${menu.attributes.name}`)}
                </NavigationMenuLink>
              ) : (
                <>
                  <NavigationMenuTrigger>{t(`menus.${menu.attributes.name}`)}</NavigationMenuTrigger>
                  {!isEmpty(menu.get("menus")) ? (
                    <NavigationMenuContent>
                      Some data will come.
                      {/* <NavigationContent menus={menu.get("menus")} /> */}
                    </NavigationMenuContent>
                  ) : null}
                </>
              )}
            </NavigationMenuItem>
          ))}
        </ul>
      </NavigationMenu>
    </header>
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
