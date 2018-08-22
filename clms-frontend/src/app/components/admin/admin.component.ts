import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";

import { AuthService } from '../../services/auth.service';
import { UserLeave } from '../../models/user-leave';
import { AdminService } from '../../services/admin.service';
import { ManageAdminDialogComponent } from '../manage-admin-dialog/manage-admin-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  username: string;
  data: UserLeave[];

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private adminService: AdminService
  ) {
    this.username = this.authService.getLoggedInUsername();
  }

  ngOnInit() {
    this.adminService.getAllUserLeaves()
      .subscribe(res => {
        console.log("Response in getAllUserLeaves() => " + JSON.stringify(res));
        this.data = res;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  openManageAdminDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //const dialogRef = 
    this.dialog.open(ManageAdminDialogComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(
    //   formData => {
    //     if (formData) {
    //     }
    //   }
    // );

  }

}
