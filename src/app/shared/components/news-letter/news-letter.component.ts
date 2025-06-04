import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { NewsLetterService } from '../../../core/services/newsletter.service';
import { ValidationFormsService } from '../../../core/services/validation-form.service';
import { SvgService } from '../../../core/services/svg.service';
import { ToastService } from '../../../core/services/toast.service';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';
import { emailRegex } from '../../../core/utils/regex.utils';
import { RequestNewsLetter } from '../../../core/models/news-letter.model';



@Component({
  selector: 'shared-newsletter',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './news-letter.component.html'
})

export class SharedNewsLetterComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly newsService = inject(NewsLetterService);
  private readonly validationFormService = inject(ValidationFormsService);
  private readonly svgService = inject(SvgService);
  private readonly toastService = inject(ToastService);

  public form!: FormGroup;
  public svgArrow = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.arrowRight));

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
    });
  }

  validField(field: string): boolean | null | undefined {
    return this.validationFormService.isValidField(this.form, field);
  }

  getErrorField(field: string): string | undefined {
    return this.validationFormService.getErrorField(this.form, field);
  }

  sendEmail() {
    if(!this.form.valid) return;
    console.log(this.form.get('email')?.value);
    const request: RequestNewsLetter = { email: this.form.get('email')?.value };
    this.newsService.suscribeNewsLetter(request).subscribe({
      next: response => {
        if(!response) {
          this.toastService.showError('Error al registar tu correo electrónico');
          return;
        }
        this.toastService.showSuccess(response.message);
        this.form.reset({}, { emitEvent: false });
        this.form.markAsPristine();
        this.form.markAsUntouched();
        this.form.updateValueAndValidity();
      },
      error: err => {
        console.log(err);
        this.toastService.showError('Problemas con el servidor')
      }
    });
  }
}
