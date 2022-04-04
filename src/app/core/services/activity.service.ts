import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivityRequest } from '../models/activity-request';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private readonly urlEndPoint: string = environment.backendBasePath;
  constructor(private readonly httpClient: HttpClient) { }

  getListActivitiesByProject(projectId: number, progressState: number, createState: number, finishedState: number, params:any): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/activity/findAllActivitiesByProject/` + projectId+"+"+progressState+"+"+createState+"+"+finishedState, {params}).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  createActivity(activityRequest: ActivityRequest):Observable<any> {
    const allRequest: any = {
      activity: activityRequest.activity,
      projectId:activityRequest.projectId
    }
    return this.httpClient.post<any>(`${this.urlEndPoint}/activity/createActivity`, allRequest).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getListStatesActivities(): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/activity/findAllStatesActivities/`).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  updateActivity(activityId:number): Observable<any> {
    const allRequest: any = {
      activityId
    }
    return this.httpClient.put<any>(`${this.urlEndPoint}/activity/updateActivity`, allRequest).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  deleteActivity(params:any): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlEndPoint}/activity/deleteActivity`,{ params }).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}
