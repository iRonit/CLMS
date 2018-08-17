import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';


export interface LeaveData {
  username: string;
  createdOn: string;
  from: string;
  to: string;
  reason: string;
  status: string;
  remarks: string;
}

const LEAVE_DATA: LeaveData[] = [
  {username: 'sogolani', createdOn: '16-08-2018', from: '01-11-2018', to: '15-11-2018', reason: 'blah blah', status: 'Approved', remarks: 'whatever'},
  {username: 'ronpradh', createdOn: '17-08-2018', from: '01-11-2018', to: '15-11-2018', reason: 'something', status: 'Approved', remarks: 'okayyy'},
];

@Component({
  selector: 'view-status',
  templateUrl: './view-status.component.html',
  styleUrls: ['./view-status.component.css']
})
export class ViewStatusComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['username', 'createdOn', 'from', 'to', 'reason', 'status', 'remarks'];
  dataSource = new MatTableDataSource(LEAVE_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
