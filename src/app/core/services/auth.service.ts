import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { LoginRequest } from '../models/login-request';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Idle } from '@ng-idle/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly  TOKEN_KEY = 'auth-token';
  private readonly  USER_KEY = 'auth-user';
  private readonly urlEndPoint: string = environment.backendBasePath;
  constructor(private readonly httpClient: HttpClient, private readonly idle: Idle) { }

  login(loginRequest:LoginRequest): Observable<any> {
    const allRequest: any = {
      username: loginRequest.username,
      password: loginRequest.password
  }
  return this.httpClient.post<any>(`${this.urlEndPoint}/user/authenticate`, allRequest).pipe(
    map((response: any) => response),
    catchError(error => {
      return throwError(() => error);
    })
);
  }

  logout(): void {
    this.idle.stop();
    sessionStorage.clear();
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }//logout

  public isAuthenticated(): boolean {
    const payload = this.getToken();
    const user = this.getUser();
    if (payload != null && user != null) {
      return true;
    }
    return false;
  }//isAuthenticated

  extractToken(acessToken: string): any {
    if (acessToken != null) {
      return JSON.parse(atob(acessToken.split('.')[1]));
    } else {
      return null;
    }
  }//extractToken

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

}
