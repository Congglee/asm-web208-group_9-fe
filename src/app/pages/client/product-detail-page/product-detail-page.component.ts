import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/models/category';
import { IProduct } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss'],
})
export class ProductDetailPageComponent {
  product!: IProduct;
  relatedProducts!: IProduct[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const productSlug = param.get('slug') || '';
      this.productService
        .getProductByClient(productSlug)
        .subscribe((product) => {
          this.product = product.productData;

          this.getRelatedProducts();
        });
    });
  }

  getRelatedProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.relatedProducts = data.products.filter(
        (product) =>
          product.slug !== this.product.slug &&
          product.categoryId?._id === this.product.categoryId?._id
      );
    });
  }
}
