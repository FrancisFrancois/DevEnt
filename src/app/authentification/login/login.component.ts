import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginUser } from 'src/app/shared/models/loginUser';
import { FakeAuthService } from 'src/app/shared/services/fake-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  connectedUser : LoginUser | undefined;
  identifier : string = '';
  password : string = '';
  errorMsg : string = '';

  userSub : Subscription = new Subscription();

  constructor(private _fakeAuthService : FakeAuthService) {

  }

  ngOnInit(): void {
    console.log("INIT Login")
    this.userSub = this._fakeAuthService.$connectedUser.subscribe({
      next : (value) => {
        this.connectedUser = value;
        console.log("NEXT IN Login : ", value)
      }
    })
  }

  ngOnDestroy(): void {
    console.log("DESTROY");
    this.userSub.unsubscribe();  
  }

  connect() : void {
    this._fakeAuthService.login(this.identifier, this.password);

    if(this.connectedUser) {
      this.identifier = '';
      this.password = '';
      this.errorMsg = '';
    } else {
      this.errorMsg = 'Email ou mot de passe invalide';
    }
}

disconnect() : void {
  this._fakeAuthService.logout();
}
  
}
