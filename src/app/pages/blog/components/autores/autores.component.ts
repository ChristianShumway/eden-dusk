import { Component, input } from '@angular/core';
import { AuthorModel } from '../../../../core/models/article-blog.model';
import { CommonModule } from '@angular/common';
import { PathsEnum } from '../../../../core/utils/paths.enum';

@Component({
  selector: 'blog-autores',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.scss'
})
export class AutoresComponent {

  public authors = input.required<AuthorModel[]>();

  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = PathsEnum.IMAGE_USER_DEFAULT;
  }

}
