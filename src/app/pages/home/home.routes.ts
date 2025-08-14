import { Routes } from "@angular/router";
import { HomeComponent } from "./page/main-home/main-home.component";

export const HOME_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: HomeComponent
  }
];
