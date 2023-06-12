import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IProductClient,
  IProductsResponseClient,
  ProductFilterOptions,
} from 'src/app/models/product';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private Api = 'http://localhost:8080/api/product';

  constructor(private http: HttpClient) {}

  getProducts(options: any): Observable<IProductsResponseClient> {
    let params = new HttpParams();
    Object.keys(options).forEach((key) => {
      params = params.set(key, options[key]);
    });
    return this.http.get<IProductsResponseClient>(this.Api, { params });
  }
}
