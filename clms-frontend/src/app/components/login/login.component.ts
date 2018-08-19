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
