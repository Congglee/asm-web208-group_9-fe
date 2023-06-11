import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('accessToken');
    return new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
  }

  getProducts(params?: any): Observable<IProductsResponse> {
    const options = { params };
    return this.http.get<IProductsResponse>(
      'http://127.0.0.1:8080/api/products',
      options
    );
  }

  getProductByClient(slug: string): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(
      `http://127.0.0.1:8080/api/products/slug/${slug}`
    );
  }

  getProductByAdmin(_id?: string | number): Observable<IProductResponse> {
    const headers = this.getHeaders();
    return this.http.get<IProductResponse>(
      `http://127.0.0.1:8080/api/products/id/${_id}`,
      { headers }
    );
  }

  addProduct(product: FormData): Observable<IProduct> {
    const headers = this.getHeaders();
    return this.http.post<IProduct>(
      'http://127.0.0.1:8080/api/products',
      product,
      { headers }
    );
  }

  updateProduct(
    productId?: string | number,
    product?: FormData
  ): Observable<IProduct> {
    const headers = this.getHeaders();
    return this.http.put<IProduct>(
      `http://127.0.0.1:8080/api/products/${productId}`,
      product,
      { headers }
    );
  }

  deleteProduct(_id?: number | string): Observable<IProduct> {
    const headers = this.getHeaders();
    return this.http.delete<IProduct>(
      `http://127.0.0.1:8080/api/products/${_id}`,
      { headers }
    );
  }
}
