import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

interface Category {
  categoryId: string;
  title: string;
  description: string;
  createdAt: Number;
  updatedAt: Number;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  categories: Category[] = [];
  confirmDeleteCategoryId: string = '';

  constructor(
    private _categoryService: CategoryService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._categoryService.getAllCategories(0, 10).subscribe({
      next: (res: any) => {
        this.categories = res?.content;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  confirmDelete(id: string) {
    this.confirmDeleteCategoryId = id;
  }

  deleteCategory() {
    this._categoryService
      .deleteCategory(this.confirmDeleteCategoryId)
      .subscribe({
        next: (res: any) => {
          this._toastr.success('Category deleted successfully');
          this.categories = this.categories.filter(
            (category: Category) =>
              category.categoryId !== this.confirmDeleteCategoryId
          );
        },
        error: (err) => {
          this._toastr.error('Something went wrong! Unable to delete category');
        },
      });
  }
}
