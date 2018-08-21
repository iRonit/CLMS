import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(
        private http: HttpClient
    ) { }

    getAllUserLeaves(status?: string) {
      if(status === undefined) {
        return this.http.get<any>(`${environment.apiUrl}/admin/all`);
      } else {
        let params = new HttpParams().set('status', status);
        return this.http.get<any>(`${environment.apiUrl}/admin/all`, {params: params});
      }
    }

    getUserLeaves(username: string, status?: string) {
        if(status === undefined) {
          return this.http.get<any>(`${environment.apiUrl}/admin/` + username);
        } else {
          let params = new HttpParams().set('status', status);
          return this.http.get<any>(`${environment.apiUrl}/admin/` + username, {params: params});
        }
    }

    updateLeaveStatusRemark(userLeave: any) {
      return this.http.put<any>(`${environment.apiUrl}/admin/`+ userLeave.id, userLeave);
    }

    postAdmin(admin: any) {
      return this.http.post<any>(`${environment.apiUrl}/admin/admins`, admin);
    }

    deleteAdmin(admin: any) {
      return this.http.delete<any>(`${environment.apiUrl}/admin/admins/` + admin.username);
    }

    getAdmins() {
      return this.http.get<any>(`${environment.apiUrl}/admin/admins`);
    }

}
