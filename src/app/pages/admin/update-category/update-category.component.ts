import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent {
  updateCategoryForm: FormGroup;
  errorMessages: string[] = [];
  categoryId: string = '';
  categoryTitle: string = '';

  ngOnInit(): void {
    this.categoryId = this._route.snapshot.params['id'];

    this._titleService.setTitle('Update Category | Admin Dashboard')

    this._categoryService.getCategoryById(this.categoryId).subscribe({
      next: (res: any) => {
        this.categoryTitle = res?.title;
        this.updateCategoryForm.patchValue({
          title: res?.title,
          description: res?.description,
        });
      },
      error: (err) => {
        this._toastr.error(
          'Something went wrong! unable to load category details'
        );
      },
    });
  }

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService,
    private _categoryService: CategoryService,
    private _titleService: Title
  ) {
    this.updateCategoryForm = this._fb.group({
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

  onUpdateCategoryFormSubmit() {
    if (this.updateCategoryForm.valid) {
      this._categoryService
        .updateCategory(this.categoryId, this.updateCategoryForm.value)
        .subscribe({
          next: (res) => {
            this._toastr.success('Category updated successfully');
            this.errorMessages = [];
            this._router.navigate(['/admin/categories']);
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
      this.updateCategoryForm.markAllAsTouched();
    }
  }
}
