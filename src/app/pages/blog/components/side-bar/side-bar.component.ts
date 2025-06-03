import { Component, inject, input, signal } from '@angular/core';
import { NewsletterSidebarComponent } from '../newsletter-sidebar/newsletter-sidebar.component';
import { FeedDestacadosComponent } from '../feed-destacados/feed-destacados.component';
import { ArticleModel, AuthorModel } from '../../../../core/models/article-blog.model';
import { CommonModule } from '@angular/common';
import { AutoresComponent } from '../autores/autores.component';
import { TransmisionesService } from '../../../../core/services/transmisiones.service';
import { TransmisionModel } from '../../../../core/models/transmission.model';
import { TransmisionesListComponent } from '../../../../shared/components/transmisiones-list/transmisiones-list.component';
import { NoDataComponent } from '../../../../shared/components/no-eventos/no-data.component';
import { BlogService } from '../../../../core/services/blog.service';
import { NewsLetterService } from '../../../../core/services/newsletter.service';
import { ToastService } from '../../../../core/services/toast.service';
import { RequestNewsLetter } from '../../../../core/models/news-letter.model';

@Component({
  selector: 'blog-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    NewsletterSidebarComponent,
    FeedDestacadosComponent,
    AutoresComponent,
    TransmisionesListComponent,
    NoDataComponent
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  private readonly transmisionesService = inject(TransmisionesService);
  private readonly blogService = inject(BlogService);
  private readonly newsService = inject(NewsLetterService);
  private readonly toastService = inject(ToastService);

  public articles = input.required<ArticleModel[]>();
  public eventos = signal<TransmisionModel[]>([]);
  public authors = signal<AuthorModel[]>([]);
  public titleFeed: string = 'Articulos Destacados';
  public msg = 'No hay transmisiones disponibles por mostrar.';

  ngOnInit(): void {
    this.getAllTransmissions();
    this.getAuthors();
  }

  getAllTransmissions() {
    this.transmisionesService.getAllTransmissions().subscribe({
      next: response => {
        this.eventos.set([...response]);
      },
      error: error => console.error(error)
    })
  }

  getAuthors() {
    this.blogService.getAuthors().subscribe({
      next: response => {
        this.authors.set([...response]);
      },
      error: error => console.error(error)
    });
  }

  onGetEmail(email: string) {
    const request: RequestNewsLetter = { email };
    this.newsService.suscribeNewsLetter(request).subscribe({
      next: response => {
        if(!response) {
          this.toastService.showError('Error al registar tu correo electrónico');
          return;
        }
        this.toastService.showSuccess(response.message);
      },
      error: err => {
        console.log(err);
        this.toastService.showError('Problemas con el servidor')
      }
    })
  }

}
