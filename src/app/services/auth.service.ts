import { Injectable } from '@angular/core';
import { AuthApiService } from '../api/auth-api.service';
import { CurrentUserService } from './current-user.service';
import { Observable, tap, mergeMap, of } from 'rxjs';
import { ILoginModel } from '../models/Interfaces/ILoginModel';
import { ITokenModel } from '../models/Interfaces/ITokenModel';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { ILoginResponse } from '../models/Responses/ILoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly JWT_TOKEN: string = 'JWT_TOKEN';

  constructor(
      private readonly authApi: AuthApiService,
      private readonly storageService: LocalStorageService,
      private readonly currentUserService: CurrentUserService,
      private readonly router: Router,
  ) {}

  public authenticate$(data: ILoginModel): Observable<any> {
    if (this.token) this.destroyToken();
    
    return this.authApi.authenticate$(data).pipe(
        tap((token: ITokenModel) => this.storeToken(token)),
        mergeMap(({ token }: ITokenModel) => this.currentUserService.fetchCurrentUser$())
    )
  }

  public logout() {
    this.destroyToken();
    this.router.navigate(['/auth']);
  }

  public redirectToAuthPage$(): Observable<null> {
    return of(null).pipe(
        tap(() => {
            this.destroyToken();
            this.router.navigate(['/auth']);
        })
    );
  }

  public get token(): string | null {
    return this.storageService.getItem(AuthService.JWT_TOKEN);
  }

  public get isLoggedIn(): boolean {
    return this.token !== null;
  }

public get isTokenExpired(): boolean {
  return false;
    // if (this.token === null) {
    //     return true;
    // }

    // // const decodedToken: DecodedTokenModel = decodeJwtToken(this.token);

    // const expirationDate: Date = new Date(0);
    // expirationDate.setUTCSeconds(decodedToken.exp);
    // const currentDate: Date = new Date();

    // return currentDate > expirationDate;
  }

private storeToken({ token }: ITokenModel): void {
    this.storageService.set(AuthService.JWT_TOKEN, token);
  }

public destroyToken(): void {
    this.storageService.remove(AuthService.JWT_TOKEN);
  }
}
