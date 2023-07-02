import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { QuizzesComponent } from './pages/admin/quizzes/quizzes.component';
import { QuizQuestionsComponent } from './pages/admin/quiz-questions/quiz-questions.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { AddQuestionModalComponent } from './components/add-question-modal/add-question-modal.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { HomeComponent } from './pages/home/home.component';
import { AllCategoriesComponent } from './pages/user/all-categories/all-categories.component';
import { SingleCategoryComponent } from './pages/user/single-category/single-category.component';
import { QuizInstructionComponent } from './pages/user/quiz-instruction/quiz-instruction.component';
import { QuizAttemptComponent } from './pages/user/quiz-attempt/quiz-attempt.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    ProfileComponent,
    SidebarComponent,
    AddCategoryComponent,
    CategoriesComponent,
    AddQuizComponent,
    QuizzesComponent,
    QuizQuestionsComponent,
    UpdateQuizComponent,
    AddQuestionModalComponent,
    UpdateQuestionComponent,
    UpdateCategoryComponent,
    HomeComponent,
    AllCategoriesComponent,
    SingleCategoryComponent,
    QuizInstructionComponent,
    QuizAttemptComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    HttpClientModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    }),
    NgCircleProgressModule.forRoot({
      // set defaults here
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      responsive: true,
      showSubtitle: false,
      showUnits: false,
    }),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
