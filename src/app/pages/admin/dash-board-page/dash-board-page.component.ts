import { Component } from '@angular/core';
import { ICategory } from 'src/app/models/category';
import { IProduct } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-dash-board-page',
  templateUrl: './dash-board-page.component.html',
  styleUrls: ['./dash-board-page.component.scss'],
})
export class DashBoardPageComponent {
  products: IProduct[] = [];
  categories: ICategory[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.products;
    });

    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data.categories;
    });
  }
}
