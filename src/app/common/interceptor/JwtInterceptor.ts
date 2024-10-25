import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginService } from '../../servicios/auth/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  router = inject(Router);
  loginService = inject(LoginService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.loginService.userToken;
    this.loginService.userLoginOn.subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        token = '';
      }
    });

    if (token != '') {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req).pipe(
      tap((data) => {
        console.log('usuario registrado');
      }),
      catchError((error: HttpErrorResponse) => {
        if (token === '') this.loginService.logout();
        if (error.status === 401 || error.status === 403) {
          this.loginService.logout();
          this.router.navigate(['/seguridad/login']);
        }
        return throwError(error);
      })
    );
  }
}
