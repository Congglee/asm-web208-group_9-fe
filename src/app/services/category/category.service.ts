import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('accessToken');
    return new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
  }

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

  addCategory(category: ICategory): Observable<ICategory> {
    const headers = this.getHeaders();
    return this.http.post<ICategory>(
      'http://127.0.0.1:8080/api/categories',
      category,
      { headers }
    );
  }

  updateCategory(
    categoryId?: string | number,
    category?: ICategory
  ): Observable<ICategory> {
    const headers = this.getHeaders();
    return this.http.put<ICategory>(
      `http://127.0.0.1:8080/api/categories/${categoryId}`,
      category,
      { headers }
    );
  }

  deleteCategory(_id?: number | string): Observable<ICategory> {
    const headers = this.getHeaders();
    return this.http.delete<ICategory>(
      `http://127.0.0.1:8080/api/categories/${_id}`,
      { headers }
    );
  }
}
