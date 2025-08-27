import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../../../core/services/svg.service';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { CategoriasAlianzas } from '../../../../core/models/colaboraciones-alianzas.model';

@Component({
  selector: 'nosotros-filtros-colaboraciones',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './filtros-colaboraciones.component.html',
  styleUrl: './filtros-colaboraciones.component.scss'
})
export class FiltrosColaboracionesComponent {

  private readonly svgService = inject(SvgService);
  private readonly cdr = inject(ChangeDetectorRef)

  public categories = input.required<CategoriasAlianzas[]>();
  @Output()
  public filterChanged = new EventEmitter<{ search: string; category: string }>();

  public currencyCategory = signal<string>('todas');
  public searchValue = signal<string>('');
  public svgSearch = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.search));

  private readonly searchSubject = new Subject<string>();
  private readonly subscription!: Subscription;

  constructor() {
    this.subscription = this.searchSubject
      .pipe(debounceTime(500)) // espera medio segundo tras la última tecla
      .subscribe(value => {
        this.filterChanged.emit({ search: value, category: this.currencyCategory() });
      });
  }

  setCategory(category: CategoriasAlianzas) {
    this.currencyCategory.set(category.id);
    this.cdr.detectChanges(); // fuerza la detección inmediata
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
