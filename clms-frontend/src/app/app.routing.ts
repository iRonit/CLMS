import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';

import { AuthAdminGuard } from './guards/auth-admin.guard';
import { AuthUserGuard } from './guards/auth-user.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'user', component: UserComponent, canActivate: [AuthUserGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AuthAdminGuard] },
    { path: '', component: LoginComponent }
];
