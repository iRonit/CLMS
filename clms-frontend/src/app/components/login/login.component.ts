import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    const val = this.form.value;

    if (val.username && val.password) {
      if (this.authService.login(val.username, val.password)) {
        console.log("User is logged in");
        console.log(val.username);
        this.router.navigateByUrl('/');

      }
    }

  }


}
