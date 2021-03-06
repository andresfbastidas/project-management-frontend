import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericListService {

  private readonly urlEndPoint: string = environment.backendBasePath;
  constructor(private readonly httpClient: HttpClient) { }

  getDeliveries(): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/genericList/findAllDeliverys`).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getResearchTypologys(): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/genericList/findAllResearchTypologys`).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getAllStates(solini:number, decline:number, finished:number, progress:number, avalaible:number): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/genericList/findAllStatesProjects/`+solini+'+'+decline+'+'+finished+'+'+progress+'+'+avalaible).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getAllProfiles(): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/genericList/findAllProfiles`).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getAllStatesRequest(): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/genericList/findAllStateProjectRequest`).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}
