import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { normalGuard } from './guard/normal.guard';
import { adminGuard } from './guard/admin.guard';
import { loginGuard } from './guard/login.guard';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
    canActivate: [loginGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [loginGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full',
    canActivate: [normalGuard],
  },
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [adminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
