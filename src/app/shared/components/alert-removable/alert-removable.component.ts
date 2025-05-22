import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { initDismisses } from 'flowbite';
import { SafeHtml } from '@angular/platform-browser';

import { SvgService } from '../../../core/services/svg.service';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';
import { TypeMessage } from '../../../core/models/type-message.model';

@Component({
  selector: 'shared-alert-removable',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './alert-removable.component.html',
  styleUrl: './alert-removable.component.scss'
})
export class AlertRemovableComponent implements OnInit {

  public svgService = inject(SvgService);
  private readonly router = inject(Router);

  public msg = input.required<string>();
  public type = input.required<TypeMessage>();
  public svgIconMsg = signal<SafeHtml>('');
  public svgClose = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.close));

  ngOnInit(): void {
    if(this.type() === 'info') {
      this.svgIconMsg.set(this.svgService.getSanitizedSvg(SvgIcons.msgInfo));
    }
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe(() => {
      initDismisses();
      setTimeout(() => {
        initDismisses(); // vuelve a correrlo cuando cambia la ruta
      }, 100); // pequeño delay para que el DOM esté listo
    });
  }

}
