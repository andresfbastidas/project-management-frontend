import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ProjectRequest } from "../models/project-request";

@Injectable({
    providedIn: 'root'
  })

  export class ProjectService{

    private readonly urlEndPoint: string = environment.backendBasePath;
    constructor(private readonly httpClient: HttpClient){}

    createProject(projectRequest:ProjectRequest): Observable<any> {
        const allRequest: any = {
            project: projectRequest.project,
            state: projectRequest.state,
            deliveries: projectRequest.deliveries
        }
        return this.httpClient.post<any>(`${this.urlEndPoint}/project/createProject`, allRequest).pipe(
            map((response: any) => response),
            catchError(error => {
              return throwError(() => error);
            })
        );
    }
  }