import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SafeHtml } from '@angular/platform-browser';
import { NoDataComponent } from '../../../../shared/components/no-eventos/no-data.component';
import { SvgService } from '../../../../core/services/svg.service';
import { VideotecaModel } from '../../../../core/models/videoteca.model';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { ItemVideotecaComponent } from '../item-videoteca/item-videoteca.component';

@Component({
  selector: 'videoteca-coleccion',
  standalone: true,
  imports: [
    CommonModule,
    BackgroundImagePipe,
    NgxPaginationModule,
    NoDataComponent,
    ItemVideotecaComponent
  ],
  templateUrl: './coleccion-videoteca.component.html',
  styleUrl: './coleccion-videoteca.component.scss'
})

export class ColeccionVideotecaComponent {

  private readonly svgService = inject(SvgService);

  public videos = input.required<VideotecaModel[]>();
  public videosPerPage = input.required<number>();
  public currencyPage = input.required<number>();
  public totalVideos = input.required<number>();

  public svgAngle = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.angleRight));
  public msg = 'No hay videos disponibles para esta categoría.'

}
