import { Component } from '@angular/core';
import { FakeAuthService } from '../../services/fake-auth.service';
import { LoginUser } from '../../models/loginUser';
import { Member } from '../../models/connectedUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  connectedUser : Member | undefined;

   constructor(private _fakeAuthService : FakeAuthService) {

   }

   ngOnInit(): void {
       this._fakeAuthService.$connectedUser.subscribe({
        next : (value) => {
          this.connectedUser = value;
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


