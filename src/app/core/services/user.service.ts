import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignupRequest } from '../models/signup-request';

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

  createUser(signupRequest:SignupRequest):Observable<any>{
    const allRequest: any = {
      userapp:signupRequest.userapp,
      profileId:signupRequest.profileId
  }
    return this.httpClient.post<any>(`${this.urlEndPoint}/user/createUser`, allRequest).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
  );
  }


}
