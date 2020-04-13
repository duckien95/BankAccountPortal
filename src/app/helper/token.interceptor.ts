import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse }  from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticateService } from "../auth/authenticate.service"

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authenticateService: AuthenticateService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        let userStorage = this.authenticateService.getLocalStorageData();
        if(userStorage && userStorage.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${userStorage.token}`
                }
            });
        }

        return next.handle(request);
        
    }
}