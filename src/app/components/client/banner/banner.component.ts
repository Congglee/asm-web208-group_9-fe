import { IProductClient } from './../../../models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { CategoryService } from 'src/app/services/category/category.service';
import {
  ICategoryClient,
  ICategoryResponseClient,
} from './../../../models/category';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
  categories: ICategoryClient[] = [];
  dataCategory!: ICategoryResponseClient;
  subscription!: Subscription;
  currentPage = 1;
  products: IProductClient[] = [];
  totalItems: number | undefined = 0;
  filterName = '';
  reverseName = false;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const categoryId = params['categoryId'];
      if (categoryId) {
        this.getProductFromCategory(categoryId);
      } else {
        this.getProducts();
      }
    });

    this.categoryService.getAllCategories().subscribe(
      (datCategory) => {
        this.dataCategory = datCategory;
        this.categories = this.dataCategory.categories;
      },
      (error: any) => {
        console.error('Đã xảy ra lỗi:', error);
      }
    );
  }

  getProductFromCategory(categoryId: any): void {
    const options = {
      categoryId: categoryId,
      page: this.currentPage.toString(),
    };

    this.subscription = this.productService
      .getProductsByClient(options)
      .subscribe(
        (dataProduct) => {
          this.products = dataProduct.products;
          this.totalItems = dataProduct.totalProduct;
        },
        (error: any) => {
          console.error('Đã xảy ra lỗi:', error);
        }
      );
  }

  getProducts(): void {
    this.subscription = this.productService
      .getProductsByClient(this.currentPage)
      .subscribe(
        (dataProduct) => {
          this.products = dataProduct.products;
          this.totalItems = dataProduct.totalProduct;
          this.applyFilters();
        },
        (error: any) => {
          console.error('Đã xảy ra lỗi:', error);
        }
      );
  }

  applyFilters(): void {
    let filteredProducts = [...this.products];

    if (this.filterName) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(this.filterName.toLowerCase())
      );
    }
    if (this.reverseName) {
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    this.products = filteredProducts;
  }
}
