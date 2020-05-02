import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { isValidImage } from './upload.helper';

@Injectable({ providedIn: 'root' })
export class ImageValidate implements AsyncValidator {

  validate(
    control: AbstractControl,
  ): Promise<ValidationErrors | null> {
    const url = control.value;
    if (typeof url !== 'string' || url.length <= 1) {
      return new Promise<ValidationErrors | null>(resolve => {
        resolve({ imageInvalid: { value: 'Image is invalid' } });
      });
    }
    return isValidImage(url).then(valid => {
      if (valid) {
        return null;
      }
      return { imageInvalid: { value: 'Image is invalid' } };
    });
  }
}
