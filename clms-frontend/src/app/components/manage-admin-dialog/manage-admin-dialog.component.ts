import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

import { MatTableDataSource, MatSort } from '@angular/material';

import { AdminService } from '../../services/admin.service';
import { Admin } from '../../models/admin';
import { UserLeave } from '../../models/user-leave';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin-dialog.component.html',
  styleUrls: ['./manage-admin-dialog.component.css']
})
export class ManageAdminDialogComponent implements OnInit{

  displayedColumns: string[] = ['username', 'delete'];
  dataSource: any;
  data: UserLeave[];

  addAdmin: FormGroup; 
  deleteAdmin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ManageAdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private adminService: AdminService
  ) {
    this.addAdmin = this.formBuilder.group({
      username: ['', Validators.required]
    });
    this.deleteAdmin = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.adminService.getAdmins()
        .subscribe(res => {
          this.data = res;
          this.loadData();
        });
  }

  close() {
    this.dialogRef.close();
  }

  loadData() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
  }

  onAdd(){
    let admin: Admin = {
      username: this.addAdmin.value.username
    };
    this.adminService.postAdmin(admin)
      .subscribe(res => {
        this.data.push(res);
        this.loadData();
      },
    err => {
      //Display error
      console.log('Error in admin-list.onAdd()');
    });
  }  

  onDelete(admin: Admin){
    this.adminService.deleteAdmin(admin)
      .subscribe(res => {
        this.data.splice(this.data.indexOf(admin),1);
        this.loadData();
      },
    err => {
      //Display error
      console.log('Error in admin-list.onDelete()');
    });
  }

}
