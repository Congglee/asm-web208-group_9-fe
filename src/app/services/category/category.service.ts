import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategoryResponseClient } from 'src/app/models/category';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  Api: string = 'http://localhost:8080/api/categories';
  constructor(private http: HttpClient) {}
  getAllCategories(): Observable<ICategoryResponseClient> {
    return this.http.get<ICategoryResponseClient>(`${this.Api}`);
  }
}
