import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.css'],
})
export class QuizQuestionsComponent {
  quizId: string = '';
  quizTitle: string = '';
  numberOfQuestions: number = 0;
  totalElements = 0;
  errorMessages: string[] = [];
  insufficientQuestionsError = '';
  questions: any = [];
  confirmQuestionId: string = '';

  constructor(
    private _route: ActivatedRoute,
    private _questionService: QuestionService,
    private _quizService: QuizService,
    private _toastr: ToastrService,
    private _titleService: Title
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle('Questions | Admin Dashboard');

    this.quizId = this._route.snapshot.params['id'];

    this._quizService.getQuizById(this.quizId).subscribe({
      next: (res: any) => {
        this.quizTitle = res?.title;
        this.numberOfQuestions = res?.numberOfQuestions;

        this._titleService.setTitle('Questions for '+ res?.title + ' | Admin Dashboard');

      },
      error: (err) => {
        this._toastr.error('Something went wrong! unable to load quiz details');
      },
    });

    this._questionService.getQuestionbyQuiz(this.quizId).subscribe({
      next: (res: any) => {
        this.questions = res?.content;
        this.totalElements = res?.totalElements;
        this.checkInsufficientQuestionError(this.totalElements);
      },
      error: (err) => {
        if (err?.error?.status === 404) {
          this.insufficientQuestionsError = err?.error?.message;
        } else {
          this._toastr.error('Something went wrong! unable to load questions');
        }
      },
    });
  }

  onAddQuestion(res: any) {
    this.questions.push(res);
    this.totalElements += 1;
    this.checkInsufficientQuestionError(this.totalElements);
  }

  checkInsufficientQuestionError(totalElements: number) {
    if (this.numberOfQuestions > totalElements) {
      this.insufficientQuestionsError =
        'Question available for the quiz: ' + totalElements;
    } else {
      this.insufficientQuestionsError = '';
    }
  }

  confirmDeleteQuestion(questionId: string) {
    this.confirmQuestionId = questionId;
  }

  deleteQuestion() {
    this._questionService.deleteQuestion(this.confirmQuestionId).subscribe({
      next: (res: any) => {
        this.questions = this.questions.filter(
          (q: any) => q.questionId !== this.confirmQuestionId
        );
        this.totalElements -= 1;
        this.checkInsufficientQuestionError(this.totalElements);
        this._toastr.success('Questions deleted successfully');
      },
      error: (err) => {
        this._toastr.error('Something went wrong! unable to delete questions');
      },
    });
  }
}
