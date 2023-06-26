import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css'],
})
export class QuizzesComponent {
  constructor(
    private _quizService: QuizService,
    private _toastrService: ToastrService
  ) {}
  quizzes: any = [];

  ngOnInit(): void {
    this._quizService.getQuizzes(0, 10).subscribe({
      next: (res: any) => {
        this.quizzes = res?.content;
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onDeleteQuiz(quizId: string) {
    // Filter out the deleted quiz with the quizId
    this.quizzes = this.quizzes.filter((quiz: any) => quiz.quizId !== quizId);
  }
}
