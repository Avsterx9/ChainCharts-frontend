import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITokenModel } from '../models/Interfaces/ITokenModel';
import { ILoginModel } from '../models/Interfaces/ILoginModel';
import { IUserDetailsModel } from '../models/Interfaces/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private baseUrl = 'https://localhost:56292/api/users/'

  constructor(
    private http: HttpClient,
    ){ }

  public authenticate$(loginUser: ILoginModel) : Observable<ITokenModel>{
    return this.http.post<any>(this.baseUrl + 'login', loginUser);
  }
  
  public getCurrentUser$() : Observable<IUserDetailsModel>{
    return this.http.get<any>(this.baseUrl + 'GetCurrentUser');
  }
}
