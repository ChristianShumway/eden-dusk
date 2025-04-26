import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { TransmisionModel } from "../models/transmission.model";
import { PathsEnum } from "../utils/paths.enum";
@Injectable({ providedIn: 'root' })

export class TransmisionesService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = PathsEnum.APIURL;
  private readonly pathTransmissions = 'api/events';
  private readonly pathLastTransmissions = 'api/events/findPastEvents';

  getTransmissionsByMonth(date: Date): Observable<TransmisionModel[]> {
    const setDate =  this.setDate(new Date(date));
    return this.http.get<TransmisionModel[]>(`${this.apiUrl}/${this.pathTransmissions}?month='${setDate}'`);
  }

  getLastTransmissions(): Observable<TransmisionModel[]> {
    return this.http.get<TransmisionModel[]>(`${this.apiUrl}/${this.pathLastTransmissions}`);
  }

  setDate(date: Date) {
    console.log(date)
    let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`

    return`${date.getFullYear()}-${month}-${day}`;
  }



}
