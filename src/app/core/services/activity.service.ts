import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private readonly urlEndPoint: string = environment.backendBasePath;
  constructor(private readonly httpClient: HttpClient) { }

  getListActivitiesByProject(projectId:number): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/activity/findAllActivitiesByProject/`+projectId).pipe(
        map((response: any) => response),
        catchError(error => {
          return throwError(() => error);
        })
    );
}
}
