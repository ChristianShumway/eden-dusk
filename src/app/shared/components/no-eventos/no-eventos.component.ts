import { Component, inject, signal } from '@angular/core';
import { SvgService } from '../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';

@Component({
  selector: 'shared-no-eventos',
  standalone: true,
  imports: [],
  templateUrl: './no-eventos.component.html',
  styleUrl: './no-eventos.component.scss'
})
export class NoEventosComponent {

  private readonly svgService = inject(SvgService);

  public iconCalendar = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.calendar));

}
