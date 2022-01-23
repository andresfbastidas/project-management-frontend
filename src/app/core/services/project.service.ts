import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ApprovalRequest } from "../models/approval-request";
import { AssociatedUserProjectRequest } from "../models/associatedUserProject-request";
import { CreateProjectRequest } from "../models/create-project-request";
import { DeclineRequest } from "../models/decline-request";
import { UpdateProjectRequest } from "../models/update-project-request";

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  private readonly urlEndPoint: string = environment.backendBasePath;
  constructor(private readonly httpClient: HttpClient) { }

  createProject(createProjectRequest: CreateProjectRequest): Observable<any> {
    const allRequest: any = {
      project: createProjectRequest.project,
      state: createProjectRequest.state,
      deliveries: createProjectRequest.deliveries,
      userapp: createProjectRequest.userapp
    }
    return this.httpClient.post<any>(`${this.urlEndPoint}/project/createProject`, allRequest).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  updateProject(updateProjectRequest: UpdateProjectRequest): Observable<any> {
    const allRequest: any = {
      project: updateProjectRequest.project,
      state: updateProjectRequest.state,
      deliveries: updateProjectRequest.deliveries,
      userapp: updateProjectRequest.userapp,
      projectId:updateProjectRequest.projectid,
      projectRequestId:updateProjectRequest.projectRequestId
    }
    return this.httpClient.post<any>(`${this.urlEndPoint}/project/updateProjectAndprojectRequest`, allRequest).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  findProjectById(projectId:number): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/project/findProjectById/` + projectId).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getListProjectsByUserName(userName: String, params: any): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/project/findAllProjectsByUserName/` + userName, { params }).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  getListUsersByProject(projectId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/project/findAllUsersByProject/` + projectId).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  associatedUserToProject(associatedUserProjectRequest: AssociatedUserProjectRequest): Observable<any> {
    const allRequest: any = {
      userName: associatedUserProjectRequest.userName,
      projectId: associatedUserProjectRequest.projectId
    }
    return this.httpClient.post<any>(`${this.urlEndPoint}/project/associatedProjectUser`, allRequest).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getListProjectRequest(firstState:number, secondState:number, thirdState:number,userName: String, params: any): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/project/findByProjectRequestStateUser/`+firstState+'+'+secondState+'+'+thirdState+'/'+ userName, { params }).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getListProjectRequestByDirector(firstState:number, secondState:number, thirdState:number,userName: String, params: any): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/project/findByProjectRequestState/`+firstState+'+'+secondState+'+'+thirdState+'/'+ userName, { params }).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  approvalProjects(approvalRequest:ApprovalRequest): Observable<any> {
    const allRequest: any = {
      listProjectRequests:approvalRequest.listProjectRequests,
      projectDirector:approvalRequest.projectDirector
    }
    return this.httpClient.put<any>(`${this.urlEndPoint}/project/approvalProjects`, allRequest).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  declineProjects(declineRequest:DeclineRequest): Observable<any> {
    const allRequest: any = {
      listProjectRequests:declineRequest.listProjectRequests
    }
    return this.httpClient.put<any>(`${this.urlEndPoint}/project/declineProjects`, allRequest).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getAllProjectsByState(stateId: number, params:any): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/project/findAllProjectsState/` + stateId, {params}).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

}