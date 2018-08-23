import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";

import { AuthService } from '../../services/auth.service';
import { UserLeave } from '../../models/user-leave';
import { AdminService } from '../../services/admin.service';
import { ManageAdminDialogComponent } from '../manage-admin-dialog/manage-admin-dialog.component';

import { Chart } from 'chart.js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  username: string;
  data: UserLeave[];
  chart: any;
  visualizing: boolean;
  visualizeButtonLabel: string;

  MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private adminService: AdminService,
    private datePipe: DatePipe
  ) {
    this.username = this.authService.getLoggedInUsername();
  }

  ngOnInit() {
    this.adminService.getAllUserLeaves()
      .subscribe(res => {
        console.log("Response in getAllUserLeaves() => " + JSON.stringify(res));
        this.data = res;
      });
    this.visualizing = false;
    this.visualizeButtonLabel = "Visualize!";
  }

  onLogout() {
    this.authService.logout();
  }

  openManageAdminDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(ManageAdminDialogComponent, dialogConfig);
  }

  prepareChart() {
    console.log("In prepareChart()");
    let chartData = this.prepareChartData();
    let chartOptions = this.prepareChartOptions();
    this.chart = new Chart('linecanvas', {
      type: 'line',
      data: chartData,
      options: chartOptions
    });
  }

  prepareChartData() {
    let labels = [];
    let approvedData = []; //need to fetch from db
    let pendingData = []; //need to fetch from db
    let combinedData = [];


    //-------------------------------------->> consuming the data <<--------------------------------------
    let today = new Date();
    let endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    for (let date = today; this.daysDifference(date, endDate) != 0; date.setDate(date.getDate() + 1)) {
      let formattedDate =  this.datePipe.transform(date, 'yyyy-MM-dd');
      labels.push(formattedDate);
      let pCount = 0;
      let aCount = 0;

       this.data.forEach(userLeaveData => {
         if(formattedDate >= userLeaveData.fromDate && formattedDate <= userLeaveData.toDate) {
           if(userLeaveData.status == 'PENDING') {
             pCount++;
           } else if(userLeaveData.status == 'APPROVED') {
             aCount++;
           }
         }
       });

       pendingData.push(pCount);
       approvedData.push(aCount);
       combinedData.push(pCount+aCount);
    }


      let chartData = {
        labels: labels,
        datasets: [{
          label: 'Approved',
          data: approvedData,
          borderColor: '#3cba9f',
          fill: false,
        }, {
          label: 'Pending',
          data: pendingData,
          borderColor: '#ffcc00',
          fill: false,
        }, {
          label: 'Combined',
          data: combinedData,
          borderColor: '#4c2f42',
          fill: false,
        }]
      };
    return chartData;
  }

  prepareChartOptions() {
    let chartOptions = {
      responsive: true,
      title: {
        display: true,
        text: 'Leave plans'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Timeline'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Leave Count'
          }
        }]
      }
    };
    return chartOptions;
  }

  toggleVisualize() {
    if (this.visualizing) {
      this.visualizing = false;
      this.visualizeButtonLabel = "Visualize!";
      this.chart = null;
    } else {
      this.visualizing = true;
      this.visualizeButtonLabel = "Back To Table!";
      this.prepareChart();
    }
  }

  daysDifference(date1: Date, date2: Date) {
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

}
