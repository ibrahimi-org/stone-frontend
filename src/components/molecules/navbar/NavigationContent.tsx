"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { INavigation } from "@/configs/parse/classes";
import { isEmpty } from "lodash-es";
import Link from "next/link";
import { useState } from "react";

interface IProps {
  menus: INavigation[];
}

export const NavigationContent: React.FC<IProps> = ({ menus }) => {
  const [activeTab, setActiveTab] = useState(menus[0].name);
  return (
    <Tabs
      defaultValue={menus[0].name}
      value={activeTab}
      onValueChange={setActiveTab}
      className="h-[500px] min-w-120 flex"
    >
      <TabsList className="w-36 flex flex-col justify-start items-start h-full bg-accent-50 rounded-none ">
        {menus.map((menu, index) => (
          <TabsTrigger
            value={menu.objectId}
            key={menu.objectId}
            className="data-[state=active]:shadow-none data-[state=active]:drop-shadow-none rounded-none w-full text-start py-3 data-[state=active]:bg-white"
            onMouseEnter={() => setActiveTab(menu.objectId)}
          >
            {menu.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {menus.map((menu, index) => (
        <TabsContent value={menu.objectId} key={menu.objectId} className="p-3">
          <Link href={menu.href ?? "#"}>{menu.name}</Link>
          <nav>
            <ul>
              {menu?.menus?.map((subMenu: INavigation, indx) => (
                <SubNavigation menu={subMenu} key={subMenu.name + indx} />
              ))}
            </ul>
          </nav>
        </TabsContent>
      ))}
    </Tabs>
  );
};

interface ISubMenuProps {
  menu: INavigation;
}

const SubNavigation: React.FC<ISubMenuProps> = ({ menu }) => {
  return (
    <li>
      <Link
        href={menu.href ?? "#"}
        className="block py-3 hover:text-brand-primary select-none rounded-md p-3 leading-none no-underline outline-none transition-colors "
      >
        {menu.name}
      </Link>
      {!isEmpty(menu?.menus) && (
        <ul className="ps-3">
          {menu?.menus?.map((sub, index) => (
            <SubNavigation menu={sub} key={sub.name + index} />
          ))}
        </ul>
      )}
    </li>
  );
};
