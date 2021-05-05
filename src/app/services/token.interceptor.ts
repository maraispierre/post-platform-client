import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AccessToken } from '../models/access-token';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authService: AuthService | undefined;
  constructor(private injector: Injector) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);
    const accessToken: AccessToken | null = this.authService.getToken();

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${
          accessToken === null ? '' : accessToken.token
        }`,
        'Content-Type': 'application/json',
      },
    });
    return next.handle(request);
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((response: any) => {
        if (response instanceof HttpErrorResponse && response.status === 401) {
          console.log('test');
          localStorage.removeItem('accessToken');
          this.router.navigateByUrl('/login');
        }
        throw response.error;
      })
    );
  }
}
