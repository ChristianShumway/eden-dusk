import { Component, inject, input, OnInit, signal } from '@angular/core';
import { TypeMessage } from '../../../core/models/type-message.model';
import { SvgService } from '../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';
import { CommonModule } from '@angular/common';

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

  public msg = input.required<string>();
  public type = input.required<TypeMessage>();
  public svgIconMsg = signal<SafeHtml>('');
  public svgClose = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.close));

  ngOnInit(): void {
    if(this.type() === 'info') {
      this.svgIconMsg.set(this.svgService.getSanitizedSvg(SvgIcons.msgInfo));
    }
  }

}
