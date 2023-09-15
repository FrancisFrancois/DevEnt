import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventApiService {

  private _url :string = 'https://localhost:7245/api/Activity';

  constructor(private _httpClient : HttpClient) { }

  getAll() : Observable<Event> {
    return this._httpClient.get<Event>(this._url);
  }

  getById(id : number) : Observable<Event> {
    return this._httpClient.get<Event>(this._url+id);
  }

  create(event : Event) : Observable<Event> {
    return this._httpClient.post<Event>(this._url, event);
  }

  update(id : number, event : Event) : Observable<Event> {
    return this._httpClient.put<Event>(this._url+id, event);
  }

  delete(id : number) : Observable<Event> {
    return this._httpClient.delete<Event>(this._url+id);
  }

}
