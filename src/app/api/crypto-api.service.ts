import { Injectable } from '@angular/core';
import { CryptoToken } from '../models/Interfaces/CryptoToken';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CryptoGlobalData } from '../models/Interfaces/CryptoGlobalData';

@Injectable({
  providedIn: 'root'
})
export class CryptoApiService {
  private coinGekoTokensURL: string = 'http://localhost:5002/api/users/GetTokens';
  private coinGekoTokenURL: string = 'https://api.coingecko.com/api/v3/';
  // private cryptoCompareNewsURL: string = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN';
  private coinGekoChartURL: string = '/market_chart?vs_currency=usd&days=';

  constructor(private http: HttpClient) {}

  public getCTokenDesc(tokenName: string){
    return this.http.get<any>(this.coinGekoTokenURL + tokenName);
  }

  public getCTokens(): Observable<CryptoToken[]>{
    return this.http.get<CryptoToken[]>(this.coinGekoTokensURL);
  }

  public getGlobalData(): Observable<CryptoGlobalData>{
    return this.http.get<CryptoGlobalData>(this.coinGekoTokenURL + 'global');
  }

  // public getLatestNews(){
  //   return this.http.get<any>(this.cryptoCompareNewsURL);
  // }

  public getTokenChartData(tokenName: string, timePeriod:number){
    return this.http.get<any>(this.coinGekoTokenURL + tokenName + this.coinGekoChartURL + timePeriod);
  }
}
