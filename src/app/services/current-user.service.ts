import { Injectable } from '@angular/core';
import { UsersApiService } from '../api/users-api.service';
import { LocalStorageService } from './local-storage.service';
import { IUserDetailsModel } from '../models/Interfaces/UserDetails';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError, filter, BehaviorSubject } from 'rxjs';
import { AuthApiService } from '../api/auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private readonly userInfoStore$ = new BehaviorSubject<IUserDetailsModel | null>(null);

    constructor(
        private readonly authApiService: AuthApiService,
        private readonly storageService: LocalStorageService
    ) {}

    public fetchCurrentUser$(): Observable<IUserDetailsModel> {
        return this.authApiService.getCurrentUser$().pipe(
            tap((user: IUserDetailsModel) => this.userInfoStore$.next(user)),
            tap((user: IUserDetailsModel) => console.log(user)),
            catchError((error: HttpErrorResponse) => {
                this.userInfoStore$.next(null); // jesli blad to przypisz nulla
                return throwError(() => error);
            })
        );
    }

  public set userInfo(data: IUserDetailsModel) {
      this.userInfoStore$.next(data);
  }

  public get userInfo$(): Observable<IUserDetailsModel> { // subskrypcja w razie gdyby sie cos mialo zmienic
      return this.userInfoStore$.pipe(
          filter(
              (user: IUserDetailsModel | null): user is IUserDetailsModel => user !== null
          )
      );
  }

  public get userInfo(): IUserDetailsModel | null { // bezposrednie odwolanie, ale jak sie cos z backu zmieni to nie bede wiedzial xd
      return this.userInfoStore$.value;
  }
}
