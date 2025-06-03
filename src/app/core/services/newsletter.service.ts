import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { PathsEnum } from "../utils/paths.enum";
import { RequestNewsLetter, ResponseNewsLetter } from "../models/news-letter.model";

@Injectable({ providedIn: 'root' })

export class NewsLetterService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = PathsEnum.APIURL;
  private readonly patNews = 'api/newslatter';

  suscribeNewsLetter(request: RequestNewsLetter): Observable<ResponseNewsLetter> {
    return this.http.post<ResponseNewsLetter>(`${this.apiUrl}/${this.patNews}`, request)
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
