import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: 'transmisiones',
    loadChildren: () => import('./pages/transmisiones/transmisiones.routes').then(m => m.TRANSMISIONES_ROUTES)
  }
];
