import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { CreateProjectRequest } from "../models/create-project-request";

@Injectable({
    providedIn: 'root'
  })

  export class ProjectService{

    private readonly urlEndPoint: string = environment.backendBasePath;
    constructor(private readonly httpClient: HttpClient){}

    createProject(createProjectRequest:CreateProjectRequest): Observable<any> {
        const allRequest: any = {
            project: createProjectRequest.project,
            state: createProjectRequest.state,
            deliveries: createProjectRequest.deliveries,
            userapp:createProjectRequest.userapp
        }
        return this.httpClient.post<any>(`${this.urlEndPoint}/project/createProject`, allRequest).pipe(
            map((response: any) => response),
            catchError(error => {
              return throwError(() => error);
            })
        );
    }

    getListProjectsByUserName(userName:String): Observable<any> {
      return this.httpClient.get<any>(`${this.urlEndPoint}/project/findAllProjectsByUserName/`+userName).pipe(
          map((response: any) => response),
          catchError(error => {
            return throwError(() => error);
          })
      );
  }
  getListUsersByProject(projectId:number): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/project/findAllUsersByProject/`+projectId).pipe(
        map((response: any) => response),
        catchError(error => {
          return throwError(() => error);
        })
    );
}
  }