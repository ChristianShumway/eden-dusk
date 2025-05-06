import { Component, inject, signal } from '@angular/core';
import { SvgService } from '../../../core/services/svg.service';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../core/utils/svg-icons.enum';


@Component({
  selector: 'shared-socialmedia',
  standalone: true,
  imports: [],
  templateUrl: './shared-socialmedia.component.html',
  styleUrl: './shared-socialmedia.component.scss'
})
export class SharedSocialmediaComponent {

  private readonly svgService = inject(SvgService);
  public iconShared = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.shared));
  public iconInstagram = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.instagram));
  public iconFacebook = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.facebook));
  public iconX = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.twitter));




}
