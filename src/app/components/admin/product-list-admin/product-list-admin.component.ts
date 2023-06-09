import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list-admin',
  templateUrl: './product-list-admin.component.html',
  styleUrls: ['./product-list-admin.component.scss'],
})
export class ProductListAdminComponent {
  products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.products;
    });
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
