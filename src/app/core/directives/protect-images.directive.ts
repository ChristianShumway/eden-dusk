import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appProtectImage]',
  standalone: true
})
export class ProtectImageDirective {
  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2
  ) {
    this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'false');
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault();
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    event.preventDefault();
  }
}
