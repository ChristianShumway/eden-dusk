import { Routes } from "@angular/router";
import { MainGalleryComponent } from "./pages/main-gallery/main-gallery.component";
import { DetalleImagenComponent } from "./pages/detalle-imagen/detalle-imagen.component";

export const GALLERY_ROUTES: Routes  = [
  {
    path: '',
    component: MainGalleryComponent
  },
  {
    path: ':id',
    component: DetalleImagenComponent
  },

];
