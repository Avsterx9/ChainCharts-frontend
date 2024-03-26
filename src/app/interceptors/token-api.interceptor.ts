import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenApiInterceptor implements HttpInterceptor {
    constructor(
      private readonly authService: AuthService
      ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
        if (request.headers.get('authToken') === null) {
            const token: string = `Bearer ${this.authService.token}` ?? 'UNKNOWN_TOKEN';

            if (!!this.authService.token) {
                request = this.getRequestWithToken(request, token);
            }
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return this.authService.redirectToAuthPage$();
                } else {
                    return throwError(() => error);
                }
            })
        );
    }

    private getRequestWithToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
        return request.clone({
            setHeaders: {
                Authorization: token,
            },
        });
    }
}