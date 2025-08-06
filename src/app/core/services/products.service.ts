import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { FiltersProducts, LicenseProductModel, MaterialProductModel, OrderTypeProductModel, ProductModel, ProductTotalModel, ResponseProductModel, SizeProductModel, TypeProductModel } from "../models/products.model";

@Injectable({ providedIn: 'root' })

export class ProductsService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = PathsEnum.APIURL;
  private readonly pathCatalogs = 'api/catalogo';
  private readonly pathProducts = 'api/products';

  MOCK_SIZES: SizeProductModel[] = [
    { id: 1, value: '60 x 90 cm' },
    { id: 2, value: '80 x 120 cm' },
    { id: 3, value: '100 x 150 cm' }
  ]

  MOCK_MATERIAL: MaterialProductModel[] = [
    { id: 1, value: 'Impresión fotográfica en acrílico', subValue: 'Impreso en papel de primera calidad y montado bajo vidrio acrílico transparente de 4 mm.'  },
    { id: 2, value: 'Sólo impresión de fotografías', subValue: 'Impreso en papel premium. Se envía enrollado.' }
  ]

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

  getAllProducts(filters: FiltersProducts): Observable<ResponseProductModel> {
    let params = new HttpParams();

    if (filters.license?.id != null) {
      params = params.set('license', filters.license.id.toString());
    }

    if (filters.type?.id != null) {
      params = params.set('typeProduct', filters.type.id.toString());
    }

    if (filters.order != null) {
      params = params.set('orderBy', filters.order.toString());
    }

    if (filters.page != null) {
      params = params.set('page', filters.page.toString());
    }

    if (filters.per_page != null) {
      params = params.set('per_page', filters.per_page.toString());
    }

    if (filters.minPrice != null) {
      params = params.set('minPrice', filters.minPrice.toString());
    }

    if (filters.maxPrice != null) {
      params = params.set('maxPrice', filters.maxPrice.toString());
    }

    if (filters.search) {
      params = params.set('search', filters.search);
    }

    return this.http.get<ResponseProductModel>(
      `${this.apiUrl}/${this.pathProducts}`, { params }
    ).pipe(
      catchError( error => this.getThrowError(error))
    );
  }

  getProductById(id: number): Observable<ProductTotalModel> {
    return this.http.get<ProductTotalModel>(`${this.apiUrl}/${this.pathProducts}/${id}`)
      .pipe(
        catchError( error => this.getThrowError(error))
    );
  }

  getSizeProduct(): Observable<SizeProductModel[]>{
    return this.http.get<SizeProductModel[]>(`${this.apiUrl}/${this.pathCatalogs}/sizes`)
      .pipe(
        catchError( error => this.getThrowError(error))
      );
  }

  getMaterialProduct(): Observable<MaterialProductModel[]>{
    return this.http.get<MaterialProductModel[]>(`${this.apiUrl}/${this.pathCatalogs}/material`)
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
