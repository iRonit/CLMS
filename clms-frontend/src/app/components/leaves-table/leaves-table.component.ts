import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { UserLeave } from '../../models/user-leave';
import { RemarksDialogComponent } from '../remarks-dialog/remarks-dialog.component';

@Component({
  selector: 'leaves-table',
  templateUrl: './leaves-table.component.html',
  styleUrls: ['./leaves-table.component.css']
})
export class LeavesTableComponent implements OnInit, OnChanges {

  displayedColumns: string[];
  dataSource: any;
  role: string;
  @Input() data: UserLeave[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.role = this.authService.getLoggedInRole();
  }

  ngOnInit() {
    console.log("in ngOnInit() => " + JSON.stringify(this.data));
    if (this.role === 'admin') {
      this.displayedColumns = ['username', 'createdOn', 'from', 'to', 'reason', 'status', 'remarks', 'actions'];
    } else {
      this.displayedColumns = ['createdOn', 'from', 'to', 'reason', 'status', 'remarks', 'actions'];
    }
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges) {
    //update data
    console.log("ngOnChanges!!! " + JSON.stringify(changes));
    this.loadData();
  }

  loadData() {
    console.log("--->loadData()");
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log("---> dataSource = " + JSON.stringify(this.data));
  }

  onDelete(leaveData: UserLeave) {
    console.log("Delete: " + JSON.stringify(leaveData));
    this.userService.deleteUserLeave(leaveData.id)
      .subscribe(res => {
        this.data.splice(this.data.indexOf(leaveData), 1);
        this.loadData();
      }, err => {
        console.log("Error in view-status.onDelete()");
      });
  }

  onAccept(leaveData: UserLeave) {
    console.log("ACCEPTEDDDD");
    this.openRemarksDialog(leaveData, "APPROVED");
  }

  onReject(leaveData: UserLeave) {
    console.log("REJECTEDDDDDD :(");
    this.openRemarksDialog(leaveData, "REJECTED");
  }

  openRemarksDialog(leaveData: UserLeave, status: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(RemarksDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      formData => {
        if (formData) {
          console.log("FormData: " + JSON.stringify(formData));
          leaveData.status = status;
          leaveData.remark = formData.remarks;
          this.adminService.updateLeaveStatusRemark(leaveData)
            .subscribe(
              res => {
                this.loadData();
              }
            );
        }

      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
