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
  showSuccessMsg: boolean = false;
  selectedFiles: FileList | null = null;

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
      name: ['', [Validators.required, this.validateFields.bind(this)]],
      price: [0, Validators.required],
      thumb: [''],
      images: this.formBuilder.array([]),
      description: [''],
      categoryId: ['', Validators.required],
    });
  }

  // ? AbstractControl: đại diện cho một class base cho các form control, chẳng hạn như input fields, select box và form group. Nó xác định các thuộc tính và phương thức phổ biến mà các form control nên triển khai.

  // ? ValidationErrors: là một cấu trúc giống như từ điển, trong đó mỗi thuộc tính đại diện cho một lỗi xác thực. Tên thuộc tính thường là một chuỗi mô tả lỗi và giá trị có thể là bất kỳ dữ liệu nào (thường là đúng) cho biết sự hiện diện của lỗi.
  validateFields(control: AbstractControl): ValidationErrors | null {
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

  onSelect(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = event.target.files as FileList;
      const imageArray = this.productForm.get('images') as FormArray;

      // Clear existing images in the array
      imageArray.clear();

      // Loop through the selected files and add them to the array
      if (this.selectedFiles && this.selectedFiles.length > 0) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          const file = this.selectedFiles[i];
          const reader = new FileReader();

          reader.onload = (e: any) => {
            const imageData = e.target.result;
            imageArray.push(new FormControl(imageData));
          };

          reader.readAsDataURL(file);
        }
      }
    }
  }

  onHandleAddProduct() {
    this.productForm.markAllAsTouched();
    if (
      this.productForm.valid &&
      this.selectedFiles &&
      this.selectedFiles.length > 0
    ) {
      const formData = new FormData();
      formData.append('name', this.productForm.value.name);
      formData.append('price', this.productForm.value.price);
      formData.append('description', this.productForm.value.description);
      formData.append('categoryId', this.productForm.value.categoryId);

      if (this.selectedFiles[0]) {
        formData.append('thumb', this.selectedFiles[0]);
      }

      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('images', this.selectedFiles[i]);
      }

      this.productService.addProduct(formData).subscribe(
        (data) => {
          this.showSuccessMsg = true;
          this.productForm.reset({
            name: '',
            price: 0,
            thumb: '',
            description: '',
            categoryId: '',
          });
          // this.selectedFiles = [];
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
