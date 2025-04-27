import { Component, inject, input, signal } from '@angular/core';
import { SvgService } from '../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';

@Component({
  selector: 'shared-dialog-help-float',
  standalone: true,
  imports: [],
  templateUrl: './dialog-help-float.component.html',
  styleUrl: './dialog-help-float.component.scss'
})
export class DialogHelpFloatComponent {

  private readonly svgService = inject(SvgService);

  public titleMsg = input.required<string>();
  public descriptionMsg = input.required<string>();
  public svgHelp = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.userHelp))

}
