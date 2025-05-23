import { Injectable } from '@angular/core';
import { ToastComponent } from '../../shared/components/msg-toast/msg-toast.component';

@Injectable({ providedIn: 'root' })

export class ToastService {

  private toastComponent?: ToastComponent;

  register(component: ToastComponent) {
    this.toastComponent = component;
  }

  showSuccess(message: string) {
    this.toastComponent?.show('success', message);
  }

  showError(message: string) {
    this.toastComponent?.show('danger', message);
  }

  showWarning(message: string) {
    this.toastComponent?.show('warning', message);
  }

  showInfo(message: string) {
    this.toastComponent?.show('info', message);
  }
}
