import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

    this._categoryService.getCategoryById(this.categoryId).subscribe({
      next: (response) => {
        this.category = response;
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
        console.log(res);
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
    private _route: ActivatedRoute
  ) {}
}
