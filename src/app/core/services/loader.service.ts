import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ILoaderState } from 'src/app/core/models/loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private readonly loaderSubject = new Subject<ILoaderState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show() {
    this.loaderSubject.next({ show: true } as ILoaderState);
  }//show

  hide() {
    this.loaderSubject.next({ show: false } as ILoaderState);
  }//hide
}
