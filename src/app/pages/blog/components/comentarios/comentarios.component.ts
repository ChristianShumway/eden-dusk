import { Component, computed, input } from '@angular/core';
import { CommentArticleModel } from '../../../../core/models/article-blog.model';
import { CommentComponent } from '../../../../shared/components/comment/comment.component';
import { NoDataComponent } from '../../../../shared/components/no-eventos/no-data.component';
@Component({
  selector: 'blog-comentarios',
  standalone: true,
  imports: [
    CommentComponent,
    NoDataComponent
  ],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.scss'
})
export class ComentariosComponent {

  public comments = input.required<CommentArticleModel[] | undefined>();
  public commentsComputed = computed(() => this.comments());

  public msg = 'No se han agregado aún comentarios para este artículo.'

}
