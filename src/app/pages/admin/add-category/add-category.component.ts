import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  categoryForm: FormGroup;
  errorMessages: string[] = [];

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _categoryService: CategoryService
  ) {
    this.categoryForm = this._fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  customErrorMessages = {
    title: [
      { type: 'required', message: 'Category title is required' },
      {
        type: 'minlength',
        message: 'Category title name must be at least 2 characters long',
      },
    ],
    description: [
      { type: 'required', message: 'Description is required' },
      {
        type: 'minlength',
        message: 'Description must be at least 2 characters long',
      },
    ],
  };

  onCategoryFormSubmit() {
    if (this.categoryForm.valid) {
      this._categoryService
      .addCategory(this.categoryForm.value)
      .subscribe({
        next: (res) => {
          this._toastr.success('Category added successfully');
          this.categoryForm.reset();
          this.errorMessages = [];
        },
        error: (err) => {
          if (err?.error?.errors.length > 0) {
            this.errorMessages = err.error.errors;
          } else {
            this._toastr.error('Something went wrong');
          }
        },
      });
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
}
