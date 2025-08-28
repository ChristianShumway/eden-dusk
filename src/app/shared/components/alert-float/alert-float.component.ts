import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../../core/services/svg.service';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';

@Component({
  selector: 'shared-alert-float',
  standalone: true,
  imports: [
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if(mounted()) {
      <div
        id="marketing-banner"
        tabindex="-1"
        class="z-50 flex flex-col md:flex-row justify-between w-full p-4 bg-black-100 border border-gray-500 rounded-lg shadow-xs lg:max-w-7xl
              transition-all duration-300 ease-in-out opacity-100"
        [ngClass]="{ 'opacity-0  pointer-events-none': !visible() }"
      >
        <div class="flex flex-col items-start mb-3 me-4 md:items-center md:flex-row md:mb-0">
          <a class="flex items-center mb-2 border-gray-200 md:pe-4 md:me-4 md:border-e md:mb-0 dark:border-gray-600">
            <img
              src="https://raw.githubusercontent.com/ChristianShumway/eden-dusk/refs/heads/master/src/assets/images/logos/EdenDusk-white.png"
              class="h-8 me-2"
              alt="Logo"
            />
          </a>
          <p class="flex items-center text-sm font-normal">
            {{ msg() }}
          </p>
        </div>
        <div class="flex items-center shrink-0">
          <button
            type="button"
            (click)="close()"
            class="shrink-0 inline-flex justify-center w-7 h-7 items-center hover:bg-primary hover:border-primary  rounded-lg text-sm p-1.5"
          >
            <div class="w-3 h-3" [innerHTML]="svgClose()"></div>
            <span class="sr-only">Close banner</span>
          </button>
        </div>
      </div>
    }
  `,
})
export class AlertFloatComponent implements AfterViewInit {

  private readonly router = inject(Router);
  private readonly svgService = inject(SvgService);

  public msg = input.required<string>();
  public svgClose = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.close));
  public visible = signal<boolean>(true);
  public readonly mounted = signal(true);

  close() {
    this.visible.set(false); // activa animación
    setTimeout(() => this.mounted.set(false), 200); // espera animación y desmonta
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe(() => {
      this.visible.set(true); // vuelve a mostrar el banner al navegar
    });
  }
}
