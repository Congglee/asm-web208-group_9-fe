import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ICategoriesResponse,
  ICategory,
  ICategoryResponse,
} from 'src/app/models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategoriesResponse> {
    return this.http.get<ICategoriesResponse>(
      'http://127.0.0.1:8080/api/categories'
    );
  }

  getCategory(_id?: string | number): Observable<ICategoryResponse> {
    return this.http.get<ICategoryResponse>(
      `http://127.0.0.1:8080/api/categories/${_id}`
    );
  }
}
