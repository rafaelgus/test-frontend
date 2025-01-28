import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ApiBaseInterceptor implements HttpInterceptor {
  private apiBaseUrl = 'https://test.worldsacross.com/api';

  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiReq = req.clone({
      url: `${this.apiBaseUrl}${req.url}`,
    });

    return next.handle(apiReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirige al usuario a la página de inicio de sesión
          this.router.navigate(['/home']);
        }
        return throwError(() => error); // Reenvía el error
      })
    );
  }
}


