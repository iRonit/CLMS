import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'view-status',
  templateUrl: './view-status.component.html',
  styleUrls: ['./view-status.component.css']
})
export class ViewStatusComponent implements OnInit {

  displayedColumns: string[];
  dataSource: any;

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
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
        });
    } else {
      this.displayedColumns = ['createdOn', 'from', 'to', 'reason', 'status', 'remarks', 'actions'];
      this.userService.getUserLeaves()
        .subscribe(res => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
        });
    }
    
  }

}
