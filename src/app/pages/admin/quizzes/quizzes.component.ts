import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css'],
})
export class QuizzesComponent {
  constructor(private _quizService: QuizService) {}
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
}
