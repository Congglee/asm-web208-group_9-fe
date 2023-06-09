import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/models/category';
import { IProduct } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-update-product-form',
  templateUrl: './update-product-form.component.html',
  styleUrls: ['./update-product-form.component.scss'],
})
export class UpdateProductFormComponent {
  product!: IProduct;
  categories: ICategory[] = [];
  products: IProduct[] = [];
  productForm!: FormGroup;
  showSuccessMsg: boolean = false;
  selectedThumbFile: File | null = null;
  selectedImageFiles: File[] = [];

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data.categories;
    });

    this.productService.getProducts().subscribe((data) => {
      this.products = data.products;
    });

    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, this.validateFields.bind(this)]],
      price: [0, Validators.required],
      thumb: [''],
      images: [],
      description: [''],
      categoryId: ['', Validators.required],
    });

    this.route.paramMap.subscribe((param) => {
      const productId = param.get('id') || '';

      this.productService.getProductByAdmin(productId).subscribe((product) => {
        this.product = product.productData;

        this.productForm.patchValue({
          name: product.productData.name,
          price: product.productData.price,
          thumb: '',
          images: [],
          description: product.productData.description,
          categoryId: product.productData.categoryId,
        });
      });
    });
  }

  validateFields(control: AbstractControl): ValidationErrors | null {
    const productName = control.value.trim();
    if (productName === '') {
      return { required: true };
    }

    const duplicateProduct = this.products.find(
      (product) =>
        product._id !== this.product._id &&
        product.name.trim().toLowerCase() === productName.toLowerCase()
    );

    if (duplicateProduct) {
      return { duplicate: true };
    }

    return null;
  }

  onSelectThumb(event: any) {
    const file = event.target.files[0];
    this.selectedThumbFile = file;
  }

  onSelectImages(event: any) {
    const files = event.target.files;
    this.selectedImageFiles = Array.from(files);
  }

  onHandleUpdateProduct() {
    this.productForm.markAllAsTouched();
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.value.name);
      formData.append('price', this.productForm.value.price);
      formData.append('description', this.productForm.value.description);
      formData.append(
        'categoryId',
        this.productForm.value.categoryId._id
          ? this.productForm.value.categoryId._id
          : this.productForm.value.categoryId
      );

      if (this.selectedThumbFile) {
        formData.append('thumb', this.selectedThumbFile);
      }

      if (this.selectedImageFiles.length > 0) {
        for (const file of this.selectedImageFiles) {
          formData.append('images', file);
        }
      }

      this.productService.updateProduct(this.product._id, formData).subscribe(
        (data) => {
          this.showSuccessMsg = true;
        },
        (error) => {
          console.log(error.message);
          this.showSuccessMsg = false;
        }
      );
    } else {
      this.showSuccessMsg = false;
    }
  }
}
