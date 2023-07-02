import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent {
  quizId: string = '';
  quizTitle: string = '';
  updateQuizForm: FormGroup;
  categories: any = [];
  errorMessages: string[] = [];

  ngOnInit(): void {
    this._titleService.setTitle('Update Quiz | Admin Dashboard');

    this.quizId = this._route.snapshot.params['id'];

    this._quizService.getQuizById(this.quizId).subscribe({
      next: (res: any) => {
        // after getting the quiz pre fill the values in update form
        this.updateQuizForm.patchValue({
          categoryId: res?.category?.categoryId,
          title: res?.title,
          description: res?.description,
          maxScore: res?.maxScore,
          numberOfQuestions: res?.numberOfQuestions,
          quizDuration: res?.quizDuration,
          active: res?.active,
        });

        this.quizTitle = res?.title;
      },
      error: (err) => {
        this._toastr.error('Something went wrong! Unable to fetch category');
      },
    });

    this._categoryService.getAllCategories(0, 100).subscribe({
      next: (res: any) => {
        this.categories = res?.content;
      },
      error: (err) => {
        this._toastr.error('Something went wrong! Unable to fetch categories');
      },
    });
  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private _quizService: QuizService,
    private _categoryService: CategoryService,
    private _toastr: ToastrService,
    private _titleService: Title
  ) {
    this.updateQuizForm = this._fb.group({
      categoryId: new FormControl('', [Validators.required]),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      maxScore: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(1),
      ]),
      numberOfQuestions: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(1),
      ]),
      quizDuration: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(1),
      ]),
      active: new FormControl(true),
    });
  }

  customErrorMessages = {
    category: [{ type: 'required', message: 'Category is required' }],
    title: [
      { type: 'required', message: 'Quiz title is required' },
      {
        type: 'minlength',
        message: 'Quiz title name must be at least 2 characters long',
      },
    ],
    description: [
      { type: 'required', message: 'Description is required' },
      {
        type: 'minlength',
        message: 'Description must be at least 2 characters long',
      },
    ],
    maxScore: [
      { type: 'required', message: 'Max Score is required' },
      {
        type: 'min',
        message: 'Max Score should be atleast 1',
      },
      {
        type: 'pattern',
        message: 'Max Score should be positive and integer',
      },
    ],
    quizDuration: [
      { type: 'required', message: 'Quiz Duration is required' },
      {
        type: 'min',
        message: 'Quiz Duration should be atleast 1 min',
      },
      {
        type: 'pattern',
        message: 'Quiz Duration should be a positive and integer',
      },
    ],
    numberOfQuestions: [
      { type: 'required', message: 'Number of questions are required' },
      {
        type: 'min',
        message: 'Number should be atleast 1',
      },
      {
        type: 'pattern',
        message:
          'Number of questions should be a should be a positive and integer',
      },
    ],
  };

  onUpdateQuizFormSubmit() {
    if (this.updateQuizForm.valid) {
      this._quizService
        .updateQuiz(this.updateQuizForm.value, this.quizId)
        .subscribe({
          next: (res: any) => {
            this._toastr.success('Quiz updated successfully');
            this._router.navigate(['/admin/quizzes']);
          },
          error: (err: any) => {
            if (err?.error?.errors.length > 0) {
              this.errorMessages = err.error.errors;
            } else {
              this._toastr.error('Something went wrong! unable to update quiz');
            }
          },
        });
    } else {
      this.updateQuizForm.markAllAsTouched();
    }
  }
}
