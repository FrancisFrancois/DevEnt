import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/shared/models/connectedUser';
import { FakeAuthService } from 'src/app/shared/services/fake-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  connectedUser : Member | undefined;
  errorMsg : string = '';

  userSub : Subscription = new Subscription();

  loginForm : FormGroup;

  constructor(private _fakeAuthService : FakeAuthService,
              private _fb : FormBuilder
              ) {
    this.loginForm = this._fb.group({
      identifier : [null, [Validators.required]],
      password : [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.userSub = this._fakeAuthService.$connectedUser.subscribe({
      next : (value) => {
        this.connectedUser = value;
      }
    })
  }

  ngOnDestroy(): void {
    console.log("UNSUBSCRIBE");
    this.userSub.unsubscribe();  
  }

  connect() : void {
    this._fakeAuthService.login(this.loginForm.value);

    if(this.connectedUser) {
      this.loginForm.patchValue({identifier : "", password : ""})
      this.errorMsg = '';
    } else {
      this.errorMsg = 'Email ou mot de passe invalide';
    }
}

disconnect() : void {
  this._fakeAuthService.logout();
}
  
}
