import { Component, inject, input, OnInit, signal, Output, EventEmitter, computed } from '@angular/core';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { MaterialProductModel, ProductModel, ProductTotalModel, SizeProductModel } from '../../../../core/models/products.model';
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
  public product = input.required<ProductTotalModel>();
  @Output() public dataPedidoTemp = new EventEmitter();

  public productForm!: FormGroup;

  public svgAngle = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.angleRight));
  public svgBag = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons['shoppingBag']));
  public svgStar = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.star));
  public imgSofa = 'https://iuriefineart.com/cdn/shop/files/Sofa_2.png';

  readonly imgTempGallery = computed(() => {
    const currentProduct = this.product();
    return currentProduct?.slideImages?.[0] ?? null;
  });

  ngOnInit(): void {
    this.initForm();
    this.productForm.valueChanges.subscribe(response => {
      if(!response.selectedSize || !response.material) return;
      console.log(response);
      const newPrice = this.product().prices?.find(price => response.selectedSize === price.sizeId && response.material === price.materialId);
      if(!newPrice) return;
      console.log(newPrice);
    });
  }

  initForm() {
    this.productForm = this.fb.group({
      selectedSize: [null, Validators.required],
      material: [null, Validators.required],
      price: [this.product().price, Validators.required]
    });
  }

  onSizeChange(sizeId: number) {
    // console.log('Tamaño seleccionado:', sizeId);
  }

  addToBag(){
    if(this.productForm.invalid) return;
    this.dataPedidoTemp.emit(this.productForm.value);
  }

}
