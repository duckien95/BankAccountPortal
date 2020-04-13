import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticateService } from "../auth/authenticate.service"

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticateService: AuthenticateService) { }
    
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                console.error("<<<<<<<<<<<<<<<<<ErrorInterceptor");
                console.error(err);
                console.error("ErrorInterceptor<<<<<<<<<<<<<<<<<");
                // if ([401, 403].indexOf(err.status) !== -1) {
                //     // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                //     this.authenticateService.logout();
                //     location.reload(true);
                // }

                const error = err.error.message || err.statusText;
                return throwError(error);
            })
        )
    }
}