import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { SvgService } from '../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';

type TypeToast = 'success' | 'danger' | 'warning';

@Component({
  selector: 'shared-toast',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './msg-toast.component.html'
})
export class ToastComponent {

  private readonly svgService = inject(SvgService);

  public svgSuccess = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.handUp));
  public svgWarning = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.fire));
  public svgError = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.handDown));


  toasts: { type: TypeToast, message: string }[] = [];

  show(type: TypeToast, message: string) {
    this.toasts.push({ type, message });

    setTimeout(() => {
      this.toasts.shift();
    }, 3000);
  }

}
