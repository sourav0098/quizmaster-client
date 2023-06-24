import {
    HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add jwt token to request headers
    const token = this._authService.getTokenFromLocalStorage();
    
    if (token != null) {
      // Clone the request and add the access token to the headers
      const authReq = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${token.accessToken}`),
      });

      // Pass the modified request with the access token to the next interceptor or HttpHandler
      return next.handle(authReq);
    }

    // If the token is null, proceed with the original request
    return next.handle(req);
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
