import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css'],
})
export class UpdateQuestionComponent {
  questionId: string = '';
  updateQuestionForm: FormGroup;
  errorMessages: string[] = [];
  public Editor = ClassicEditor;

  ngOnInit(): void {

    this._titleService.setTitle('Update Question | Admin Dashboard')

    this.questionId = this._route.snapshot.params['id'];

    this._questionService.getQuestionById(this.questionId).subscribe({
      next: (res: any) => {
        this.updateQuestionForm.patchValue({
          question: res?.question,
          option1: res?.option1,
          option2: res?.option2,
          option3: res?.option3,
          option4: res?.option4,
          answer: res?.answer,
        });
      },
      error: (err) => {
        this._toastr.error(
          'Something went wrong! unable to load question details'
        );
      },
    });
  }

  constructor(
    private _questionService: QuestionService,
    private _toastr: ToastrService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _titleService: Title
  ) {
    this.updateQuestionForm = this._fb.group({
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

  onUpdateQuestionFormSubmit() {
    if (this.updateQuestionForm.valid) {
      this._questionService
        .updateQuestion(this.updateQuestionForm.value, this.questionId)
        .subscribe({
          next: (res) => {
            this._toastr.success('Question updated successfully');
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
      this.updateQuestionForm.markAllAsTouched();
    }
  }
}
