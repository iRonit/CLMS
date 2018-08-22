import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ApplyLeaveDialogComponent } from '../applyLeaveDialog/apply-leave-dialog.component';
import { UserLeave } from '../../models/user-leave';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username: string;
  data: UserLeave[];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.username = this.authService.getLoggedInUsername();
    this.data = [];
  }

  ngOnInit() {
    this.userService.getUserLeaves()
      .subscribe(res => {
        console.log("Response in getUserLeaves() => " + JSON.stringify(res));
        this.data = res;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  openApplyLeaveDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ApplyLeaveDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      formData => {
        if (formData) {
          console.log("FormData: " + JSON.stringify(formData));
          let userLeave: UserLeave = {} as any;
          userLeave.fromDate = this.convert(formData.from);
          userLeave.toDate = this.convert(formData.to);
          userLeave.reason = formData.reason;
          console.log("UserLeave => " + JSON.stringify(userLeave));
          this.userService.postUserLeave(userLeave)
            .subscribe(
              res => {
                console.log("response from postUserLeave() =>" + JSON.stringify(res));
                res.appliedDate = this.convert(res.appliedDate);
                res.fromDate = this.convert(res.fromDate);
                res.toDate = this.convert(res.toDate);
                this.data.push(res);
                this.data = Object.assign([], this.data);
              },
              err => {
                console.log("Error in apply leave: " + JSON.stringify(err));
              }
            );
        }
      }
    );

  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

}
