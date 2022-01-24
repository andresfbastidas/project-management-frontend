import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private dataArr = new BehaviorSubject([]);
  private dataSource: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  data: Observable<number> = this.dataSource.asObservable();
  castUser = this.dataArr.asObservable();
  constructor() { }

  sendData(data: string) {
    this.dataSource.next(data);
  }

  sendDataProjectRequest(data: string) {
    this.dataSource.next(data);
  }
}
