import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignupRequest } from '../models/signup-request';
import { Operation } from 'fast-json-patch';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly urlEndPoint: string = environment.backendBasePath;
  constructor(private readonly httpClient: HttpClient) { }

  getUsersProfileDirectors(): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/user/findAllUsersProfile`).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  findUserName(userName: string): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/user/findByUserName/` + userName).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  createUser(signupRequest: SignupRequest): Observable<any> {
    const allRequest: any = {
      userapp: signupRequest.userapp,
    }
    return this.httpClient.post<any>(`${this.urlEndPoint}/user/createUser`, allRequest).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  updateUser(params: any, operations: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.urlEndPoint}/user/updateUser`, operations,{ params }).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }


}
