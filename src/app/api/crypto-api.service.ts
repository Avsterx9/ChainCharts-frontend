import { Injectable } from '@angular/core';
import { CryptoToken } from '../models/Interfaces/CryptoToken';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CryptoGlobalData } from '../models/Interfaces/CryptoGlobalData';
import { CryptoTokenDescription } from '../models/Interfaces/CryptoTokenDescription';
import { PriceData } from '../models/Interfaces/PriceData';
import { CryptoNews } from '../models/Interfaces/CryptoNews';
import { FavouriteToken } from '../models/Interfaces/FavouriteToken';
import { RequestResponse } from '../models/Interfaces/RequestResponse';
import { UserToken, UserTokenLite } from '../models/Interfaces/UserToken';
import { WalletEstimationValue } from '../models/Interfaces/WalletEstimationValue';

@Injectable({
  providedIn: 'root'
})
export class CryptoApiService {
  private cryptoApiURL: string = 'http://localhost:5002/api/crypto/';
  private cryptoCompareNewsURL: string = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN';

  constructor(private http: HttpClient) {}

  public getCTokenDesc$(tokenName: string) : Observable<CryptoTokenDescription>{
    let params = new HttpParams().set('TokenName', tokenName);

    return this.http.get<CryptoTokenDescription>(this.cryptoApiURL + 'GetTokenDescription', { params });
  }

  public getCTokens$(): Observable<CryptoToken[]>{
    return this.http.get<CryptoToken[]>(this.cryptoApiURL + 'GetTokens');
  }

  public getFavouriteTokens$(): Observable<FavouriteToken[]>{
    return this.http.get<FavouriteToken[]>(this.cryptoApiURL + 'GetFavouriteTokens');
  }

  public addFavouriteToken$(tokenId: string): Observable<RequestResponse>{
    let params = new HttpParams()
      .set('TokenId', tokenId);

    return this.http.post<RequestResponse>(this.cryptoApiURL + 'AddFavouriteToken', null, {params});
  }

  public deleteFavouriteToken$(tokenId: string): Observable<RequestResponse>{
    let params = new HttpParams()
      .set('TokenId', tokenId);

    return this.http.delete<RequestResponse>(this.cryptoApiURL + 'DeleteFavouriteToken', {params});
  }

  public getUserTokens$(): Observable<UserToken[]>{
    return this.http.get<UserToken[]>(this.cryptoApiURL + 'GetUserTokens');
  }

  public addUserToken$(model: UserTokenLite): Observable<RequestResponse>{
    return this.http.post<RequestResponse>(this.cryptoApiURL + 'AddUserToken', model);
  }

  public deleteUserToken$(tokenId: string): Observable<RequestResponse>{
    let params = new HttpParams()
      .set('TokenId', tokenId);

    return this.http.delete<RequestResponse>(this.cryptoApiURL + 'DeleteUserToken', {params});
  }

  public getGlobalData$(): Observable<CryptoGlobalData>{
    return this.http.get<CryptoGlobalData>(this.cryptoApiURL + 'GetGlobalData');
  }

  public getTokenChartData$(tokenName: string, timePeriod: number) : Observable<PriceData>{
    let params = new HttpParams()
      .set('TokenName', tokenName)
      .set('Days', timePeriod);

    return this.http.get<any>(this.cryptoApiURL + 'GetPriceData', { params });
  }

  public getLatestNews$() : Observable<CryptoNews>{
    return this.http.get<any>(this.cryptoCompareNewsURL);
  }

  public getWalletEstimationValue$() : Observable<WalletEstimationValue>{
    return this.http.get<any>(this.cryptoApiURL + 'Wallet');
  }
}
