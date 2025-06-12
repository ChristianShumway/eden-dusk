import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { VideotecaService } from '../../../../core/services/videoteca.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SvgService } from '../../../../core/services/svg.service';
import { CategoryVideotecaModel, VideotecaModel } from '../../../../core/models/videoteca.model';
import { SafeHtml } from '@angular/platform-browser';
import { SvgIcons } from '../../../../core/utils/svg-icons.enum';
import { switchMap } from 'rxjs';
import { Location } from '@angular/common';
import { BtnReturnComponent } from '../../../../shared/components/btn-return/btn-return.component';
import { BackgroundImagePipe } from '../../../../shared/pipes/backgound-images.pipe';
import { DateMxPipe } from '../../../../shared/pipes/mx-date.pipe';
import { SharedSocialmediaComponent } from '../../../../shared/components/shared-socialmedia/shared-socialmedia.component';
import { VideoComponent } from '../../../../shared/components/video/video.component';
import { PathsEnum } from '../../../../core/utils/paths.enum';

@Component({
  selector: 'videoteca-detalle-video',
  standalone: true,
  imports: [
    BtnReturnComponent,
    SharedSocialmediaComponent,
    VideoComponent,
    BackgroundImagePipe,
    DateMxPipe
  ],
  templateUrl: './main-detalle-video.component.html',
  styleUrl: './main-detalle-video.component.scss'
})

export class MainDetalleVideoComponent {

  private readonly videotecaService = inject(VideotecaService);
  private readonly ar = inject(ActivatedRoute);
  private readonly svgService = inject(SvgService);
  private readonly location = inject(Location);
  private readonly cdr = inject(ChangeDetectorRef);

  public video = signal<VideotecaModel>({
    id: 0,
    title: '',
    description: '',
    date: '', // Formato: '"2025-05-14"
    category: 'Todas',
    imageUrl: '',
    imageUrlThumbnail: '',
    imageUrlMedium: '',
    color: '',
    authorImage: '',
    authorName: '',
    smallDescription: '',
    codeVideo: '',
    platform: 'youtube'
  });

  public categoriesList = signal<CategoryVideotecaModel[]>([]);
  public svgAngle = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.angleRight));
  public svgComment = signal<SafeHtml>(this.svgService.getSanitizedSvg(SvgIcons.msgDialog));

  public descriptionHtml = signal<SafeHtml>('');

  ngOnInit(): void {
    this.getCategories();
    this.initParams();
  }

  getCategories() {
    this.videotecaService.getCategories().subscribe({
      next: response => {
        if(!response) return;
        this.categoriesList.set(response);
        this.cdr.detectChanges(); // <- Solución
      },
      error: err => console.error(err)
    });
  }

  initParams() {
    this.ar.paramMap.pipe(
      switchMap( (params: ParamMap) => {
        return this.videotecaService.getVideoById(Number(params.get('id')));
      })
    ).subscribe({
      next: response => {
        if(!response) return;
        this.video.set(response);
        this.descriptionHtml.set(this.svgService.getTrueHtml(this.video().description));
      }
    })
  }

  get currentUrl(): string {
    return window.location.origin + this.location.path();
  }

  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = PathsEnum.IMAGE_USER_DEFAULT;
  }

}
