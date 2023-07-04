import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
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

  // Infinite scroll variables
  page: number = 0;
  pageSize: number = 15;
  lastPage: boolean = false;

  constructor(
    private _categoryService: CategoryService,
    private _toastr: ToastrService,
    private _titleService: Title,
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle('Categories | Admin Dashboard');

    this.loadCategories();
  }

  loadCategories(): void {
    if (this.lastPage) {
      return; // Do not make additional requests if it's the last page
    }

    this._categoryService.getAllCategories(this.page, this.pageSize).subscribe({
      next: (res: any) => {
        const newCategories = res?.content;
        this.categories = [...this.categories, ...newCategories];

        if (res?.lastPage == true) {
          this.lastPage = true;
        }
      },
      error: (err) => {
        this._toastr.error(
          'Something went wrong! Unable to fetch categories'
        );
      },
    });
  }

  onScroll(): void {
    if (!this.lastPage) {
      this.page++;
      this.loadCategories();
    }
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
