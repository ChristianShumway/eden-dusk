import { Component, computed, inject, input, signal } from '@angular/core';
import { CommentArticleModel } from '../../../core/models/article-blog.model';
import { SvgService } from '../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { RelativeDatePipe } from '../../pipes/relative-date.pipe';
import { PathsEnum } from '../../../core/utils/paths.enum';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-comment',
  standalone: true,
  imports: [
    CommonModule,
    RelativeDatePipe
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  private readonly svgService = inject(SvgService);

  public comment = input.required<CommentArticleModel>();
  public commentComputed = computed(() => this.svgService.getTrueHtml(this.comment().comment));

  public svgStar = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.star));

  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = PathsEnum.IMAGE_AVATAR_DEFAULT;
  }

}
