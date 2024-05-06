import { Injectable } from '@angular/core';
import { CryptoToken } from '../models/Interfaces/CryptoToken';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CryptoGlobalData } from '../models/Interfaces/CryptoGlobalData';
import { CryptoTokenDescription } from '../models/Interfaces/CryptoTokenDescription';
import { PriceData } from '../models/Interfaces/PriceData';

@Injectable({
  providedIn: 'root'
})
export class CryptoApiService {
  private cryptoApiURL: string = 'http://localhost:5002/api/crypto/';
  private coinGekoTokenURL: string = 'https://api.coingecko.com/api/v3/';
  // private cryptoCompareNewsURL: string = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN';
  private coinGekoChartURL: string = '/market_chart?vs_currency=usd&days=';

  constructor(private http: HttpClient) {}

  public getCTokenDesc$(tokenName: string) : Observable<CryptoTokenDescription>{
    let params = new HttpParams().set('TokenName', tokenName);

    return this.http.get<CryptoTokenDescription>(this.cryptoApiURL + 'GetTokenDescription', { params });
  }

  public getCTokens$(): Observable<CryptoToken[]>{
    return this.http.get<CryptoToken[]>(this.cryptoApiURL + 'GetTokens');
  }

  public getGlobalData$(): Observable<CryptoGlobalData>{
    return this.http.get<CryptoGlobalData>(this.coinGekoTokenURL + 'global');
  }

  // public getLatestNews(){
  //   return this.http.get<any>(this.cryptoCompareNewsURL);
  // }

  public getTokenChartData$(tokenName: string, timePeriod: number) : Observable<PriceData>{
    let params = new HttpParams()
      .set('TokenName', tokenName)
      .set('Days', timePeriod);

    return this.http.get<any>(this.cryptoApiURL + 'GetPriceData', { params });
  }
}
