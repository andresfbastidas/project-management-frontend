
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  assert(value: any, message?: string, ...optionalParams: any[]): void {
    if (!environment.production) {
      console.assert(value, message, optionalParams);
    }
  }//assert

  error(message?: any, ...optionalParams: any[]): void {
    if (!environment.production) {
      console.error(message, optionalParams);
    }
  }//error

  public info(message?: any, ...optionalParams: any[]): void {
    this.log(message, optionalParams);
  }//info

  log(message?: any, ...optionalParams: any[]): void {
    if (!environment.production) {
      console.log(message, optionalParams);
    }
  }//log

  warn(message?: any, ...optionalParams: any[]): void {
    if (!environment.production) {
      console.warn(message, optionalParams);
    }
  }//warn
}
