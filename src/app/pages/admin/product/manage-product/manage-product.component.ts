import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
})
export class ManageProductComponent {
  products: IProduct[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.hasOwnProperty('name') && params.hasOwnProperty('sort')) {
        this.getProducts(params['name'], params['sort']);
      } else if (params.hasOwnProperty('name')) {
        this.getProducts(params['name']);
      } else if (params.hasOwnProperty('sort')) {
        this.getProducts(undefined, params['sort']);
      } else {
        this.getProducts();
      }
    });
  }

  getProducts(name?: any, sort?: string) {
    const params: { [key: string]: string } = {};
    if (name) {
      params['name'] = name;
    }
    if (sort) {
      params['sort'] = sort;
    }
    this.productService.getProducts(params).subscribe((data) => {
      this.products = data.products;
    });
  }

  getCurrentSortQueryParam(): string {
    const queryParams = this.route.snapshot.queryParams;
    return queryParams.hasOwnProperty('sort') ? queryParams['sort'] : '';
  }

  getCurrentNameQueryParam(): string {
    const queryParams = this.route.snapshot.queryParams;
    return queryParams.hasOwnProperty('name') ? queryParams['name'] : '';
  }

  onFormSubmit(value: string) {
    const queryParams = { name: value, sort: this.getCurrentSortQueryParam() };
    this.router.navigate([], { queryParams });
  }

  onSortChange(event: any) {
    const selectedSort = event.target.value;
    const queryParams = {
      sort: selectedSort,
      name: this.getCurrentNameQueryParam(),
    };
    this.router.navigate([], { queryParams });
  }

  removeProduct(_id?: number | string) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này ?')) {
      this.productService.deleteProduct(_id).subscribe(
        () => {
          this.products = this.products.filter(
            (product) => product._id !== _id
          );
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  }
}
