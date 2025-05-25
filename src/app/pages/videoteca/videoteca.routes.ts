import { Routes } from "@angular/router";
import { MainVideotecaComponent } from "./pages/main-videoteca/main-videoteca.component";
import { MainDetalleVideoComponent } from "./pages/main-detalle-video/main-detalle-video.component";

export const VIDEOTECA_ROUTES: Routes = [
  {
    path: '',
    component: MainVideotecaComponent
  },
  {
    path: ':id',
    component: MainDetalleVideoComponent
  }
]
