import { Attributes, Object } from "parse/node";

export class Classes {
  public static User = "_User";
  public static Role = "_Role";
  public static Category = "Category";
  public static Product = "Product";
  public static Navigation = "Navigation";
}

export interface INavigation extends Object<Attributes> {
  name: string;
  href?: string;
  icon?: string;
  desc?: string;
  menus?: INavigation[];
}
