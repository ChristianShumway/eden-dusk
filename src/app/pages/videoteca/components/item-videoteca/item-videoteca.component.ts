import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { VideotecaModel } from '../../../../core/models/videoteca.model';
import { RecentDatePipe } from '../../../../shared/pipes/recent-date.pipe';
import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';

@Component({
  selector: 'videoteca-item-video',
  standalone: true,
  imports: [
    BackgroundImagePipe,
    RecentDatePipe
  ],
  templateUrl: './item-videoteca.component.html',
  styleUrl: './item-videoteca.component.scss'
})
export class ItemVideotecaComponent {

  private readonly router = inject(Router);
  private readonly svgService = inject(SvgService);

  public video = input.required<VideotecaModel>();
  public svgCamera = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.camera));

  goTo(id: number) {
    this.router.navigate(['/videoteca', id]);
  }

}
