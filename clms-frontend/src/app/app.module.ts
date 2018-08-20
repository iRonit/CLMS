import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomMaterialModule} from './material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { ApplyLeaveComponent } from './components/applyLeave/apply-leave.component';
import { ViewStatusComponent } from './components/viewStatus/view-status.component';

import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { ErrorResponseInterceptor } from './interceptors/error-response-interceptor';

import { routes } from './app.routing';
import { AdminComponent } from './components/admin/admin.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    ApplyLeaveComponent,
    ViewStatusComponent,
    AdminComponent,
    AdminListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorResponseInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
