import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  IProductClient,
  IProductsResponseClient,
} from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { CategoryService } from 'src/app/services/category/category.service';
import {
  ICategoryClient,
  ICategoryResponseClient,
} from 'src/app/models/category';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  products: IProductClient[] = [];
  categories: ICategoryClient[] = [];
  dataProduct!: IProductsResponseClient;
  datCategory!: ICategoryResponseClient;
  totalPages = 10; // Tổng số trang
  currentPage = 1; // Trang hiện tại
  totalItems: number | undefined = 0;
  itemsPerPage = 8; // Số sản phẩm hiển thị trên mỗi trang
  subscription!: Subscription;
  filterName = ''; // Tên sản phẩm để lọc
  reverseName = false; // Lọc ngược lại theo tên
  //
  sortOptions = [
    { label: 'Sắp xếp theo', value: '' },
    { label: 'Theo bảng chữ cái, A-Z', value: 'name' },
    { label: 'Theo thứ tự bảng chữ cái, Z-A', value: '-name' },
    { label: 'Giá, thấp đến cao', value: 'price' },
    { label: 'Giá từ cao đến thấp', value: '-price' },
  ];
  selectedSortOption = '';
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const nameFilter = params['name'];
      const sortFilter = params['sort'];
      const categoryId = params['categoryId'];
      const id: string = params['id'];
      this.currentPage = +params['page'] || 1; // Lấy giá trị của 'page' từ URL, mặc định là 1
      if (categoryId) {
        this.getProductFromCategory(categoryId);
      } else {
        this.getProducts();
      }
    });
    this.getCategories();
  }

  getProducts(): void {
    this.subscription = this.productService
      .getProducts(this.currentPage)
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

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (datCategory) => {
        this.datCategory = datCategory;
        this.categories = this.datCategory.categories;
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

    this.subscription = this.productService.getProducts(options).subscribe(
      (dataProduct) => {
        this.products = dataProduct.products;
        this.totalItems = dataProduct.totalProduct;
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
  onSortChange(event: Event): void {
    const sortValue = (event.target as HTMLInputElement).value;
    if (sortValue === 'name') {
      this.products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === '-name') {
      this.products.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortValue === 'price') {
      this.products.sort((a, b) => a.price - b.price);
    } else if (sortValue === '-price') {
      this.products.sort((a, b) => b.price - a.price);
    }

    // Thay đổi tham số 'name' trên URL
    this.router.navigate([], {
      queryParams: { name: sortValue },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
  }

  onPageChange(event: number): void {
    this.currentPage = event;

    // Thay đổi tham số 'page' trên URL
    this.router.navigate([], {
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge',
      replaceUrl: true, // Thay đổi để thay thế URL hiện tại
      relativeTo: this.route,
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

///

//

// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { IProduct, IProductsResponse } from 'src/app/models/product';
// import { ProductService } from 'src/app/services/product/product.service';
// import { CategoryService } from 'src/app/services/category/category.service';
// import { ICategory, ICategoryResponse } from 'src/app/models/category';
// import { ActivatedRoute, Params, Router } from '@angular/router';

// @Component({
//   selector: 'app-products-page',
//   templateUrl: './products-page.component.html',
//   styleUrls: ['./products-page.component.scss'],
// })
// export class ProductsPageComponent implements OnInit, OnDestroy {
//   products: IProduct[] = [];
//   categories: ICategory[] = [];
//   dataProduct!: IProductsResponse;
//   datCategory!: ICategoryResponse;
//   totalPages = 10; // Tổng số trang
//   currentPage = 1; // Trang hiện tại
//   totalItems: number | undefined = 0;
//   itemsPerPage = 8; // Số sản phẩm hiển thị trên mỗi trang
//   subscription!: Subscription;
//   filterName = ''; // Tên sản phẩm để lọc
//   reverseName = false; // Lọc ngược lại theo tên

//   constructor(
//     private productService: ProductService,
//     private categoryService: CategoryService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe((params: Params) => {
//       const id: string = params['id'];
//       if (id) {
//         this.getProductFromCategory(id);
//       } else {
//         this.getProducts();
//       }
//     });
//     this.getCategories();
//   }

//   getProducts(): void {
//     this.subscription = this.productService
//       .getProducts(this.currentPage)
//       .subscribe(
//         (dataProduct) => {
//           this.products = dataProduct.products;
//           this.totalItems = dataProduct.totalProduct;
//           this.applyFilters();
//         },
//         (error: any) => {
//           console.error('Đã xảy ra lỗi:', error);
//         }
//       );
//   }

//   getCategories(): void {
//     this.categoryService.getAllCategories().subscribe(
//       (datCategory) => {
//         this.datCategory = datCategory;
//         this.categories = this.datCategory.categories;
//       },
//       (error: any) => {
//         console.error('Đã xảy ra lỗi:', error);
//       }
//     );
//   }
//   getProductFromCategory(id: any): void {
//     // const id: any = this.route.snapshot.paramMap.get('id');
//     this.productService.getProductFromByIdCategory(id).subscribe((data) => {
//       this.products = data.products;
//       this.applyFilters();
//     });
//   }
//   applyFilters(): void {
//     let filteredProducts = [...this.products];

//     if (this.filterName) {
//       filteredProducts = filteredProducts.filter((product) =>
//         product.name.toLowerCase().includes(this.filterName.toLowerCase())
//       );
//     }

//     if (this.reverseName) {
//       filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
//     }

//     this.products = filteredProducts;
//   }
//   onSortChange(event: Event): void {
//     const sortValue = (event.target as HTMLInputElement).value;

//     if (sortValue === 'name') {
//       this.products.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortValue === '-name') {
//       this.products.sort((a, b) => b.name.localeCompare(a.name));
//     } else if (sortValue === 'price') {
//       this.products.sort((a, b) => a.price - b.price);
//     } else if (sortValue === '-price') {
//       this.products.sort((a, b) => b.price - a.price);
//     }

//     // Thay đổi tham số 'name' trên URL
//     this.router.navigate([], {
//       queryParams: { name: sortValue },
//       queryParamsHandling: 'merge',
//       relativeTo: this.route,
//     });
//   }

//   onPageChange(event: number): void {
//     this.currentPage = event;
//     this.getProducts();
//   }

//   ngOnDestroy(): void {
//     if (this.subscription) {
//       this.subscription.unsubscribe();
//     }
//   }
// }
