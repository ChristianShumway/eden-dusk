import { Component, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SvgService } from '../../../../core/services/svg.service';
import { FiltersProducts, LicenseProductModel } from '../../../../core/models/products.model';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { debounceTime, min } from 'rxjs';
import { initAccordions, initDropdowns } from 'flowbite';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'products-filtros',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})

export class FiltrosComponent {

  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly svgService = inject(SvgService);

  public licenses = input.required<LicenseProductModel[]>();

  @Output()
  public filterChanged = new EventEmitter<FiltersProducts>();

  public myForm!: FormGroup;

  public currencyFilters = signal<FiltersProducts>({
    search: '',
    license:  '',
    price:   '',
    order:   ''
  });

  public svgSearch = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.search));
  public svgArrow = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.arrowRotate));
  public svgFilters = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.adjustFilters));
  public svgAngle = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.angleRight));

  public isDropdownOpenLicense = false;
  public minRange = 0;
  public maxRange = 1000;


  ngOnInit(): void {
    this.initForm();
    this.onChangeInputSearch();
    this.onChangeRangePrice();
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
      min: [this.minRange + 100],
      max: [this.maxRange - 100]
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
    this.myForm.valueChanges.subscribe(({ min, max }) => {
      if (min > max - 10) {
        this.myForm.patchValue({ min: max - 10 }, { emitEvent: false });
      }

      if (max < min + 10) {
        this.myForm.patchValue({ max: min + 10 }, { emitEvent: false });
      }
    });
  }

  onSelectLicense(license: LicenseProductModel, index: number) {
    this.currencyFilters.update(newValue => ({
      ...newValue,
      license: license.label,
    }));

    this.closeDrop(index);
    this.myForm.get('license')?.setValue(license.label);
    this.filterChanged.emit(this.currencyFilters());
  }

  toggleDropdown(index: number) {
    if (index === 1) {
      this.isDropdownOpenLicense = !this.isDropdownOpenLicense;
      // this.isDropdownOpenSubcat = false;

    }
    // else if (index === 2) {
    //   this.isDropdownOpenSubcat = !this.isDropdownOpenSubcat;
    //   this.isDropdownOpenCat = false;
    //   this.isDropdownOpenDate = false;
    //   this.isDropdownOpenCollaborators = false;
    // }
  }

  closeDrop(index: number) {
    this.isDropdownOpenLicense = false;
  }

  cleanFilter(key: string) {
    this.currencyFilters.update( current => ({
      ...current,
      [key]: ''
    }));

    // if(key === 'date'){
    //   this.myForm.get(key)?.setValue(this.today);
    // } else {
    //   this.myForm.get(key)?.setValue(''); // Esto desmarca el radio
    // }

    // if(key === 'category') {
    //   this.currencyFilters.set({
    //     ...this.currencyFilters(),
    //     subcategory: ''
    //   });
    //   this.myForm.get('subcategory')?.setValue(''); // Esto desmarca el radio
    //   this.currencySubcategories.set([]);
    // }


    // if(key === 'collaborator'){
    //   this.currencyFilters.set({
    //     ...this.currencyFilters(),
    //     collaborator: 0
    //   });
    //   this.myForm.get('collaborator')?.setValue(0);
    // }

    console.log(this.currencyFilters());
    this.filterChanged.emit(this.currencyFilters());

  }

get minValueField() {
  return this.myForm.get('min');
}

get maxValueField() {
  return this.myForm.get('max');
}



}
