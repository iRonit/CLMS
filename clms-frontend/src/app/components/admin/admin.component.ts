import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  username: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.username = 'ronpradh';
  }

  onLogout() {
    this.authService.logout();
  }

}
