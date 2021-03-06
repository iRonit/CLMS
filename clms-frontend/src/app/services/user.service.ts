import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private username: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.username = this.authService.getLoggedInUsername();
  }

  getUserLeaves() {
    return this.http.get<any>(`${environment.apiUrl}/user/` + this.username);
  }

  postUserLeave(userLeave: any) {
    userLeave.username = this.username;
    return this.http.post<any>(`${environment.apiUrl}/user`, userLeave);
  }

  // updateUserLeave(userLeave: any) {
  //   userLeave.username = this.username;
  //   return this.http.put<any>(`${environment.apiUrl}/user/` + userLeave.id, userLeave);
  // }

  deleteUserLeave(id: number) {
    return this.http.delete<any>(`${environment.apiUrl}/user/` + id);
  }

}
