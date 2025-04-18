import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: 'transmisiones',
    loadChildren: () => import('./pages/transmisiones/transmisiones.routes').then(m => m.TRANSMISIONES_ROUTES)
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./pages/nosotros/nosotros.routes').then(m => m.NOSOTROS_ROUTES)
  },
  {
    path: 'blog',
    loadChildren: () => import('./pages/blog/blog.routes').then(m => m.BLOG_ROUTES)
  }
];
