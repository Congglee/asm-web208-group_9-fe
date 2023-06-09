import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IProduct,
  IProductResponse,
  IProductsResponse,
} from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProductsResponse> {
    return this.http.get<IProductsResponse>(
      'http://127.0.0.1:8080/api/products'
    );
  }

  getProductByClient(slug: string): Observable<IProduct> {
    return this.http.get<IProduct>(
      `http://127.0.0.1:8080/api/products/slug/${slug}`
    );
  }

  getProductByAdmin(_id?: string | number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(
      `http://127.0.0.1:8080/api/products/id/${_id}`
    );
  }

  addProduct(product: FormData): Observable<IProduct> {
    return this.http.post<IProduct>(
      'http://127.0.0.1:8080/api/products',
      product
    );
  }

  updateProduct(
    productId?: string | number,
    product?: FormData
  ): Observable<IProduct> {
    return this.http.put<IProduct>(
      `http://127.0.0.1:8080/api/products/${productId}`,
      product
    );
  }

  deleteProduct(_id?: number | string): Observable<IProduct> {
    return this.http.delete<IProduct>(
      `http://127.0.0.1:8080/api/products/${_id}`
    );
  }
}
