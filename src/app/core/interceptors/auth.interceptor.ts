import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, tap,retry } from 'rxjs/operators';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable , throwError} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
// const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService:AuthService, private dialog:DialogComponent) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.authService.getToken();
    const result = next.handle(authReq);
    if (token != null) {
      // for Spring Boot back-end
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
      
      // for Node.js Express back-end
      // authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    }
    return result
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
