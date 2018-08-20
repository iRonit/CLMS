import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) {
    this.login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onLoginSubmit() {
    const val = this.login.value;

    this.authService.login(val.username, val.password)
    .pipe(first())
    .subscribe(
        nextLoginRoute => {
          console.log("nextLoginRoute= "+nextLoginRoute);
          this.router.navigate([nextLoginRoute]);
        },
        error => {
            console.log("Error= "+error);
        });


  }


}
