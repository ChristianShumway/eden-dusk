import { Component } from '@angular/core';
import { FormContactoComponent } from '../../components/form-contacto/form-contacto.component';
import { InfoContactoComponent } from '../../components/info-contacto/info-contacto.component';

@Component({
  selector: 'app-main-contacto',
  standalone: true,
  imports: [
    FormContactoComponent,
    InfoContactoComponent
  ],
  templateUrl: './main-contacto.component.html',
  styleUrl: './main-contacto.component.scss'
})
export class MainContactoComponent {

}
