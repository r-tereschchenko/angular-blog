import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {FbAuthResponse, User} from '../../../shared/interfaces/interfaces';
import {environment} from '../../../../environments/environment';

@Injectable()

export class AuthService {
  constructor(
    private http: HttpClient
  ) {
  }

  get token(): string | null {
    const expireDate = new Date(localStorage.getItem('expiresIn'));
    if (new Date().getTime() > expireDate.getTime()) {
      this.logout();
      return null;
    } else {
      return localStorage.getItem('token');
    }
  }
  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      );
  }

  logout(): void {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + (+response.expiresIn * 1000) );
      localStorage.setItem('token', response.idToken);
      localStorage.setItem('expiresIn', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
