import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel, RegisterUserResponse } from '../models/Interfaces/RegisterModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private baseUrl = 'http://localhost:5001/api/users/'

  constructor(private http: HttpClient){ }
  
    public register$(registerModel: RegisterModel) : Observable<RegisterUserResponse>{
      return this.http.post<any>(this.baseUrl + 'CreateUser', registerModel);
    }
}
