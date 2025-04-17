import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FiltrosComponent } from '../../components/filtros/filtros.component';
import { EventosProximosComponent } from '../../components/eventos-proximos/eventos-proximos.component';
import { EventosPasadosComponent } from '../../components/eventos-pasados/eventos-pasados.component';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { TransmisionesService } from '../../../../core/services/transmisiones.service';
import { TransmisionModel } from '../../../../core/models/transmission.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-transmisiones',
  standalone: true,
  imports: [
    FiltrosComponent,
    EventosProximosComponent,
    EventosPasadosComponent,
    BackgroundImagePipe,
    CommonModule
  ],
  templateUrl: './main-transmisiones.component.html',
  styleUrl: './main-transmisiones.component.scss'
})

export class MainTransmisionesComponent implements OnInit {

  private readonly transmisionesService = inject(TransmisionesService);

  @ViewChild('lastEvents') lastEvents!: EventosPasadosComponent; //referencia a métodos y variables del componente eventos pasados

  public urlImageBackground: string = 'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  public eventos = signal<TransmisionModel[]>([]);
  public dateToSearh = new Date();

  ngOnInit(): void {
    this.getTransmissionsByMonth(this.dateToSearh);
  }

  getTransmissionsByMonth(date: Date) {
    this.transmisionesService.getTransmissionsByMonth(date.getFullYear(), date.getMonth()).subscribe({
      next: response => {
        this.eventos.set([...response]);
      },
      error: error => console.error(error)
    })
  }

  onNewDateEvents(date: any) {
    this.getTransmissionsByMonth(date);
    this.dateToSearh = date;
    this.scrollSuave();
  }

  scrollSuave(): void {
    window.scrollBy({
      top: 800,
      behavior: 'smooth' // hace que el scroll sea suave
    });
  }

  scrollToLastEvents() {
    this.lastEvents.scrollToMe();
  }

}
