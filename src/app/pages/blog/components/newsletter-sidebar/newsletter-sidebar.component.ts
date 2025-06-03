import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { emailRegex } from '../../../../core/utils/regex.utils';
import { ValidationFormsService } from '../../../../core/services/validation-form.service';
import { SvgService } from '../../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';

@Component({
  selector: 'blog-newsletter-sidebar',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './newsletter-sidebar.component.html',
  styleUrl: './newsletter-sidebar.component.scss'
})
export class NewsletterSidebarComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly validationFormService = inject(ValidationFormsService);
  private readonly svgService = inject(SvgService);

  @Output()
  public emailValue = new EventEmitter<string>();
  public svgArrow = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.arrowRight));

  public form!: FormGroup;

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
    this.emailValue.emit(this.form.get('email')?.value);
    this.form.reset({}, { emitEvent: false });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
  }

}
