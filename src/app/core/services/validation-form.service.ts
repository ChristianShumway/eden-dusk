import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { emailRegex, phoneRegex, latitudLongitudPattern } from './../utils/regex.utils';

@Injectable({
  providedIn: 'root'
})

export class ValidationFormsService {

  isValidField(form: FormGroup, field: string): boolean | null | undefined {
    return form.get(field)?.errors && form.get(field)?.touched
  }

  getErrorField(form: FormGroup, field: string): string | undefined {
    if(!form.get(field)?.errors) return;
    const errors = form.get(field)?.errors || {};
    for(const key of Object.keys(errors)) {
      switch(key) {
        case 'required' :
          return '¡Este es un campo requerido!';
        case 'minlength' :
          return `¡El mínimo requerido para este campo es de ${ errors['minlength'].requiredLength } carácteres!`;
        case 'maxlength' :
          return `¡El máximo requerido para este campo es de ${ errors['maxlength'].requiredLength } carácteres!`;
        case 'samePassword' :
          return '¡La nueva contraseña no puede ser similar a la contraseña actual!';
        case 'notEqualPassword' :
          return '¡La nueva contraseña no coincide con la confirmación!';
        case 'sistemaMedicionRepetido' :
          return '¡Este sistema de medición ya ha sido utilizado!';
        case 'claveExistente' :
            return '¡Ya se encuentra registrado un tanque con esta clave de identificación!';
        case 'pattern' :
          return this.validationsPatterns(errors);
        default :
        return;
      }
    }
    return undefined;
  }

  validationsPatterns(errors: ValidationErrors) {
    if(emailRegex.toString() === errors['pattern'].requiredPattern) {
      return '¡Correo electrónico no válido!';
    }
    if(phoneRegex.toString() === errors['pattern'].requiredPattern) {
      return '¡Número telefónico no válido (10 dígitos)!';
    }
    if(latitudLongitudPattern.toString() === errors['pattern'].requiredPattern) {
      return '¡Latitud y/o longitud no válida (solo números)!';
    }
    return 'error de expresión regular no mapeado';
  }

  public compareSamePassword(field1: string, field2: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const field1Value = group.get(field1)?.value;
      const field2Value = group.get(field2)?.value;

      if(group.get(field1)?.touched && field1Value === field2Value) {
        group.get(field2)?.setErrors({ samePassword: true })
        return {
          samePassword: true
        }
      }

      return null;
    }
  }

  public compareFieldOneWithFieldTwo(field1: string, field2: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const field1Value = group.get(field1)?.value;
      const field2Value = group.get(field2)?.value;

      if(field1Value !== field2Value) {
        group.get(field2)?.setErrors({ notEqualPassword: true })
        return {
          notEqualPassword: true
        }
      }

      group.get(field2)?.setErrors(null);
      return null;
    }
  }

}
