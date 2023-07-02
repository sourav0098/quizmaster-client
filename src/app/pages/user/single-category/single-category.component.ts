import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css'],
})
export class SingleCategoryComponent {
  categoryId: string = '';

  category: any = {};
  quizzes: any = [];

  ngOnInit(): void {
    this.categoryId = this._route.snapshot.params['id'];

    this._titleService.setTitle('Loading Category..');

    this._categoryService.getCategoryById(this.categoryId).subscribe({
      next: (response:any) => {
        this.category = response;
        this._titleService.setTitle(response?.title+" | Explore a World of Quizzes");
      },
      error: (err) => {
        this._toastr.error(
          'Something went wrong, unable to load category details'
        );
      },
    });


    this._quizService.getActiveQuizByCategoryId(this.categoryId).subscribe({
      next: (res: any) => {
        this.quizzes = res?.content;
      },
      error: (err) => {
        this._toastr.error(
          'Something went wrong, unable to load quizzes for this category'
        );
      },
    });
  }

  constructor(
    private _categoryService: CategoryService,
    private _quizService: QuizService,
    private _toastr: ToastrService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private _titleService: Title
  ) {}

  redirectToStartQuiz(quizId: string) {
    if (this._authService.isLoggedIn()) {
      this._router.navigate(['quiz-instruction/' + quizId]);
    } else {
      this._toastr.error('Please login to start quiz');
    }
  }
}
