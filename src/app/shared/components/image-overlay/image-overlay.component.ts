// image-overlay.component.ts
import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectImageDirective } from '../../../core/directives/protect-images.directive';

@Component({
  selector: 'shared-image-overlay',
  standalone: true,
  imports: [
    CommonModule,
    ProtectImageDirective
  ],
  template: `
    @if (shouldShowOverlay()) {
      <div class="fixed inset-0 bg-black bg-opacity-80 z-[51] flex items-center justify-center">
        <div class="relative">
          <img [src]="img" class="max-w-full max-h-screen rounded-lg p-4 md:p-0" appProtectImage />
        </div>
        <button (click)="close()" class="absolute w-4 h-4 top-4 right-4 text-white bg-black rounded-full p-4 cursor-pointer flex justify-center items-center hover:bg-white hover:text-black">✕</button>
      </div>
    }
  `
})

export class ImageOverlayComponent {

  private _img = signal<string | null>(null);

  @Input()
  set img(value: string | null) {
    this._img.set(value);
  }

  @Output()
  public setImageEmpty = new EventEmitter();

  get img() {
    return this._img();
  }

  readonly hasImage = computed(() => !!this._img());

  // Por ejemplo, podrías hacer algo cuando haya imagen
  readonly shouldShowOverlay = computed(() => this.hasImage());

  close() {
    this._img.set(null);
    this.setImageEmpty.emit();
  }
}
