import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInAs: string;

  constructor(private http: HttpClient) { 
    this.loggedInAs = '';
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth`, { username, password })
      .pipe(map(res => {
        // login successful if there's a jwt token in the response
        if (res && res.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify((res.accessToken)));
          this.loggedInAs = res.role.match(/ADMIN/)? 'admin':'user';
          return this.loggedInAs;
        }
        this.loggedInAs = '';
        return 'login';
      }));
  }

  isLoggedInAs() {
    return this.loggedInAs;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
