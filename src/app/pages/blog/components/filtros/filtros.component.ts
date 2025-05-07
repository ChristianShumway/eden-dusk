import { Component, EventEmitter, input, OnDestroy, Output, signal } from '@angular/core';
import { CategoryArticle, CategoryArticleModel } from '../../../../core/models/article-blog.model';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'blog-filtros',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})

export class FiltrosComponent implements OnDestroy {

  public categories = input.required<CategoryArticleModel[]>();
  @Output()
  public filterChanged = new EventEmitter<{ search: string; category: CategoryArticle }>();

  public currencyCategory = signal<CategoryArticle>('Todas');
  public searchValue = signal<string>('');

  private readonly searchSubject = new Subject<string>();
  private readonly subscription!: Subscription;

  constructor() {
    this.subscription = this.searchSubject
      .pipe(debounceTime(500)) // espera medio segundo tras la última tecla
      .subscribe(value => {
        this.filterChanged.emit({ search: value, category: this.currencyCategory() });
      });
  }

  setCategory(category: CategoryArticleModel) {
    this.currencyCategory.set(category.name);
    this.filterChanged.emit({ search: this.searchValue(), category: this.currencyCategory() });
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchValue.set(input.value);
    this.searchSubject.next(this.searchValue()); // aquí entra el debounce
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // limpieza para evitar memory leaks
  }

}
