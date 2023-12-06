import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get formControls() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    // Perform forgot password logic
    const email = this.forgotPasswordForm.value.email;
    // Call API, send password reset email, etc.
    console.log('Email:', email);

    // Reset form
    this.forgotPasswordForm.reset();
    this.submitted = false;
  }
}
