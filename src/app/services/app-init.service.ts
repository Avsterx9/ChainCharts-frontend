import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CurrentUserService } from './current-user.service';
import { Router } from '@angular/router'
import { Observable, filter, map, mergeMap, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly currentUserService: CurrentUserService
    ) { }

    init(): Observable<boolean> {
      return this.checkTokenExpiration$().pipe(
        tap(() => this.router.initialNavigation())
      )
    }
    
  private checkTokenExpiration$(): Observable<boolean> {
    if (this.authService.token) {
      return of(this.authService.token).pipe(
        filter((token: string | null): token is string => token !== null),
        mergeMap(() =>
          this.currentUserService.fetchCurrentUser$()
        ),
        map(() => true)
      )
    } else {
      return of(false)
    }
  }
}
