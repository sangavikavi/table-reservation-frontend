import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function gmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = control.value ? control.value.endsWith('@gmail.com') : false;
    return isValid ? null : { 'gmailRequired': true };
  };
}

@Directive({
  selector: '[appGmailValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: GmailValidatorDirective, multi: true }]
})
export class GmailValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return gmailValidator()(control);
  }
}