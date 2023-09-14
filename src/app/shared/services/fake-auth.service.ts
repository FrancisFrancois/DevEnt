import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeAuthService {

  private _url : string = 'https://localhost:7245/api/Auth/Login';

  private _$connectedUser : BehaviorSubject< LoginUser | undefined> = new BehaviorSubject< LoginUser | undefined>(undefined);

  $connectedUser : Observable< LoginUser | undefined> = this._$connectedUser.asObservable();

  constructor(private _httpClient : HttpClient) { }

  getUserByIdentifier(identifier: string): Observable<LoginUser | undefined> {
 
    return this._httpClient.get<LoginUser>(`${this._url}?identifier=${identifier}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        return of(undefined); 
      })
    );
  }


  login(identifier: string, password: string): void {
    const body = {
      identifier: identifier,
      password: password,
    };

    this._httpClient.post<LoginUser>(this._url, body).subscribe(
      (user) => {
        localStorage.setItem('userId', user.identifier.toString());
        this._$connectedUser.next(user);
      },
      (error) => {
        console.error('Erreur lors de la connexion :', error);
        this._$connectedUser.next(undefined);
      }
    );
  }

  logout(): void {
    localStorage.clear();
    this._$connectedUser.next(undefined);
  }
}
