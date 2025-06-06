import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { ValidationFormsService } from '../../../../core/services/validation-form.service';
import { emailRegex } from '../../../../core/utils/regex.utils';
import { BlogService } from '../../../../core/services/blog.service';
import { ToastService } from '../../../../core/services/toast.service';

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
  private readonly blogService = inject(BlogService);
  private readonly toastService = inject(ToastService);

  public form!: FormGroup;
  public idPost = input.required<number>();
  @Output()
  public changeTab = new EventEmitter<'leer' | 'agregar'>();
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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      rating: [null],
      avatar: [this.avatarList[0].src, Validators.required],
      comment: ['', Validators.required],
      idPost: [this.idPost()]
    });
  }

  get calificationFormField() {
    return this.form.controls['rating'];
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
      this.blogService.addCommentToPost(this.form.value).subscribe({
        next: response => {
          if(!response) return;
          this.toastService.showSuccess(`
            Comentario agregado correctamente y necesita ser validado por un administrador.
          `);
          this.changeTab.emit('leer');
        },
        error: () => this.toastService.showError('Error al querer agregar comentario.')

      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}

