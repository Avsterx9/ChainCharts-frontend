import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private baseUrl = 'http://localhost:5001/api/users/'

  constructor(
    private http: HttpClient,
    ){ }
}
