import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { LicenseProductModel, OrderTypeProductModel, TypeProductModel } from "../models/products.model";

@Injectable({ providedIn: 'root' })

export class ProductsService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = PathsEnum.APIURL;
  private readonly pathCatalogs = 'api/catalogo';
  private readonly pathProducts = 'api/products';

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
