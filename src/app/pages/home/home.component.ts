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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  categories: Category[] = [];

  constructor(
    private _categoryService: CategoryService,
    private _toastr: ToastrService,
    private _titleService: Title
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle('QuizMaster | Test Your Knowledge!');

    this._categoryService.getAllCategories(0, 5).subscribe({
      next: (res: any) => {
        this.categories = res?.content;
      },
      error: (err) => {
        this._toastr.error('Something went wrong! unable to load categories');
      },
    });
  }
}
