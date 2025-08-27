import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SafeHtml } from '@angular/platform-browser';
import { NoDataComponent } from '../../../../shared/components/no-eventos/no-data.component';
import { SvgService } from '../../../../core/services/svg.service';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { ItemProyectoComponent } from '../item-proyecto/item-proyecto.component';
import { ProyectoModel } from '../../../../core/models/proyecto.model';

@Component({
  selector: 'proyectos-coleccion',
  standalone: true,
  imports: [
    CommonModule,
    BackgroundImagePipe,
    NgxPaginationModule,
    NoDataComponent,
    ItemProyectoComponent
  ],
  templateUrl: './coleccion-proyectos.component.html',
  styleUrl: './coleccion-proyectos.component.scss'
})

export class ColeccionProyectosComponent {

  private readonly svgService = inject(SvgService);

  public projects = input.required<ProyectoModel[]>();
  public projectsPerPage = input.required<number>();
  public currencyPage = input.required<number>();
  public totalProjects = input.required<number>();

  public svgAngle = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.angleRight));
  public msg = 'No hay proyectos disponibles para esta categoría.'

}
