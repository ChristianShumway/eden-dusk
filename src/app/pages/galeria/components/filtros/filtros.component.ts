import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, inject, input, Output, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { initAccordions, initDropdowns } from 'flowbite';
import { SafeHtml } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { SvgService } from '../../../../core/services/svg.service';
import { LimpiarFiltrosComponent } from '../limpiar-filtros/limpiar-filtros.component';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { CategoryGalleryModel, CollaboratorGalleryModel, FiltersGallery, SubCategoryGalleryModel } from '../../../../core/models/filters-gallery.model';

@Component({
  selector: 'gallery-filtros',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LimpiarFiltrosComponent
  ],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})
export class FiltrosComponent implements AfterViewInit {

  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly svgService = inject(SvgService);

  public categories = input.required<CategoryGalleryModel[]>();
  public collaborators = input.required<CollaboratorGalleryModel[]>();
  @Output()
  public filterChanged = new EventEmitter<FiltersGallery>();

  private readonly searchSubject = new Subject<string>();
  private readonly subscription!: Subscription;

  public myForm!: FormGroup;

  public currencyFilters = signal<FiltersGallery>({
    search: '',
    category: '',
    date: '',
    subcategory: '',
    collaborator: ''
  });

  public currencySubcategories = signal<SubCategoryGalleryModel[]>([]);
  public svgSearch = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.search));
  public svgArrow = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.arrowRotate));
  public svgFilters = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.adjustFilters));
  public svgAngle = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.angleRight));
  public svgClose = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.close));

  @ViewChild('dropCat') public dropCat!: ElementRef;
  @ViewChild('dropSubcat') public dropSubcat!: ElementRef;
  @ViewChild('dropDate') public dropDate!: ElementRef;
  @ViewChild('dropCollaborators') public dropCollaborators!: ElementRef;

  public isDropdownOpenCat = false;
  public isDropdownOpenSubcat = false;
  public isDropdownOpenDate = false;
  public isDropdownOpenCollaborators = false;

  constructor() {
    this.subscription = this.searchSubject
      .pipe(debounceTime(500)) // espera medio segundo tras la última tecla
      .subscribe(value => {
        this.currencyFilters.update(newValue => ({
          ...newValue,
          search: value

        }));

        this.myForm.get('search')?.setValue(value);
        this.filterChanged.emit(this.currencyFilters());
      });

    this.initForm();
  }

  ngAfterViewInit(): void {
    initAccordions();
    initDropdowns();
    this.router.events.subscribe(() => {
      setTimeout(() => {
        initAccordions();
        initDropdowns();
      }, 100); // pequeño delay para que el DOM esté listo
    });
  }

  initForm() {
    this.myForm = this.fb.group({
      search: [''],
      category: [''],
      subcategory: [''],
      date: [''],
      collaborator: ['']
    });
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value); // aquí entra el debounce
  }

  onSelectCategory(category: CategoryGalleryModel, index: number) {
    this.currencyFilters.update(newValue => ({
      ...newValue,
      category: category.name,
      subcategory: ''
    }));

    if(category.subcategories?.length) {
      this.currencySubcategories.set(category.subcategories);
    } else {
      this.currencySubcategories.set([]);
    }

    this.closeDrop(index);
    this.myForm.get('category')?.setValue(category.name);
    this.filterChanged.emit(this.currencyFilters());
  }

  onSelectSubCategory(subcategory: SubCategoryGalleryModel, index: number): void {
    this.currencyFilters.update(newValue => ({
      ...newValue,
      subcategory: subcategory.name
    }));

    this.closeDrop(index);
    this.myForm.get('subcategory')?.setValue(subcategory.name);
    this.filterChanged.emit(this.currencyFilters());
  }

  onDateChange(event: Event, index: number) {
    const value = (event.target as HTMLInputElement).value;
    this.currencyFilters.update(newValue => ({
      ...newValue,
      date: value
    }));

    this.closeDrop(index);
    this.myForm.get('date')?.setValue(value);
    this.filterChanged.emit(this.currencyFilters());
  }

  onSelectCollaborator(collaborator: CollaboratorGalleryModel, index: number): void {
    this.currencyFilters.update(newValue => ({
      ...newValue,
      collaborator: collaborator.name
    }));

    this.closeDrop(index);
    this.myForm.get('collaborator')?.setValue(collaborator.name);
    this.filterChanged.emit(this.currencyFilters());
  }

  toggleDropdown(index: number) {
    if (index === 1) {
      this.isDropdownOpenCat = !this.isDropdownOpenCat;
      this.isDropdownOpenSubcat = false;
      this.isDropdownOpenDate = false;
      this.isDropdownOpenCollaborators = false;

    } else if (index === 2) {
      this.isDropdownOpenSubcat = !this.isDropdownOpenSubcat;
      this.isDropdownOpenCat = false;
      this.isDropdownOpenDate = false;
      this.isDropdownOpenCollaborators = false;
    } else if (index === 3) {
      this.isDropdownOpenDate = !this.isDropdownOpenDate;
      this.isDropdownOpenCat = false;
      this.isDropdownOpenSubcat = false;
      this.isDropdownOpenCollaborators = false;
    }
    else if (index === 4) {
      this.isDropdownOpenCollaborators = !this.isDropdownOpenCollaborators;
      this.isDropdownOpenCat = false;
      this.isDropdownOpenSubcat = false;
      this.isDropdownOpenDate = false;
    }
  }

  closeDrop(index: number) {
    this.isDropdownOpenCat = false;
    this.isDropdownOpenSubcat = false;
    this.isDropdownOpenDate = false;
    this.isDropdownOpenCollaborators = false;
  }

  cleanFilter(key: string) {
    this.currencyFilters.set({
      ...this.currencyFilters(),
      [key]: ''
    });

    this.myForm.get(key)?.setValue(''); // Esto desmarca el radio

    if(key === 'category') {
      this.currencyFilters.set({
        ...this.currencyFilters(),
        subcategory: ''
      });
      this.myForm.get('subcategory')?.setValue(''); // Esto desmarca el radio
      this.currencySubcategories.set([]);
    }

    this.filterChanged.emit(this.currencyFilters());

  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // limpieza para evitar memory leaks
  }

}
