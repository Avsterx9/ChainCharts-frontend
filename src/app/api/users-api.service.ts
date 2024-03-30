import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private baseUrl = 'https://localhost:56292/api/users/'

  constructor(
    private http: HttpClient,
    ){ }
}
