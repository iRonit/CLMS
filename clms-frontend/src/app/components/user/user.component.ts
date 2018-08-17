import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  applyLeaveTab = true;
  viewStatusTab = false;

  constructor() { }

  ngOnInit() {
  }

  navigateTab(tab){
    this.applyLeaveTab = false;
    this.viewStatusTab = false;
    if (tab == 'applyLeaveTab') {
      this.applyLeaveTab = true;
    } else if (tab == 'viewStatusTab') {
      this.viewStatusTab = true;
    }
  }

}
