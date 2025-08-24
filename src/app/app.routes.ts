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
    path: 'trayectoria',
    loadChildren: () => import('./pages/nosotros/nosotros.routes').then(m => m.NOSOTROS_ROUTES)
  },
  {
    path: 'blog',
    loadChildren: () => import('./pages/blog/blog.routes').then(m => m.BLOG_ROUTES)
  },
  {
    path: 'galeria',
    loadChildren: () => import('./pages/galeria/galeria.routes').then(m => m.GALLERY_ROUTES)
  },
  {
    path: 'videoteca',
    loadChildren: () => import('./pages/videoteca/videoteca.routes').then(m => m.VIDEOTECA_ROUTES)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./pages/servicios/servicios.routes').then(m => m.SERVICIOS_ROUTES)
  },
  {
    path: 'tienda',
    loadChildren: () => import('./pages/productos/productos.routes').then(m => m.PRODUCTOS_ROUTES)
  },
  {
    path: 'enlaces',
    loadChildren: () => import('./pages/enlaces/enlaces.routes').then(m => m.ENLACES_ROUTES)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.routes').then(m => m.CONTACTO_ROUTES)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/cart/cart.routes').then(m => m.CART_ROUTES)
  }
];
