import { Component, inject, OnInit, signal } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { QuienEsEdenDuskComponent } from '../../components/quien-es-eden-dusk/quien-es-eden-dusk.component';
import { PreviewPortfolioComponent } from '../../components/preview-portfolio/preview-portfolio.component';
import { PreviewStoreComponent } from '../../components/preview-store/preview-store.component';
import { NovedadesComponent } from '../../components/novedades/novedades.component';
import { NewsLetterComponent } from '../../components/news-letter/news-letter.component';
import { EventosTransmisionesComponent } from '../../components/eventos-transmisiones/eventos-transmisiones.component';
import { TransmisionModel } from '../../../../core/models/transmission.model';
import { TransmisionesService } from '../../../../core/services/transmisiones.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LayoutComponent,
    QuienEsEdenDuskComponent,
    PreviewPortfolioComponent,
    PreviewStoreComponent,
    NovedadesComponent,
    NewsLetterComponent,
    EventosTransmisionesComponent
  ],
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly transmisionesService = inject(TransmisionesService);

  public eventos = signal<TransmisionModel[]>([]);
  public eventosPasados = signal<TransmisionModel[]>([]);
  public dateToSearh = new Date();

  ngOnInit(): void {
    this.getAllTransmissions(this.dateToSearh);
    this.getLastTransmissions();
  }


  getAllTransmissions(date: Date) {
    this.transmisionesService.getAllTransmissions().subscribe({
      next: response => {
        this.eventos.set([...response]);
      },
      error: error => console.error(error)
    })
  }

  getLastTransmissions() {
    this.transmisionesService.getLastTransmissions().subscribe({
      next: response => {
        this.eventosPasados.set([...response]);
      },
      error: error => console.error(error)
    })
  }

}
