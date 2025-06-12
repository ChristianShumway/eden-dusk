import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { VideotecaModel } from '../../../../core/models/videoteca.model';

@Component({
  selector: 'videoteca-item-video',
  standalone: true,
  imports: [
    BackgroundImagePipe
  ],
  templateUrl: './item-videoteca.component.html',
  styleUrl: './item-videoteca.component.scss'
})
export class ItemVideotecaComponent {

  private readonly router = inject(Router);

  public video = input.required<VideotecaModel>();

  goTo(id: number) {
    this.router.navigate(['/videoteca', id]);
  }

}
