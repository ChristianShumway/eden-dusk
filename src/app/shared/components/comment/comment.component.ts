import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommentArticleModel } from '../../../core/models/article-blog.model';
import { SvgService } from '../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { RelativeDatePipe } from '../../pipes/relative-date.pipe';

@Component({
  selector: 'shared-comment',
  standalone: true,
  imports: [
    RelativeDatePipe
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit {

  private readonly svgService = inject(SvgService);

  public comment = input.required<CommentArticleModel>();
  public commentHtml = signal<SafeHtml>('')

  ngOnInit() {
    if(this.comment().comment) {
      this.commentHtml.set(this.svgService.getTrueHtml(this.comment().comment))
    }
  }

}
