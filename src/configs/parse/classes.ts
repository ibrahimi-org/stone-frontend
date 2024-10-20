export class Classes {
  public static User = "_User";
  public static Role = "_Role";
  public static Category = "Category";
  public static Product = "Product";
  public static Navigation = "Navigation";
  public static Slider = "Slider";
}

export type QueryResult<T = any> = {
  results: T[];
  count?: number;
};

export type IObject = {
  objectId: string;
  createdAt: string;
  updatedAt: string;
};

export type IPointer = {
  __type: "Pointer";
  className: string;
  objectId: string;
};
export type Batch<T = any> = {
  success: T;
  error?: {
    code: number;
    error: string;
  };
};

export type IItem = {
  title: string;
  subtitle?: string;
  description?: string;
  slug: string;
  image?: string;
  sources?: ISource[];
};

export type IService = IItem & {
  headings: IService[];
};

export type INavigation = IObject & {
  name: string;
  href?: string;
  icon?: string;
  desc?: string;
  menus?: INavigation[];
};

export type ISource = {
  srcSet: string;
  // media?: string;

  [key: string]: string;
};
export type ISlider = IItem;

export type ICategory = IObject & {
  name: string;
  slug: string;
  parent?: ICategory | IPointer;
  desc?: string;
  icon?: string;
};

type Price = {
  amount: number; // original price
  currency: string; // currency
  discount?: number; // price with applied discount
};

export type IProduct = {
  id: string;
  name: string;
  slug: string;
  price: Price;
  description: string;
  category: ICategory | string;
  stock: string;
  specifications: [];
  categories: ICategory[] | string[];
  image: ISlider;
  images: ISlider;
  videos: [];
  locale: string;
  code: string;
  specialDiscount: number;
  specialOffer: number;
};
