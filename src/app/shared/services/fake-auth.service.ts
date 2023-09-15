import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { Member, User } from '../models/connectedUser';

@Injectable({
  providedIn: 'root'
})
export class FakeAuthService {

  private _url : string = 'https://localhost:7245/api/Auth/Login';
  private _urlMember : string = 'https://localhost:7245/api/Member/';

  private _$connectedUser : BehaviorSubject< Member | undefined> = new BehaviorSubject< Member | undefined>(undefined);

  $connectedUser : Observable< Member | undefined> = this._$connectedUser.asObservable();

  constructor(private _httpClient : HttpClient,
              private _router : Router) { }

  getUserById(id: number): Observable<Member | undefined> {
 
    return this._httpClient.get<Member>(`${this._urlMember}${id}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        return of(undefined); 
      })
    );
  }


  login( loginUser : LoginUser ): void {
    console.log('Coucou');

    this._httpClient.post<User>(this._url, loginUser).subscribe({
      next : user => {
        localStorage.setItem('userId', user.member.id.toString());
        localStorage.setItem('token', user.token)
        this._$connectedUser.next(user.member);
        this._router.navigateByUrl('/');
        console.log('coucou' ,user);
        
      },
      error : error => {
        console.error('Erreur lors de la connexion :', error);
        this._$connectedUser.next(undefined);
        console.log('erreur' ,error);
      },
    });
  }

  logout(): void {
    localStorage.clear();
    this._$connectedUser.next(undefined);
  }
}
