import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let accessToken = JSON.parse(localStorage.getItem('accessToken'));
        console.log('intercepted==> ' + JSON.stringify(accessToken));
        if (accessToken) {
            console.log("If statement in JwtInterceptor");
            request = request.clone({
                setHeaders: { 
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${accessToken}`
                }
            });
        }
        console.log("After If statement in JwtInterceptor\nRequest= " + JSON.stringify(request));
        return next.handle(request);
    }
}