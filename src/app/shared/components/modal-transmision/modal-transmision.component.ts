import { Component, ElementRef, input, OnInit, ViewChild } from '@angular/core';
import { TransmisionModel } from '../../../core/models/transmission.model';
import { BackgroundImagePipe } from '../../pipes/backgound-images.pipe';
import { CommonModule } from '@angular/common';
import { DiaSemanaPipe } from '../../pipes/dia-semana.pipe';
import { MesNombrePipe } from '../../pipes/mes-anio.pipe';
import { TimezonesPipe } from '../../pipes/zona-horaria.pipe';

declare let Modal: any;

@Component({
  selector: 'shared-modal-transmision',
  standalone: true,
  imports: [
    CommonModule,
    BackgroundImagePipe,
    DiaSemanaPipe,
    MesNombrePipe,
    TimezonesPipe
  ],
  templateUrl: './modal-transmision.component.html',
  styleUrl: './modal-transmision.component.scss'
})
export class ModalTransmisionComponent implements OnInit {

  @ViewChild('modalEl') modalElementRef!: ElementRef;
  modalInstance: any;

  public modalData = input.required<TransmisionModel>();

  public fechaEvento: Date = new Date();

  ngOnInit(): void {
    let setDate = new Date();
    if (this.modalData())  {
      setDate = new Date(this.modalData().date);
    }
    this.fechaEvento = new Date(setDate.getFullYear(), setDate.getMonth(), setDate.getDate() +2);
  }

  ngAfterViewInit() {
    const modalEl = this.modalElementRef.nativeElement;
    if (typeof window !== 'undefined' && typeof Modal !== 'undefined') {
      this.modalInstance = new Modal(modalEl, {
        backdrop: 'static', // <- evita que se cierre con clic fuera del modal
        closable: true       // <- aún se puede cerrar con el botón de cerrar
      });
    }
  }

  openModal() {
    this.modalInstance?.show();
  }

  closeModal() {
    this.modalInstance?.hide();
  }

}
