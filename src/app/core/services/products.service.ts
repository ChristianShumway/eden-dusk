import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { LicenseProductModel } from "../models/products.model";

@Injectable({ providedIn: 'root' })

export class ProductsService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = PathsEnum.APIURL;
  private readonly pathBlog = 'api/products';

  private readonly LICENSES_DUMMY: LicenseProductModel[] = [
    {
      id: 1,
      label: 'comercial',
      name: 'Uso Comercial'
    },
    {
      id: 2,
      label: 'personal',
      name: 'Uso Personal'
    }
  ];


  getLicensesType(): Observable<LicenseProductModel[]> {
    return of (this.LICENSES_DUMMY);
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
