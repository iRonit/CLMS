import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInRole: string;

  constructor(private http: HttpClient) { 
    this.loggedInRole = '';
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth`, { username, password })
      .pipe(map(res => {
        // login successful if there's a jwt token in the response
        if (res && res.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('username', username);
          localStorage.setItem('accessToken', JSON.stringify((res.accessToken)));
          this.loggedInRole = res.role.match(/ADMIN/)? 'admin':'user';
          return this.loggedInRole;
        }
        this.loggedInRole = '';
        return 'login';
      }));
  }

  getLoggedInRole() {
    return this.loggedInRole;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }
}
