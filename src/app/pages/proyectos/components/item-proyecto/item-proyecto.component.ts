import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { RecentDatePipe } from '../../../../shared/pipes/recent-date.pipe';
import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { ProyectoModel } from '../../../../core/models/proyecto.model';

@Component({
  selector: 'proyecto-item',
  standalone: true,
  imports: [
    BackgroundImagePipe,
    RecentDatePipe
  ],
  templateUrl: './item-proyecto.component.html',
  styleUrl: './item-proyecto.component.scss'
})

export class ItemProyectoComponent {

  private readonly router = inject(Router);
  private readonly svgService = inject(SvgService);

  public project = input.required<ProyectoModel>();
  public svgCamera = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.camera));

  goTo(id: number) {
    this.router.navigate(['/videoteca', id]);
  }

}
