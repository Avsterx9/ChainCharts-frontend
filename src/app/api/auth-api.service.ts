import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITokenModel } from '../models/Interfaces/ITokenModel';
import { ILoginModel } from '../models/Interfaces/ILoginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private baseUrl = 'https://localhost:53224/api/users/'

  constructor(
    private http: HttpClient,
    ){ }

  public authenticate$(loginUser: ILoginModel) : Observable<ITokenModel>{
    return this.http.post<any>(this.baseUrl + 'login', loginUser);
  }
}
