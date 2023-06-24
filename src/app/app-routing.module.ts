import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { normalGuard } from './guard/normal.guard';
import { adminGuard } from './guard/admin.guard';
import { loginGuard } from './guard/login.guard';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { QuizzesComponent } from './pages/admin/quizzes/quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';

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
    path: 'admin/categories',
    component: CategoriesComponent,
    pathMatch: 'full',
    canActivate: [adminGuard],
  },
  {
    path: 'admin/add-category',
    component: AddCategoryComponent,
    pathMatch: 'full',
    canActivate: [adminGuard],
  },
  {
    path: 'admin/quizzes',
    component: QuizzesComponent,
    pathMatch: 'full',
    canActivate: [adminGuard],
  },
  {
    path: 'admin/add-quiz',
    component: AddQuizComponent,
    pathMatch: 'full',
    canActivate: [adminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
