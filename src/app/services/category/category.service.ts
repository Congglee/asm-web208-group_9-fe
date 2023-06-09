import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory, ICategoryResponse } from 'src/app/models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategoryResponse> {
    return this.http.get<ICategoryResponse>(
      'http://127.0.0.1:8080/api/categories'
    );
  }
}
