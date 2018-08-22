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
import { ApplyLeaveDialogComponent } from './components/applyLeaveDialog/apply-leave-dialog.component';
import { LeavesTableComponent } from './components/leaves-table/leaves-table.component';

import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { ErrorResponseInterceptor } from './interceptors/error-response-interceptor';

import { routes } from './app.routing';
import { AdminComponent } from './components/admin/admin.component';
import { ManageAdminDialogComponent } from './components/manage-admin-dialog/manage-admin-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    ApplyLeaveDialogComponent,
    LeavesTableComponent,
    AdminComponent,
    ManageAdminDialogComponent
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
  bootstrap: [AppComponent],
  entryComponents: [
    ApplyLeaveDialogComponent,
    ManageAdminDialogComponent
  ]
})
export class AppModule { }
