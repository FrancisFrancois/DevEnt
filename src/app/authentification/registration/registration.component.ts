import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/shared/services/logger.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  registerForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private _loggerService : LoggerService,
              private _router : Router) {

    this.registerForm = this._fb.group({
      pseudo: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
      confirmpassword: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]]
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
      this._loggerService.create(this.registerForm.value).subscribe({
        complete : () => {
          this._router.navigateByUrl('/')
        }
      });
      console.log(this.registerForm.value);
      console.log("FORMULAIRE VALIDE");
    }
    else {
      this.registerForm.markAllAsTouched();
      console.log("FORMULAIRE INVALIDE");
    }
  }

}