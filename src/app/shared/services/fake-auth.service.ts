import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FakeAuthService {

  private _users : User[] = [
    { id : 1, firstname : 'Khun', email : 'fake', password : 'Khun1234'},
    { id : 2, firstname : 'Aude', email : 'aude@oui.com', password : 'Aude1234'}
  ];


  constructor() { }
}
