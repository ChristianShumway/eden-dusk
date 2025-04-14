import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { TransmisionModel } from "../models/transmission.model";


@Injectable({ providedIn: 'root' })
export class TransmisionesService {
  constructor(
    private readonly http: HttpClient
  ) {}

  // getEventsByMonth(year: number, month: number): Observable<Date[]> {
  //   return this.http.get<Date[]>(`/api/events?year=${year}&month=${month}`);
  // }

  eventos: TransmisionModel[] = [
    {
      "id": 4,
      "title": "Transmisión Abril",
      "description": "Descripción abril",
      "date": "2025-04-20T00:00:00.000Z",
      "type": "transmision",
      "imageUrl": ""
    },
    {
      "id": 5,
      "title": "Evento Abril",
      "description": "Descripción abril",
      "date": "2025-04-30T00:00:00.000Z",
      "type": "evento",
      "imageUrl": ""
    },
    {
      "id": 6,
      "title": "Evento Mayo",
      "description": "Descripción mayo",
      "date": "2025-05-15T00:00:00.000Z",
      "type": "evento",
      "imageUrl": ""
    },
    {
      "id": 7,
      "title": "Transmisión Junio",
      "description": "Descripción junio",
      "date": "2025-06-20T00:00:00.000Z",
      "type": "transmision",
      "imageUrl": ""
    }
  ]

  getTransmissionsByMonth(year: number, month: number): Observable<TransmisionModel[]> {
    return of(this.eventos);
  }

  getEventosPorMes(anio: number, mes: number): number[] {
    // Simula traer del backend, días con eventos
    console.log(anio, mes)
    if (mes === 3) return [1, 12, 16, 18]; // Abril (mes 3)
    if (mes === 4) return [2, 10, 15];  // Mayo (mes 4)
    return [];
  }


}
