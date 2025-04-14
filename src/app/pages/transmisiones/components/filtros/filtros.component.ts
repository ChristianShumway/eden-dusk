import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TransmisionesService } from '../../../../core/services/transmisiones.service';
import { TransmisionModel } from '../../../../core/models/transmission.model';

declare let Datepicker: any;

@Component({
  selector: 'transmisiones-filtros',
  standalone: true,
  imports: [],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})
export class FiltrosComponent implements AfterViewInit {

  @ViewChild('datepicker', { static: false }) datepickerElement!: ElementRef;

  eventos: TransmisionModel[] = [];

  constructor(
    private readonly transmisionesService: TransmisionesService
  ) {}

  getTransmissionsByMonth(date: Date) {
    this.transmisionesService.getTransmissionsByMonth(date.getFullYear(), date.getMonth()).subscribe({
      next: response => {
        console.log(response);
        this.eventos = response;
        this.resaltarFechas(response);
      },
      error: error => console.error(error)
    })
  }

  ngAfterViewInit() {
    const picker = this.datepickerElement.nativeElement;

      // Espera un pequeño delay para asegurar que esté renderizado
      setTimeout(() => {
        new Datepicker(picker, {
          autohide: false,
          inline: true,
          language: 'es',
        });
      }, 100);

    setTimeout(() => {
      this.getTransmissionsByMonth(new Date());

      if (typeof window !== 'undefined' && typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(() => {
          const fechaActual = this.obtenerFechaDelCalendario();
          console.log(fechaActual);
          if (fechaActual) {
            this.getTransmissionsByMonth(fechaActual);
          }
        });

        observer.observe(picker, { childList: true, subtree: true });
      }

    }, 500);
  }

  obtenerFechaDelCalendario(): Date | null {
    const mesAnioEl = this.datepickerElement.nativeElement.querySelector('.datepicker-header');
    if (mesAnioEl) {
      const [mesTexto, anioTexto] = mesAnioEl.textContent.trim().split(' ');
      const mesIndex = new Date(`${mesTexto} 1, 2000`).getMonth(); // conviertes nombre de mes en número
      return new Date(parseInt(anioTexto), mesIndex);
    }
    return null;
  }

  resaltarEventos(fecha: Date) {
    const eventos = this.transmisionesService.getEventosPorMes(fecha.getFullYear(), fecha.getMonth());
    console.log('eventos', eventos)

    const dias = this.datepickerElement.nativeElement.querySelectorAll('[data-date]');
    dias.forEach((diaEl: HTMLElement) => {
      console.log(diaEl)
      const dia = parseInt(diaEl.textContent ?? '');
      if (eventos.includes(dia)) {
        diaEl.classList.add('bg-blue-500', 'text-white', 'rounded-full');
      } else {
        diaEl.classList.remove('bg-blue-500', 'text-white', 'rounded-full');
      }
    });
  }

  resaltarFechas(eventos: TransmisionModel[]) {
    eventos.forEach(evento => {
      const fecha = new Date(evento.date);
      const fechaUTC = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + 1);

      const fechaFormateada = fechaUTC.getTime();

      const diaElemento = this.datepickerElement.nativeElement.querySelector(`[data-date="${fechaFormateada}"]`);
      if (diaElemento) {
        diaElemento.classList.add('bg-primary-200', 'text-white', 'rounded-full');
      }
    });
  }

}
