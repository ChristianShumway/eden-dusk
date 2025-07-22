import { MaterialProductModel, SizeProductModel } from "./products.model";

export interface CartItem {
  productId: number;
  name: string;
  image: string;
  size: SizeProductModel;
  material: MaterialProductModel;
  quantity: number;
  price: number;
}
