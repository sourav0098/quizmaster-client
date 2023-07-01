import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css'],
})
export class AllCategoriesComponent {
  categories: any = [];

  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res?.content;
      },
      error: (err) => {
        this._toastr.error('Something went wrong, unable to load categories');
      },
    });
  }

  constructor(
    private _categoryService: CategoryService,
    private _toastr: ToastrService
  ) {}
}
