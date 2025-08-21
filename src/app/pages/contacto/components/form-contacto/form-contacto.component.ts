import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ValidationFormsService } from '../../../../core/services/validation-form.service';
import { SvgService } from '../../../../core/services/svg.service';
import { ToastService } from '../../../../core/services/toast.service';
import { emailRegex } from '../../../../core/utils/regex.utils';

@Component({
  selector: 'contacto-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-contacto.component.html',
  styleUrl: './form-contacto.component.scss'
})
export class FormContactoComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly validationFormService = inject(ValidationFormsService);
  private readonly svgService = inject(SvgService);
  private readonly toastService = inject(ToastService);

  public form!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      comment: ['', Validators.required],
    });
  }

  validField(field: string): boolean | null | undefined {
    return this.validationFormService.isValidField(this.form, field);
  }

  getErrorField(field: string): string | undefined {
    return this.validationFormService.getErrorField(this.form, field);
  }

  enviar() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

}
