export interface INavMenu {
  name: string;
  href?: string;
  icon?: string;
  desc?: string;
  menus?: INavMenu[];
}
