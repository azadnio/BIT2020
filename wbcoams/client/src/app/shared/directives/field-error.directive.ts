import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
} from '@angular/core';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormField } from '@angular/material/form-field';
// import { Destroyable } from '../classes/destroyable.class';
import { Destroyable } from '../classes/destroyable.class';

@Directive({
  selector: '[appFieldError]',
})
export class FieldErrorDirective extends Destroyable implements AfterViewInit {
  private formField = inject(MatFormField);
  private elementRef = inject(ElementRef);

  constructor() {
    super();
  }

  private getErrorMessage(errorKey: string, errorValue: any): string {
    const errorMessages: {
      [key: string]: string | ((errorValue: any) => string);
    } = {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      minlength: (errorValue: { requiredLength: number }) =>
        `Minimum length is ${errorValue.requiredLength} characters`,
      maxlength: (errorValue: { requiredLength: number }) =>
        `Maximum length is ${errorValue.requiredLength} characters`,
      pattern: 'Invalid format',
      min: (errorValue: { min: number }) =>
        `Minimum value is ${errorValue.min}`,
      max: (errorValue: { max: number }) =>
        `Maximum value is ${errorValue.max}`,
    };

    const errorMessage = errorMessages[errorKey];

    return typeof errorMessage === 'function'
      ? errorMessage(errorValue)
      : errorMessage;
  }

  public ngAfterViewInit(): void {
    const control = this.formField._formFieldControl.ngControl?.control;

    if (!control) {
      throw new Error('Formfield control is not available');
    }

    control.events.pipe(this.untilDestroyed()).subscribe(() => {
      let errorMessage = '';
      if (control.errors && (control.dirty || control.touched)) {
        const firstError = Object.keys(control.errors)[0];
        const firstErrorValue = control.errors[firstError];
        errorMessage = this.getErrorMessage(firstError, firstErrorValue);
      }

      this.elementRef.nativeElement.textContent = errorMessage;
    });
  }
}
