import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  registerForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.registerForm = this._fb.group({
      pseudo: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
      confirmpassword: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      firstname: [null, [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmpassword');
  
    if (!passwordControl || !confirmPasswordControl) {
      return null; 
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;
  
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  createUser() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      console.log("FORMULAIRE VALIDE 🥳");
    }
    else {
      this.registerForm.markAllAsTouched();
      console.log("FORMULAIRE INVALIDE 🤡");
    }
  }

}