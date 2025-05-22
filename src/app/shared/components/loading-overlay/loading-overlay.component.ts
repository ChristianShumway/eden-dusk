import { Component, inject, signal } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SvgService } from '../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';

@Component({
  selector: 'shared-loading-overlay',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe
  ],
  template: `
    @if(loading$ | async){
      <div class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
        <div [innerHTML]="svgSpinner()"></div>
      </div>
    }
  `

})
export class LoadingOverlayComponent {

  private readonly loadingService = inject(LoadingService);
  private readonly svgService = inject(SvgService);

  loading$ = this.loadingService.loading$;
  public svgSpinner = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.spinner))


}
