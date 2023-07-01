import { Location, LocationStrategy } from '@angular/common';
import { Component, HostListener } from '@angular/core';
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
  questions: any[] = [];
  timer: number = 0;
  formattedTimer: string = '';
  isQuizSubmitted: boolean = false;
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
    this.quizId = this._route.snapshot.params['id'];

    this._quizService.getQuizById(this.quizId).subscribe({
      next: (res: any) => {
        this.quiz = res;

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

    this._questionService.getQuestionbyQuiz(this.quizId).subscribe({
      next: (res: any) => {
        this.questions = res?.content;

        // add given answer property for each question
        this.questions.forEach((q: any) => {
          q['givenAnswer'] = '';
        });

        this.startTimer(); // Start the timer
      },
      error: (err) => {
        this._toastr.error('Something went wrong, unable to load questions');
      },
    });
  }

  constructor(
    private location: Location,
    private _route: ActivatedRoute,
    private _toastr: ToastrService,
    private _questionService: QuestionService,
    private _quizService: QuizService
  ) {}

  submitQuiz() {
    this.questions.forEach((q) => {
      if (q.givenAnswer == q.answer) {
        this.correctAnswers++;
        this.marksGot += this.marksPerCorrectAnswer;
      }

      if (q.givenAnswer.trim() !== '') {
        this.questionsAttempted++;
      }
    });
    this.isQuizSubmitted = true;
    console.log(this.correctAnswers);
    console.log(this.marksGot);
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
