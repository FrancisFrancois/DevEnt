import { Component } from '@angular/core';
import { FakeAuthService } from '../../services/fake-auth.service';
import { LoginUser } from '../../models/loginUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  connectedUser : LoginUser | undefined;

   constructor(private _fakeAuthService : FakeAuthService) {

   }

   ngOnInit(): void {
       console.log("INIT LOGIN NAVBAR");
       this._fakeAuthService.$connectedUser.subscribe({
        next : (value) => {
          this.connectedUser = value;
          console.log("NEXT LOGIN IN NAVBAR : ", value);
          
        },
        error : (err) => {
        },
        complete : () => {
        }
       }); 
   }

   ngOnDestroy(): void {
       console.log("DESTROY LOGIN NAVBAR"); 
   }

  logout() : void {
    this._fakeAuthService.logout();
  }
}


