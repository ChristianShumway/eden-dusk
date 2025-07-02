import { Routes } from "@angular/router";
import { MainProductsComponent } from "./pages/main-products/main-products.component";
import { MainProductComponent } from "./pages/main-product/main-product.component";

export const PRODUCTOS_ROUTES: Routes = [
  {
    path: '',
    component: MainProductsComponent
  },
  // {
  //   path: ':id',
  //   component: MainProductComponent
  // }
]
