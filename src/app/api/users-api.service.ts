import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ILoginUser } from '../models/Interfaces/ILoginUser';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private baseUrl = 'https://localhost:53085/api/users/'

  constructor(
    private http: HttpClient,
    ){ }

  public login(loginUser: ILoginUser) : Observable<any>{
    return this.http.post<any>(this.baseUrl + 'login', loginUser);
  }
}
