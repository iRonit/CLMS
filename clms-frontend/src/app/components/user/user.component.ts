import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onTabChange(event: MatTabChangeEvent) {
    console.log("event fired= " + event);
  }

  onLogout() {
    this.authService.logout();
  }

}
