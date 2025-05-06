import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { ValidationFormsService } from '../../../../core/services/validation-form.service';
import { emailRegex } from '../../../../core/utils/regex.utils';

@Component({
  selector: 'blog-agregar-comentario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './agregar-comentario.component.html',
  styleUrl: './agregar-comentario.component.scss'
})
export class AgregarComentarioComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly validationFormService = inject(ValidationFormsService);
  private readonly svgService = inject(SvgService);

  public form!: FormGroup;
  public svgStar = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.star));

  avatarList = [
    { id: 'avatar1', src: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Liliana' },
    { id: 'avatar2', src: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Nolan' },
    { id: 'avatar3', src: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Mackenzie' },
    { id: 'avatar3', src: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Kimberly' },
    { id: 'avatar3', src: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Emery' },
  ];

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.pattern(emailRegex)]],
      calificacion: [null],
      avatar: [this.avatarList[0].src, Validators.required],
      comentario: ['', Validators.required],
    });
  }

  get calificationFormField() {
    return this.form.controls['calificacion'];
  }

  validField(field: string): boolean | null | undefined {
    return this.validationFormService.isValidField(this.form, field);
  }

  getErrorField(field: string): string | undefined {
    return this.validationFormService.getErrorField(this.form, field);
  }

  enviar() {
    if (this.form.valid) {
      if(!this.calificationFormField.value) {
        this.calificationFormField.setValue(1);
      }
      console.log('Formulario enviado:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}

