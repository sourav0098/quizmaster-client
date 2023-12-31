import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-instruction',
  templateUrl: './quiz-instruction.component.html',
  styleUrls: ['./quiz-instruction.component.css'],
})
export class QuizInstructionComponent {
  quizId: string = '';
  quiz: any = {};
  timerKey: string = 'quizTimer';


  ngOnInit(): void {

    this._titleService.setTitle('Quiz Instruction | Explore a World of Quizzes');

    this.quizId = this._route.snapshot.params['id'];

    this._quizService.getQuizById(this.quizId).subscribe({
      next: (res) => {
        this.quiz = res;
      },
      error: (err) => {
        this._toastr.error('Something went wrong! unable to load quiz');
      },
    });
  }

  constructor(
    private _quizService: QuizService,
    private _route: ActivatedRoute,
    private _toastr: ToastrService,
    private _titleService: Title
  ) {}

  resetQuizTimer() {
    sessionStorage.setItem(this.timerKey, (this.quiz.quizDuration*60).toString());
  }
}
