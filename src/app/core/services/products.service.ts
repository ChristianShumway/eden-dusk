import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { FiltersProducts, LicenseProductModel, OrderTypeProductModel, ProductModel, TypeProductModel } from "../models/products.model";

@Injectable({ providedIn: 'root' })

export class ProductsService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = PathsEnum.APIURL;
  private readonly pathCatalogs = 'api/catalogo';
  private readonly pathProducts = 'api/products';

  MOCK_PRODUCTS: ProductModel[] = [
  {
    id: 1,
    date: '2025/07/01',
    sourceUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
    description: 'Diseño moderno y limpio para campañas digitales.',
    name: 'Plantilla Digital Pro',
    price: '29.99',
    license: 1,
    type: 2,
    size: '1920x1080',
  },
  {
    id: 2,
    date: '2025/07/02',
    sourceUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
    description: 'Set de íconos minimalistas para interfaces web.',
    name: 'Icon Pack UI',
    price: '14.50',
    license: 2,
    type: 1,
    size: '512x512',
  },
  {
    id: 3,
    date: '2025/07/03',
    sourceUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
    description: 'Mockup de camiseta en PSD editable para branding.',
    name: 'Mockup Camiseta',
    price: '9.99',
    license: 1,
    type: 3,
    size: '3000x2000',
  },
  {
    id: 4,
    date: '2025/07/04',
    sourceUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
    description: 'Plantilla responsive para landing pages.',
    name: 'Landing Clean',
    price: '24.00',
    license: 3,
    type: 2,
    size: '1920x1080',
  },
  {
    id: 5,
    date: '2025/07/05',
    sourceUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
    description: 'Animación SVG para loaders o iconos animados.',
    name: 'Loader Animado',
    price: '5.00',
    license: 1,
    type: 1,
    size: '128x128',
  },
  {
    id: 6,
    date: '2025/07/06',
    sourceUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
    description: 'Set de fuentes para proyectos editoriales.',
    name: 'Tipografías Creativas',
    price: '19.90',
    license: 2,
    type: 3,
    size: 'N/A',
  }
  ];

  getLicensesType(): Observable<LicenseProductModel[]> {
    return this.http.get<LicenseProductModel[]>(`${this.apiUrl}/${this.pathCatalogs}/licencias`)
      .pipe(
        catchError( error => this.getThrowError(error))
      );
  }

  getProductTypes(): Observable<TypeProductModel[]> {
    return this.http.get<TypeProductModel[]>(`${this.apiUrl}/${this.pathCatalogs}/tipoproducto`)
      .pipe(
        catchError( error => this.getThrowError(error))
      );
  }

  getOrderProductType(): Observable<OrderTypeProductModel[]> {
    return this.http.get<OrderTypeProductModel[]>(`${this.apiUrl}/${this.pathCatalogs}/ordenarpor`)
      .pipe(
        catchError( error => this.getThrowError(error))
      );
  }

  getAllProducts(filters: FiltersProducts): Observable<ProductModel[]> {
    return of (this.MOCK_PRODUCTS)
  }

  private getThrowError(error: any) {
    const statusCode = error.status;
    switch (statusCode) {
      case 401:
        return throwError(() => 'Acceso no autorizado');
      case 404:
        return throwError(() => 'Endpoint no encontrado');
      default:
        break;
    }
    return throwError(() => error.statusText)
  }




}
