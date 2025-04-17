import { AfterViewInit, Component, ElementRef, input, OnChanges, output, SimpleChanges, ViewChild } from '@angular/core';
import { TransmisionModel } from '../../../../core/models/transmission.model';

declare let Datepicker: any;

@Component({
  selector: 'transmisiones-filtros',
  standalone: true,
  imports: [],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})
export class FiltrosComponent implements AfterViewInit, OnChanges {

  @ViewChild('datepicker', { static: false }) datepickerElement!: ElementRef;
  public eventos = input.required<TransmisionModel[]>();
  public newDate = output<Date>();


  onGetTransmissions(date: Date) {
    this.newDate.emit(date);
  }

  ngAfterViewInit() {
    const pickerElement = this.datepickerElement.nativeElement;

    setTimeout(() => {

      if (typeof window !== 'undefined' && typeof Datepicker !== 'undefined') {
        new Datepicker(pickerElement, {
          autohide: false,
          inline: true,
          language: 'es',
          i18n: {
            es: {
              months: [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
              ],
              days: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
              today: 'Hoy',
              clear: 'Limpiar',
              close: 'Cerrar',
            }
          }
        });
      }


      if(this.eventos) {
        this.resaltarFechas(this.eventos());
      }

      if (typeof window !== 'undefined' && typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(() => {
          const fechaActual = this.obtenerFechaDelCalendario();
          if (fechaActual) {
            this.onGetTransmissions(fechaActual);
          }
        });

        observer.observe(pickerElement, { childList: true, subtree: true });
      }

    }, 500);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventos'] && !changes['eventos'].firstChange) {
      this.resaltarFechas(this.eventos());
    }
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

  resaltarFechas(eventos: TransmisionModel[]) {
    const dias = this.datepickerElement.nativeElement.querySelectorAll('[data-date]');
    dias.forEach((diaEl: HTMLElement) => {
      diaEl.classList.remove('bg-primary-200', 'text-white', 'rounded-full');
    });

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

  // resaltarEventos(fecha: Date) {
  //   const eventos = this.transmisionesService.getEventosPorMes(fecha.getFullYear(), fecha.getMonth());
  //   console.log('eventos', eventos)

  //   const dias = this.datepickerElement.nativeElement.querySelectorAll('[data-date]');
  //   dias.forEach((diaEl: HTMLElement) => {
  //     console.log(diaEl)
  //     const dia = parseInt(diaEl.textContent ?? '');
  //     if (eventos.includes(dia)) {
  //       diaEl.classList.add('bg-blue-500', 'text-white', 'rounded-full');
  //     } else {
  //       diaEl.classList.remove('bg-blue-500', 'text-white', 'rounded-full');
  //     }
  //   });
  // }


}
