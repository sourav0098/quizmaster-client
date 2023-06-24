import { Component } from '@angular/core';
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
  constructor(private _categoryService: CategoryService) {}

  categories: Category[] = [];

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
}
