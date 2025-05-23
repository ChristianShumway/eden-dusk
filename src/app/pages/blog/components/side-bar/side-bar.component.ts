import { Component, inject, input, signal } from '@angular/core';
import { NewsletterSidebarComponent } from '../newsletter-sidebar/newsletter-sidebar.component';
import { FeedDestacadosComponent } from '../feed-destacados/feed-destacados.component';
import { ArticleModel } from '../../../../core/models/article-blog.model';
import { CommonModule } from '@angular/common';
import { AutoresComponent } from '../autores/autores.component';
import { TransmisionesService } from '../../../../core/services/transmisiones.service';
import { TransmisionModel } from '../../../../core/models/transmission.model';
import { TransmisionesListComponent } from '../../../../shared/components/transmisiones-list/transmisiones-list.component';
import { NoDataComponent } from '../../../../shared/components/no-eventos/no-data.component';

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

  public articles = input.required<ArticleModel[]>();
  public eventos = signal<TransmisionModel[]>([]);
  public titleFeed: string = 'Articulos Destacados';
  public msg = 'No hay transmisiones disponibles por mostrar.';

  ngOnInit(): void {
    this.getAllTransmissions();
  }

  getAllTransmissions() {
    this.transmisionesService.getAllTransmissions().subscribe({
      next: response => {
        this.eventos.set([...response]);
      },
      error: error => console.error(error)
    })
  }

}
