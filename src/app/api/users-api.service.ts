import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserDetailsModel } from '../models/Interfaces/UserDetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private baseUrl = 'https://localhost:64893/api/users/'

  constructor(
    private http: HttpClient,
    ){ }

  public getCurrentUser$() : Observable<IUserDetailsModel>{
    return this.http.get<any>(this.baseUrl + 'GetCurrentUser');
  }
}
