import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { UserLeave } from '../../models/user-leave';

@Component({
  selector: 'view-status',
  templateUrl: './view-status.component.html',
  styleUrls: ['./view-status.component.css']
})
export class ViewStatusComponent implements OnInit {

  displayedColumns: string[];
  dataSource: any;
  data: UserLeave[];

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private authService: AuthService
  ) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    console.log("in ngOnInit()");
    if (this.authService.getLoggedInRole() === 'admin') {
      this.displayedColumns = ['username', 'createdOn', 'from', 'to', 'reason', 'status', 'remarks', 'actions'];
      this.adminService.getAllUserLeaves("PENDING")
        .subscribe(res => {
          this.data = res;
          this.loadData();
        });
    } else {
      this.displayedColumns = ['createdOn', 'from', 'to', 'reason', 'status', 'remarks', 'actions'];
      this.userService.getUserLeaves()
        .subscribe(res => {
          this.data = res;
          this.loadData();
        });
    }
  }

  loadData() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
  }

  onDelete(leaveData: UserLeave) {
    console.log("Delete: " + JSON.stringify(leaveData));
    this.userService.deleteUserLeave(leaveData.id)
      .subscribe(res => {
        this.data.splice(this.data.indexOf(leaveData),1);
        this.loadData();
      }, err => {
        console.log("Error in view-status.onDelete()");
      });
  }

  //toDo
  onEdit(leaveData: UserLeave) {
    
  }

}
