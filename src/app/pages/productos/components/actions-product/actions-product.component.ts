import { Component, inject, input, OnInit, signal } from '@angular/core';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { MaterialProductModel, SizeProductModel } from '../../../../core/models/products.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'productos-actions-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './actions-product.component.html',
  styleUrl: './actions-product.component.scss'
})
export class ActionsProductComponent implements OnInit {

  private readonly svgService  = inject(SvgService);
  private readonly fb = inject(FormBuilder);

  public  catalogSizes = input.required<SizeProductModel[]>();
  public  catalogMaterial = input.required<MaterialProductModel[]>();

  public productForm!: FormGroup;

  public svgAngle = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.angleRight));
  public svgBag = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons['shoppingBag']));
  public imgSofa = 'https://iuriefineart.com/cdn/shop/files/Sofa_2.png';
  public imgTempGalery = 'https://iuriefineart.com/cdn/shop/files/the-phoenix-401879.jpg' //? esta debe venir de componente padre, primera img de muestra

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.productForm = this.fb.group({
      selectedSize: [null],
      material: [null, Validators.required]
    });
  }

  onSizeChange(sizeId: number) {
    console.log('Tamaño seleccionado:', sizeId);
  }

  addToBag(){
    console.log(this.productForm.value);
  }

}
