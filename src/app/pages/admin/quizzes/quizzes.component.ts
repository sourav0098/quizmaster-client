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

  constructor(
    private _quizService: QuizService,
    private _toastrService: ToastrService,
    private _titleService: Title
  ) {}

  ngOnInit(): void {

    this._titleService.setTitle('Quizzes | Admin Dashboard')
    

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
