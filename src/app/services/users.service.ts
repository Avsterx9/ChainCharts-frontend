import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginUser } from '../models/ILoginUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'https://localhost:44359/api/users/'

  constructor(
    private http: HttpClient,
    ){ }

  public login(loginUser: ILoginUser) : Observable<any>{
    return this.http.post<any>(this.baseUrl + 'login', loginUser);
  }
}
