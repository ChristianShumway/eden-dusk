import { Component, inject, input, OnInit, signal } from '@angular/core';
import { SvgService } from '../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';
import { NoDataType } from '../../../core/models/no-data.type';

@Component({
  selector: 'shared-no-data',
  standalone: true,
  imports: [],
  templateUrl: './no-data.component.html',
})
export class NoDataComponent implements OnInit {

  private readonly svgService = inject(SvgService);

  public type = input<NoDataType>();
  public msg = input.required<string>();
  public icon = signal<SafeHtml>('');

  ngOnInit(): void {

    switch (this.type()) {
      case 'transmision':
        this.icon.set(this.svgService.getSanitizedSvg(SvgIcons.calendar));
        break;
      case 'articulo':
        this.icon.set(this.svgService.getSanitizedSvg(SvgIcons.search));
        break;
      case 'galeria':
        this.icon.set(this.svgService.getSanitizedSvg(SvgIcons.search));
        break;
      case 'comentario':
        this.icon.set(this.svgService.getSanitizedSvg(SvgIcons.msgDialog));
        break;
      case 'video':
        this.icon.set(this.svgService.getSanitizedSvg(SvgIcons.camera));
        break;
      case 'producto':
        this.icon.set(this.svgService.getSanitizedSvg(SvgIcons.bag));
        break;
      default:
        this.icon.set(this.svgService.getSanitizedSvg(SvgIcons.userHelp));
        break;
    }
  }


}
