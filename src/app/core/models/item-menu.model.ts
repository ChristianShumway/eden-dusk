export interface MenuItemModel {
  name: string;
  path?: string;
  visible?: boolean;
  children?: { name: string; path: string }[];
}
