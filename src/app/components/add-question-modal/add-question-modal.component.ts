import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.css'],
})
export class AddQuestionModalComponent {
  quizId: string = '';
  addQuestionForm: FormGroup;
  errorMessages: string[] = [];
  @Output() questionEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _questionService: QuestionService,
    private _toastr: ToastrService
  ) {
    this.addQuestionForm = this._fb.group({
      quizId: new FormControl(''),
      question: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      option1: new FormControl('', [Validators.required]),
      option2: new FormControl('', [Validators.required]),
      option3: new FormControl('', [Validators.required]),
      option4: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params['id'];
    this.addQuestionForm.patchValue({
      quizId: this.quizId,
    });
  }

  customErrorMessages = {
    question: [
      { type: 'required', message: 'Question is required' },
      {
        type: 'minlength',
        message: 'Question must be at least 2 characters long',
      },
    ],
    option1: [{ type: 'required', message: 'Option 1 is required' }],
    option2: [{ type: 'required', message: 'Option 2 is required' }],
    option3: [{ type: 'required', message: 'Option 3 is required' }],
    option4: [{ type: 'required', message: 'Option 4 is required' }],
    answer: [{ type: 'required', message: 'Answer is required' }],
  };

  onAddQuestionFormSubmit() {
    if (this.addQuestionForm.valid) {
      this._questionService.addQuestion(this.addQuestionForm.value).subscribe({
        next: (res) => {
          document.getElementById('close-add-question-modal')?.click();
          this.questionEmitter.emit(res); // Emit the res value to the parent
          this._toastr.success('Question added successfully');
        },
        error: (err) => {
          if (err?.error?.errors.length > 0) {
            this.errorMessages = err.error.errors;
          } else {
            this._toastr.error('Something went wrong! unable to update quiz');
          }
        },
      });
    } else {
      this.addQuestionForm.markAllAsTouched();
    }
  }
}
