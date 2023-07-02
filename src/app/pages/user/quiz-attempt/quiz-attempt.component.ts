import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-attempt',
  templateUrl: './quiz-attempt.component.html',
  styleUrls: ['./quiz-attempt.component.css'],
})
export class QuizAttemptComponent {
  quizId: string = '';
  quiz: any = {};

  // all questions coming from server
  questions: any[] = [];

  // quiz attempt form
  quizAttemptForm: any = [];

  // timer
  timer: number = 0;

  // formatted timer in min:sec
  formattedTimer: string = '';

  // to check if quiz is submitted
  isQuizSubmitted: boolean = false;

  // timer key for local storage
  timerKey: string = 'quizTimer';

  marksGot: number = 0;
  correctAnswers: number = 0;
  questionsAttempted: number = 0;
  marksPerCorrectAnswer: number = 0;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.isQuizSubmitted) {
      $event.preventDefault();
      $event.returnValue = '';
      this.saveTimerToStorage();
    }
  }

  // Prevent back button
  @HostListener('window:popstate', ['$event'])
  popStateListener(event: any) {
    if (!this.isQuizSubmitted) {
      history.forward();
      this._toastr.warning(
        'Sorry! You are not allowed to go back during the quiz attempt.',
        'Warning'
      );
    }
  }

  ngOnInit(): void {
    this._titleService.setTitle('Loading Questions...');

    this.quizId = this._route.snapshot.params['id'];

    this._quizService.getQuizById(this.quizId).subscribe({
      next: (res: any) => {
        this.quiz = res;

        this._titleService.setTitle(
          res?.title + ' |  Put Your Skills to the Test'
        );

        // marks per correct answer
        this.marksPerCorrectAnswer =
          this.quiz.maxScore / this.quiz.numberOfQuestions;

        // setting timer
        this.timer = this.quiz.quizDuration * 60; // Convert minutes to seconds
        this.updateFormattedTimer();
        this.loadTimerFromStorage(); // Load timer from storage
      },
      error: (err) => {
        this._toastr.error('Something went wrong, unable to load quiz details');
      },
    });

    this._questionService.getQuestionbyQuizForUser(this.quizId).subscribe({
      next: (res: any) => {
        this.questions = res?.content;

        this.quizAttemptForm = this.questions.map((q: any) => {
          return {
            questionId: q.questionId,
            givenAnswer: '',
          };
        });

        this.startTimer(); // Start the timer
      },
      error: (err) => {
        this._toastr.error('Something went wrong, unable to load questions');
      },
    });
  }

  constructor(
    private _route: ActivatedRoute,
    private _toastr: ToastrService,
    private _questionService: QuestionService,
    private _quizService: QuizService,
    private _titleService: Title
  ) {}

  submitQuiz() {
    this._questionService.evaluateQuiz(this.quizAttemptForm).subscribe({
      next: (res: any) => {
        this.correctAnswers = res?.correctAnswers;
        this.marksGot = this.marksPerCorrectAnswer * this.correctAnswers;
        this.questionsAttempted = res?.questionsAttempted;
        this.isQuizSubmitted = true;

        this._titleService.setTitle(
          'Congratulations! Quiz Completed'
        );
      },
      error: (err) => {
        this._toastr.error('Something went wrong, unable to evaluate quiz');
      },
    });
  }

  startTimer() {
    const savedTimerValue = this.getSavedTimerValue();
    if (savedTimerValue) {
      this.timer = savedTimerValue;
    }

    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.submitQuiz();
        clearInterval(t);
      } else {
        this.timer--;
        this.updateFormattedTimer();
        this.saveTimerToStorage(); // Save timer value to storage
      }
    }, 1000);
  }

  getProgressPercent(): number {
    const totalDuration = this.quiz.quizDuration * 60;
    return (this.timer / totalDuration) * 100;
  }

  updateFormattedTimer() {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    this.formattedTimer = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  saveTimerToStorage() {
    sessionStorage.setItem(this.timerKey, this.timer.toString());
  }

  loadTimerFromStorage() {
    const savedTimerValue = sessionStorage.getItem(this.timerKey);
    if (savedTimerValue) {
      this.timer = parseInt(savedTimerValue, 10);
    }
  }

  getSavedTimerValue() {
    return parseInt(sessionStorage.getItem(this.timerKey) || '', 10);
  }
}
