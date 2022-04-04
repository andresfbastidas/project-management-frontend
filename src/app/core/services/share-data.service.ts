import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private dataArr = new BehaviorSubject([]);
  private dataSource: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  data: Observable<number> = this.dataSource.asObservable();
  private dataComment: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  private commentObjectBehavior: BehaviorSubject<Comment> = new BehaviorSubject<any>(Comment);
  dataCommentObs: Observable<number> = this.dataComment.asObservable();
  commentObjectObs: Observable<Comment> = this.commentObjectBehavior.asObservable();
  castUser = this.dataArr.asObservable();
  constructor() { }

  sendData(data: string) {
    this.dataSource.next(data);
  }

  sendDataComment(data: string) {
    this.dataComment.next(data);
  }

  sendObjectComment(data:Comment){
    this.commentObjectBehavior.next(data);
  }
}
