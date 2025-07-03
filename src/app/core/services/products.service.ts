import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { LicenseProductModel, OrderTypeProductModel, TypeProductModel } from "../models/products.model";

@Injectable({ providedIn: 'root' })

export class ProductsService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = PathsEnum.APIURL;
  private readonly pathBlog = 'api/products';

  private readonly LICENSES_DUMMY: LicenseProductModel[] = [
    {
      id: 'comercial',
      label: 'Uso Comercial'
    },
    {
      id: 'personal',
      label: 'Uso Personal'
    }
  ];

  private readonly TYPE_DUMMY: TypeProductModel[] = [
    {
      id: 'galeria',
      label: 'Galeria'
    },
    {
      id: 'playera',
      label: 'Playera'
    },
    {
      id: 'taza',
      label: 'Taza'
    }
  ];

  private readonly ORDERTYPE_DUMMY: OrderTypeProductModel[] = [
    {
      id: '',
      label: 'Default'
    },
    {
      id: 'populares',
      label: 'Populares'
    },
    {
      id: 'raiting',
      label: 'Mejor raiting'
    },
    {
      id: 'ultimos',
      label: 'Últimos'
    },
    {
      id: 'menosprecio',
      label: 'Menor a mayor precio'
    },
    {
      id: 'mayorprecio',
      label: 'Mayor a menor precio'
    }
  ];



  getLicensesType(): Observable<LicenseProductModel[]> {
    return of (this.LICENSES_DUMMY);
  }

  getProductTypes(): Observable<TypeProductModel[]> {
    return of (this.TYPE_DUMMY);
  }

  getOrderProductType(): Observable<OrderTypeProductModel[]> {
    return of (this.ORDERTYPE_DUMMY);
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
