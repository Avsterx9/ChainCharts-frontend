import { Injectable } from '@angular/core';
import { CryptoToken } from '../models/Interfaces/CryptoToken';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoApiService {
  private coinGekoTokensURL: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc';
  private coinGekoTokenURL: string = 'https://api.coingecko.com/api/v3/coins/';
  // private cryptoCompareNewsURL: string = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN';
  private coinGekoChartURL: string = '/market_chart?vs_currency=usd&days=';

  constructor(private http: HttpClient) {}

  public getCTokenDesc(tokenName: string){
    return this.http.get<any>(this.coinGekoTokenURL + tokenName);
  }

  public getCTokens(): Observable<CryptoToken[]>{
    return this.http.get<CryptoToken[]>(this.coinGekoTokensURL);
  }

  // public getLatestNews(){
  //   return this.http.get<any>(this.cryptoCompareNewsURL);
  // }

  public getTokenChartData(tokenName: string, timePeriod:number){
    return this.http.get<any>(this.coinGekoTokenURL + tokenName + this.coinGekoChartURL + timePeriod);
  }
}
