import { Component, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SvgService } from '../../../../core/services/svg.service';
import { FiltersProducts, LicenseProductModel, OrderTypeProductModel, TypeProductModel } from '../../../../core/models/products.model';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { debounceTime, min } from 'rxjs';
import { initAccordions, initDropdowns } from 'flowbite';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LimpiarFiltrosComponent } from '../limpiar-filtros/limpiar-filtros.component';

@Component({
  selector: 'products-filtros',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    LimpiarFiltrosComponent
  ],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})

export class FiltrosComponent {

  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly svgService = inject(SvgService);

  public licenses = input.required<LicenseProductModel[]>();
  public types = input.required<TypeProductModel[]>();
  public catalogOrder = input.required<OrderTypeProductModel[]>();

  @Output()
  public filterChanged = new EventEmitter<FiltersProducts>();

  public myForm!: FormGroup;
  public orderField: FormControl = new FormControl('');

  public isDropdownOpenLicense = false;
  public isDropdownOpenType = false;
  public minRange = 0;
  public maxRange = 1000;

  public currencyFilters = signal<FiltersProducts>({
    search:   '',
    license:  '',
    minPrice:  this.minRange,
    maxPrice:  this.maxRange,
    type:     '',
    order:    ''
  });

  public svgSearch = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.search));
  public svgArrow = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.arrowRotate));
  public svgFilters = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.adjustFilters));
  public svgAngle = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.angleRight));
  public svgArrowRounded = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.arrowRounded));


  ngOnInit(): void {
    this.initForm();
    this.onChangeInputSearch();
    this.onChangeRangePrice();
    this.onChangeOrder();
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
      license: [''],
      type: [''],
      min: [this.minRange],
      max: [this.maxRange]
    });
  }

  onChangeInputSearch() {
    this.myForm.get('search')?.valueChanges
    .pipe(debounceTime(500))
    .subscribe( value => {
      this.currencyFilters.update(newValue => ({
        ...newValue,
        search: value
      }));

      this.filterChanged.emit(this.currencyFilters());
    });
  }

  onChangeRangePrice() {
    this.myForm.valueChanges
    .pipe(debounceTime(200))
    .subscribe(({ min, max }) => {
      // Si min es menor que 0, lo ajustamos a 0
      if (min < 0) {
        min = 0;
        this.myForm.patchValue({ min }, { emitEvent: false });
      }

       // Si min es mayor que max, lo ajustamos
      if (min > max ) {
        min = max - 100;
        this.myForm.patchValue({ min }, { emitEvent: false });
      }

      // Si max es menor que min + 100, lo ajustamos
      if (max < min + 100) {
        max = min + 100;
        this.myForm.patchValue({ max }, { emitEvent: false });
      }

      // Si max es 0, forzamos min a 0 y max a 100
      if (max === 0) {
        min = 0;
        max = 100;
        this.myForm.patchValue({ min, max }, { emitEvent: false });
      }

      // Si min es igual al max permitido, forzamos min a sea 100 menor que max
      if (min === this.maxRange) {
        min = this.maxRange - 100;
        max = this.maxRange;
        this.myForm.patchValue({ min, max }, { emitEvent: false });
      }

      // Actualizamos filters y emitimos cambios
      this.currencyFilters.update((newValue) => ({
        ...newValue,
        minPrice: min,
        maxPrice: max,
      }));

      this.filterChanged.emit(this.currencyFilters());
    });
  }

  onSelectLicense(license: LicenseProductModel, index: number) {
    this.currencyFilters.update(newValue => ({
      ...newValue,
      license: license.id,
    }));

    this.closeDrop(index);
    this.myForm.get('license')?.setValue(license.id);
    this.filterChanged.emit(this.currencyFilters());
  }

  onSelectType(type: TypeProductModel, index: number) {
    this.currencyFilters.update(newValue => ({
      ...newValue,
      type: type.id,
    }));

    this.closeDrop(index);
    this.myForm.get('type')?.setValue(type.id);
    this.filterChanged.emit(this.currencyFilters());
  }

  toggleDropdown(index: number) {
    if (index === 1) {
      this.isDropdownOpenLicense = !this.isDropdownOpenLicense;
      this.isDropdownOpenType = false;
    }

    else if (index === 2) {
      this.isDropdownOpenType = !this.isDropdownOpenType;
      this.isDropdownOpenLicense = false;
    }
  }

  closeDrop(index: number) {
    (document.activeElement as HTMLElement)?.blur();
    this.isDropdownOpenLicense = false;
    this.isDropdownOpenType = false;

  }

  cleanFilter(key: string) {
    this.currencyFilters.update( current => ({
      ...current,
      [key]: ''
    }));

    this.myForm.get(key)?.setValue(''); // Esto desmarca el radio

    if(key === 'minPrice'){
      this.currencyFilters.set({
        ...this.currencyFilters(),
        minPrice: 0
      });
      this.minValueField?.setValue(0);
    }

    if(key === 'maxPrice'){
      this.currencyFilters.set({
        ...this.currencyFilters(),
        maxPrice: this.maxRange
      });
      this.maxValueField?.setValue(this.maxRange);
    }

    this.filterChanged.emit(this.currencyFilters());
  }

  get minValueField() {
    return this.myForm.get('min');
  }

  get maxValueField() {
    return this.myForm.get('max');
  }

  getLeftPercent(): number {
    const min = this.minValueField?.value || 0;
    const maxRange = this.maxRange;
    return (min / maxRange) * 100;
  }

  getWidthPercent(): number {
    const min = this.minValueField?.value || 0;
    const max = this.maxValueField?.value || 0;
    const range = this.maxRange - this.minRange;
    return ((max - min) / range) * 100;
  }

  onChangeOrder() {
    this.orderField.valueChanges.subscribe(value => {
      this.currencyFilters.update(newValue => ({
        ...newValue,
        order: value
      }));

      this.filterChanged.emit(this.currencyFilters());
    });
  }


}
