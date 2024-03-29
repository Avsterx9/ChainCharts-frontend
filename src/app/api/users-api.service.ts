import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserDetailsModel } from '../models/Interfaces/UserDetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private baseUrl = 'https://localhost:57789/api/users/'

  constructor(
    private http: HttpClient,
    ){ }
}
