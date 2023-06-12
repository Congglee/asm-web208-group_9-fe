import {
  ICategoriesResponse,
  ICategory,
  ICategoryResponse,
  ICategoryResponseClient,
} from './../../models/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  Api: string = 'http://localhost:8080/api/categories';
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('accessToken');
    return new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
  }

  getAllCategories(): Observable<ICategoryResponseClient> {
    return this.http.get<ICategoryResponseClient>(`${this.Api}`);
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
