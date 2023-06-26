import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-delete-modal',
  templateUrl: './quiz-delete-modal.component.html',
  styleUrls: ['./quiz-delete-modal.component.css'],
})
export class QuizDeleteModalComponent {
  @Input() quizId: string = '';
  @Output() deleteClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private _quizService: QuizService,
    private _toastrService: ToastrService
  ) {}

  deleteQuiz(quizId: string) {
    this._quizService.deleteQuiz(quizId).subscribe({
      next: (res: any) => {
        this._toastrService.success('Quiz deleted successfully');
        this.deleteClicked.emit(quizId);
      },
      error: (err: any) => {
        this._toastrService.error(
          'Something went wrong! Unable to delete quiz'
        );
      },
    });
  }
}
