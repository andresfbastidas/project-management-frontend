import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentRequest } from '../models/comment-request';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  
  private readonly urlEndPoint: string = environment.backendBasePath;
  constructor(private readonly httpClient: HttpClient) { }

  createComment(commentRequest: CommentRequest):Observable<any> {
    const allRequest: any = {
      comment:commentRequest.comment,
      activityId:commentRequest.activityId
    }
    return this.httpClient.post<any>(`${this.urlEndPoint}/comment/newComment`, allRequest).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}
