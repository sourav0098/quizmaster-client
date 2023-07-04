import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css'],
})
export class AllCategoriesComponent {
  categories: any = [];

  // Infinite scroll variables
  page: number = 0;
  pageSize: number = 9;
  lastPage: boolean = false;

  ngOnInit(): void {
    this._titleService.setTitle('All Categories | Explore a World of Quizzes');

    this.loadCategories();
  }

  constructor(
    private _categoryService: CategoryService,
    private _toastr: ToastrService,
    private _titleService: Title
  ) {}

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
        this._toastr.error('Something went wrong! Unable to fetch categories');
      },
    });
  }

  onScroll(): void {
    if (!this.lastPage) {
      this.page++;
      this.loadCategories();
    }
  }
}
