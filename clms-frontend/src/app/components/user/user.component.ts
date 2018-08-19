import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  applyLeaveTab = true;
  viewStatusTab = false;

  constructor(private userService: UserService) { }

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

  clicked($event) {
    this.userService.getAll()
    .pipe()
    .subscribe(res => console.log("------------------------->> " + JSON.stringify(res)));
  }

}
