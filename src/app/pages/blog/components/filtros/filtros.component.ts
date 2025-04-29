import { Component, input, output, OutputEmitterRef, signal } from '@angular/core';
import { CategoryArticle, CategoryArticleModel } from '../../../../core/models/article-blog.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'blog-filtros',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})

export class FiltrosComponent {

  public categories = input.required<CategoryArticleModel[]>();
  public setCategoryOut: OutputEmitterRef<CategoryArticleModel> = output();
  public currencyFilter = signal<CategoryArticle>('Todas');


  setCategory(category: CategoryArticleModel) {
    this.currencyFilter.set(category.name)
    this.setCategoryOut.emit(category);
  }

}
