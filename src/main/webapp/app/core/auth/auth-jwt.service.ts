import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { ApplicationConfigService } from '../config/application-config.service';
import { Login } from 'app/login/login.model';
import { CookieService } from 'ngx-cookie-service';
type JwtToken = {
  id_token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private applicationConfigService: ApplicationConfigService,
    private cookieService: CookieService
  ) {}

  getToken(): string {
    const tokenInLocalStorage: string | null = this.localStorageService.retrieve('authenticationToken');
    const tokenInSessionStorage: string | null = this.sessionStorageService.retrieve('authenticationToken');
    return tokenInLocalStorage ?? tokenInSessionStorage ?? '';
  }

  login(credentials: Login): Observable<void> {
    return this.http
      .post<JwtToken>(this.applicationConfigService.getEndpointFor('api/authenticate'), credentials)
      .pipe(map(response => this.authenticateSuccess(response, credentials)));
  }

  logout(): Observable<void> {
    sessionStorage.clear();

    return new Observable(observer => {
      this.localStorageService.clear('authenticationToken');
      this.sessionStorageService.clear('authenticationToken');
      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken, credentials: Login): void {
    const jwt = response.id_token;

    if (credentials.rememberMe) {
      // this.localStorageService.store('authenticationToken', jwt);
      this.sessionStorageService.store('authenticationToken', jwt);

      this.cookieService.set('username', credentials.username);
      this.cookieService.set('password', credentials.password);
      // localStorage.setItem('currentUser', jwt);
      // console.log('AuthenticationToken stored in localStorage: ' , localStorage.getItem('currentUser'));
    } else {
      this.sessionStorageService.store('authenticationToken', jwt);
      this.localStorageService.clear('authenticationToken');
    }
    sessionStorage.setItem('currentUser', jwt);
  }
}
