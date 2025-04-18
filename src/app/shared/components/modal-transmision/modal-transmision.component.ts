import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TransmisionModel } from '../../../core/models/transmission.model';
import { BackgroundImagePipe } from '../../pipes/backgound-images.pipe';

declare let Modal: any;

@Component({
  selector: 'shared-modal-transmision',
  standalone: true,
  imports: [
    BackgroundImagePipe
  ],
  templateUrl: './modal-transmision.component.html',
  styleUrl: './modal-transmision.component.scss'
})
export class ModalTransmisionComponent {

  @ViewChild('modalEl') modalElementRef!: ElementRef;
  modalInstance: any;

  @Input() modalTitle: string = 'Título';
  @Input() modalMessage: string = 'Mensaje de ejemplo';
  public infoTransmission!: TransmisionModel;

  ngAfterViewInit() {
    const modalEl = this.modalElementRef.nativeElement;
    if (typeof window !== 'undefined' && typeof Modal !== 'undefined') {
      this.modalInstance = new Modal(modalEl, {
        backdrop: 'static', // <- evita que se cierre con clic fuera del modal
        closable: true       // <- aún se puede cerrar con el botón de cerrar
      });
    }
  }

  openModal(evento: TransmisionModel) {
    this.modalInstance?.show();
    this.infoTransmission = evento;
  }

  closeModal() {
    this.modalInstance?.hide();
  }

}
