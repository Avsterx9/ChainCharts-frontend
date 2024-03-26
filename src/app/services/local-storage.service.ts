import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getItem(key: string) : string | null{
    return localStorage.getItem(key);
  }

  public remove(key: string){
    localStorage.removeItem(key);
  }

  public set(key: string, value: string){
    localStorage.setItem(key, value);
  }
}
