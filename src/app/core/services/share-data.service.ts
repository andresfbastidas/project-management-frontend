import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private dataArr = new BehaviorSubject([]);
  private dataSource: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  data: Observable<number> = this.dataSource.asObservable();
  private dataComment: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  dataCommentObs: Observable<number> = this.dataComment.asObservable();
  castUser = this.dataArr.asObservable();
  constructor() { }

  sendData(data: string) {
    this.dataSource.next(data);
  }

  sendDataComment(data: string) {
    this.dataComment.next(data);
  }
}
