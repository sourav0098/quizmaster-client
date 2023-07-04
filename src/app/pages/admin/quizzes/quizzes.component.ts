import { Component, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css'],
})
export class QuizzesComponent {
  quizzes: any = [];
  confirmDeleteQuizId: string = '';

  // Infinite scroll variables
  page: number = 0;
  pageSize: number = 6;
  lastPage: boolean = false;

  constructor(
    private _quizService: QuizService,
    private _toastrService: ToastrService,
    private _titleService: Title
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle('Quizzes | Admin Dashboard');

    this._quizService.getQuizzes(0, 10).subscribe({
      next: (res: any) => {
        this.quizzes = res?.content;
      },
      error: (err: any) => {
        this._toastrService.error(
          'Something went wrong! Unable to fetch quizzes'
        );
      },
    });
  }

  loadQuizzes() {
    if (this.lastPage) {
      return; // Do not make additional requests if it's the last page
    }

    this._quizService.getQuizzes(this.page, this.pageSize).subscribe({
      next: (res: any) => {
        const newQuizzes = res?.content;
        this.quizzes = [...this.quizzes, ...newQuizzes];

        if (res?.lastPage == true) {
          this.lastPage = true;
        }
      },
      error: (err) => {
        this._toastrService.error(
          'Something went wrong! Unable to fetch quizzes'
        );
      },
    });
  }

  onScroll() {
    if (!this.lastPage) {
      this.page++;
      this.loadQuizzes();
    }
  }

  // confirm delete quiz
  confirmDelete(quizId: string) {
    this.confirmDeleteQuizId = quizId;
  }

  // delete quiz
  deleteQuiz() {
    this._quizService.deleteQuiz(this.confirmDeleteQuizId).subscribe({
      next: (res: any) => {
        this._toastrService.success('Quiz deleted successfully');
        // Filter out the deleted quiz with the quizId
        this.quizzes = this.quizzes.filter(
          (quiz: any) => quiz.quizId !== this.confirmDeleteQuizId
        );
      },
      error: (err: any) => {
        this._toastrService.error(
          'Something went wrong! Unable to delete quiz'
        );
      },
    });
  }
}
