import { ChangeDetectionStrategy, Component, computed, inject, input, Signal } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { SvgService } from '../../../core/services/svg.service';

@Component({
  selector: 'shared-video',
  standalone: true,
  imports: [],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoComponent {

  private readonly svgService = inject(SvgService);

  public platform = input.required<string>();
  public codeVideo = input.required<string>();

  // Computed que genera la URL segura
  safeEmbedUrl: Signal<SafeResourceUrl> = computed(() => {
    const url = this.getPlatformUrl(this.platform(), this.codeVideo());
    return this.getSafeUrl(url);
  });

  private getPlatformUrl(platform: string, code: string): string {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return `https://www.youtube.com/embed/${code}`;
      case 'vimeo':
        return `https://player.vimeo.com/video/${code}`;
      case 'dailymotion':
        return `https://www.dailymotion.com/embed/video/${code}`;
      default:
        return '';
    }
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.svgService.getSafeUrl(url);
  }

}
