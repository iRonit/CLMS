import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Type } from '@angular/compiler/src/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log('intercepted==> ' + JSON.stringify(currentUser));
        if (currentUser && currentUser.accessToken) {
            console.log("If statement in JwtInterceptor");
            request = request.clone({
                setHeaders: { 
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${currentUser.accessToken}`
                }
            });
        }
        console.log("After If statement in JwtInterceptor");
        return next.handle(request);
    }
}