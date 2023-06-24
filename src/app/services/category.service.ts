import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from './api.endpoints';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) {}

  // get category by id
  public getCategoryById(id: string) {
    return this._http.get(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.CATEGORY}/${id}`
    );
  }

  // get all categories
  public getAllCategories(
    pageNumber: number = 0,
    pageSize: number = 10,
    sortBy: string = 'title',
    sortDir: string = 'asc'
  ) {
    return this._http.get(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.CATEGORY}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    );
  }

  // add new category
  public addCategory(category: any) {
    return this._http.post(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.CATEGORY}`,
      category
    );
  }

  // update category
  public updateCategory(id: string, category: any) {
    return this._http.put(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.CATEGORY}/${id}`,
      category
    );
  }

  // delete category
  public deleteCategory(id: string) {
    return this._http.delete(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.CATEGORY}/${id}`
    );
  }
}
