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
import { QuizQuestionsComponent } from './pages/admin/quiz-questions/quiz-questions.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { HomeComponent } from './pages/home/home.component';
import { AllCategoriesComponent } from './pages/user/all-categories/all-categories.component';
import { SingleCategoryComponent } from './pages/user/single-category/single-category.component';
import { QuizInstructionComponent } from './pages/user/quiz-instruction/quiz-instruction.component';
import { QuizAttemptComponent } from './pages/user/quiz-attempt/quiz-attempt.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
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
    path: 'categories',
    component: AllCategoriesComponent,
    pathMatch: 'full',
  },
  {
    path: 'category/:id',
    component: SingleCategoryComponent,
    pathMatch: 'full',
  },
  {
    path: 'quiz-instruction/:id',
    component: QuizInstructionComponent,
    pathMatch: 'full',
    canActivate: [normalGuard],
  },
  {
    path: 'quiz/:id/attempt',
    component: QuizAttemptComponent,
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
    path: 'admin/update-category/:id',
    component: UpdateCategoryComponent,
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
  {
    path: 'admin/update-quiz/:id',
    component: UpdateQuizComponent,
    pathMatch: 'full',
    canActivate: [adminGuard],
  },
  {
    path: 'admin/quiz-questions/:id',
    component: QuizQuestionsComponent,
    pathMatch: 'full',
    canActivate: [adminGuard],
  },
  {
    path: 'admin/update-question/:id',
    component: UpdateQuestionComponent,
    pathMatch: 'full',
    canActivate: [adminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
