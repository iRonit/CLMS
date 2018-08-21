import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatTableDataSource, MatSort } from '@angular/material';

import { AdminService } from '../../services/admin.service';
import { Admin } from '../../models/admin';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit{

  displayedColumns: string[] = ['username'];
  dataSource;

  addAdmin: FormGroup; 
  deleteAdmin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
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
    this.resetAdminList();
  }

  resetAdminList() {
    this.adminService.getAdmins()
        .subscribe(res => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
        });
  }

  onAdd(){
    let admin: Admin = {
      username: this.addAdmin.value.username
    };
    this.adminService.postAdmin(admin)
      .subscribe(res => {
        this.resetAdminList();
      },
    err => {
      //Display error
      console.log('Error in admin-list.onAdd()');
    });
  }  

  onDelete(){
    let admin: Admin = {
      username: this.deleteAdmin.value.username
    };
    this.adminService.deleteAdmin(admin)
      .subscribe(res => {
        this.resetAdminList();
      },
    err => {
      //Display error
      console.log('Error in admin-list.onDelete()');
    });
  }

}
