import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from '../models/registerUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private _url : string = 'https://localhost:7245/api/Auth/Register';

  constructor(private _httpClient : HttpClient) { }

  create(registerUser : RegisterUser) : Observable<any> {
    return this._httpClient.post<any>(this._url, registerUser)
  }

}
