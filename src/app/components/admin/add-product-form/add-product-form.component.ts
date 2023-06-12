import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ICategory } from 'src/app/models/category';
import { IProduct } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss'],
})
export class AddProductFormComponent {
  product!: IProduct;
  categories: ICategory[] = [];
  products: IProduct[] = [];
  productForm!: FormGroup;

  // Success message
  showSuccessMsg: boolean = false;

  selectedThumbFile: File | null = null;
  selectedImageFiles: File[] = [];
  // Validate image file name
  invalidFileNames: string[] = [];

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
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
      name: ['', [Validators.required, this.validateProductName.bind(this)]],
      price: [0, Validators.required],
      thumb: [''],
      images: this.formBuilder.array([]),
      description: ['', this.validateDescription.bind(this)],
      categoryId: ['', Validators.required],
    });
  }

  validateProductName(control: AbstractControl): ValidationErrors | null {
    // control: đại diện cho các form control đang được xác thực

    const productName = control.value.trim(); // truy xuất giá trị đã nhập trong form controll name và xóa mọi ký tự khoảng trắng ở đầu hoặc cuối bằng cách sử dụng phương thức trim().

    if (productName === '') {
      // Trả về 1 object với thuộc tính là required là true
      return { required: true }; // Điều này cho biết rằng trường này là bắt buộc và người dùng phải cung cấp một giá trị.
    }

    const duplicateProduct = this.products.find(
      (product) =>
        product.name.trim().toLowerCase() === productName.toLowerCase()
    );

    // Nếu duplicateProduct có tồn tại
    if (duplicateProduct) {
      // Trả về một đối tượng có thuộc tính trùng lặp được đặt thành true
      return { duplicate: true }; // và người dùng nên chọn một tên khác.
    }

    // Trả về là null nếu không có lỗi xác thực
    return null;
  }

  // validate description
  validateDescription(control: AbstractControl): ValidationErrors | null {
    const description = control.value;
    if (description && description.trim() === '') {
      // Nếu description tồn tại và sau khi loại bỏ khoảng trống description có giá trị là một chuỗi rỗng
      return { whitespace: true }; // Trả về thuộc tính whitespace: true
    }
    return null;
  }

  onSelectThumb(event: any) {
    const file = event.target.files[0];
    this.selectedThumbFile = file;
    // this.validateFileTypes([this.selectedThumbFile]);
  }

  onSelectImages(event: any) {
    const files = event.target.files;
    this.selectedImageFiles = Array.from(files);
    this.validateFileTypes(this.selectedImageFiles);
  }

  validateFileTypes(files: File[]) {
    this.invalidFileNames = [];
    for (const file of files) {
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (extension && !['jpg', 'jpeg', 'png', 'webp'].includes(extension)) {
        this.invalidFileNames.push(file.name);
      }
    }
  }

  onHandleAddProduct() {
    this.productForm.markAllAsTouched();
    if (
      this.productForm.valid &&
      this.selectedThumbFile &&
      this.selectedImageFiles.length > 0
    ) {
      const formData = new FormData();
      formData.append('name', this.productForm.value.name);
      formData.append('price', this.productForm.value.price);
      this.productForm.value.description !== ''
        ? formData.append('description', this.productForm.value.description)
        : '';
      formData.append('categoryId', this.productForm.value.categoryId);

      if (this.selectedThumbFile) {
        formData.append('thumb', this.selectedThumbFile);
      }

      if (this.selectedImageFiles.length > 0) {
        for (const file of this.selectedImageFiles) {
          formData.append('images', file);
        }
      }

      this.productService.addProduct(formData).subscribe(
        (data) => {
          this.showSuccessMsg = true;
          // this.productForm.reset({
          //   name: '',
          //   price: 0,
          //   thumb: '',
          //   description: '',
          //   categoryId: '',
          // });
          // this.selectedThumbFile = null;
          // this.selectedImageFiles = [];
          window.location.reload();
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
