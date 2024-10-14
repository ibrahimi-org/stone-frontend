"use client";
import MySelect from "@/components/molecules/select/MySelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { startCase } from "lodash-es";
import React from "react";
import { CgMoon, CgSun } from "react-icons/cg";
import { SelectOptions } from "../../../../public/data/select-data";
import { LanguageSwitcher } from "@/components/molecules/LangSwitcher";
import { useTranslation } from "react-i18next";

interface Com {
  Component: React.ComponentType;
  isVoid?: boolean;
  className?: string;
  props?: any;
  shapes?: {
    [key: string]: {
      name: React.ReactNode;
      [key: string]: any;
    }[];
  };
}

interface Coms {
  [key: string]: Com;
}

const components: Coms = {
  Button: {
    Component: Button,
    shapes: {
      variant: [
        { name: "primary" },
        { name: "secondaryGray" },
        { name: "secondaryColor" },
        { name: "tertiaryGray" },
        { name: "tertiaryColor" },
        { name: "linkGray" },
        { name: "linkColor" },
        { name: "destructivePrimary" },
        { name: "secondary" },
        { name: "tertiary" },
        { name: "link" },
      ],
      size: [
        { name: "sm", children: <CgSun /> },
        { name: "md", children: <CgSun /> },
        { name: "lg", children: <CgSun /> },
        { name: "xl", children: <CgSun /> },
        { name: "2xl", children: <CgSun /> },
        { name: "icon_sm", children: <CgSun /> },
        { name: "icon_md", children: <CgSun /> },
        { name: "icon_lg", children: <CgSun /> },
        { name: "icon_xl", children: <CgSun /> },
        { name: "icon_2xl", children: <CgSun /> },
      ],
    },
  },
  Input: {
    Component: Input,
    isVoid: true,
    shapes: {
      size: [{ name: "sm" }, { name: "md" }],
      type: [
        { name: "text" },
        { name: "number" },
        { name: "email" },
        { name: "tel" },
        { name: "tel" },
      ],
      Leading: [
        { name: <CgSun /> },
        { name: <p>https://</p> },
        { name: <CgMoon />, useLeadingDivider: false },
      ],
      Trailing: [
        { name: <CgSun /> },
        { name: <p>GB</p> },
        { name: <CgMoon />, useTrailingDivider: false },
      ],
    },
  },
  Select: {
    Component: MySelect,
    props: { options: SelectOptions, placeholder: "Select One" },
    shapes: {
      selectSize: [{ name: "sm" }, { name: "md" }],
    },
  },
};

export default function Components(req: any) {
  const { t } = useTranslation("second-page");
  return (
    <main className="container mx-auto">
      <h1>App name {t("appName")}</h1>
      <LanguageSwitcher />
      <Tabs defaultValue={"Button"}>
        <TabsList>
          {Object.entries(components).map(([key, obj], index) => (
            <TabsTrigger value={key} key={key}>
              {key}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(components).map(([key, obj], index) => (
          <TabsContent value={key} key={key}>
            <h1>{key}</h1>
            {obj.isVoid ? (
              <obj.Component
                className={obj?.className}
                {...(obj?.props || {})}
              />
            ) : (
              <obj.Component className={obj?.className} {...(obj?.props || {})}>
                {key}
              </obj.Component>
            )}
            <div className="flex flex-col gap-y-8">
              {obj.shapes &&
                Object.entries(obj.shapes).map(([shapeKey, shapes], ind) => (
                  <div
                    key={shapeKey + ind}
                    className="flex flex-col space-y-3 border-b border-gray-300 pb-8"
                  >
                    <h1 className="text-3xl">{startCase(shapeKey)}</h1>
                    <div className="flex gap-5 flex-wrap">
                      {shapes.map((shape) =>
                        obj.isVoid ? (
                          <obj.Component
                            key={shapeKey + ind}
                            {...(obj?.props || {})}
                            {...{ [shapeKey]: shape.name }}
                            {...shape}
                          />
                        ) : (
                          <obj.Component
                            key={shapeKey + ind}
                            {...(obj?.props || {})}
                            {...{ [shapeKey]: shape.name }}
                            {...shape}
                          >
                            {shape.children ??
                              startCase(shapeKey) + " " + shape.name}
                          </obj.Component>
                        )
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
