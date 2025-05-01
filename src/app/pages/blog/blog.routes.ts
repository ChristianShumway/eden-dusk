import { Routes } from "@angular/router";
import { MainBlogComponent } from "./page/main-blog/main-blog.component";
import { MainArticuloComponent } from "./page/main-articulo/main-articulo.component";

export const BLOG_ROUTES: Routes  = [
  {
    path: '',
    component: MainBlogComponent
  },
  {
    path: ':id',
    component: MainArticuloComponent
  }
];
