// Интерсепторы необходимо регистрировать в главном модуле
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';

import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {AuthService} from '../../admin/shared/services/auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Если пользователь залогинен, добавляем к запросу(req) - token
    if (this.auth.isAuthenticated()) {
      // Меняем обьект req, вызывая его метод clone()
      req = req.clone({
        setParams: {
          auth: this.auth.token
        }
      });
    }
    // next.handle() - возвращает стрим
    return next.handle(req)
      // Обрабатваем ошибки; Если будут ошибки с бекенда, мы их перехвачиваем
      .pipe(
        tap(() => {
          console.log('Interceptor');
        }),
        catchError((error: HttpErrorResponse) => {
          // throwError() делает из обьекта ошибки - observable
          console.log('[Interceptor Error]:', error);
          if (error.status === 401) {
            this.auth.logout();
            this.router.navigate(['/admin', 'login'], {
              queryParams: {
                authFailed: true
              }
            });
          }
          return throwError(error);
        })
      );
  }

}
