import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-update-category-form',
  templateUrl: './update-category-form.component.html',
  styleUrls: ['./update-category-form.component.scss'],
})
export class UpdateCategoryFormComponent {
  category!: ICategory;
  categories: ICategory[] = [];
  categoryForm!: FormGroup;

  showSuccessMsg: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data.categories;
    });

    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, this.validateCategoryName.bind(this)]],
      image: [
        '',
        [
          Validators.pattern(/\.(jpg|jpeg|png|webp)/i),
          this.validateCategoryImage.bind(this),
        ],
      ],
    });

    this.route.paramMap.subscribe((param) => {
      const categoryId = param.get('id') || '';

      this.categoryService.getCategory(categoryId).subscribe((category) => {
        this.category = category.productCategory;

        this.categoryForm.patchValue({
          name: category.productCategory.name,
          image: category.productCategory.image,
        });
      });
    });
  }

  validateCategoryName(control: AbstractControl): ValidationErrors | null {
    const categoryName = control.value.trim();

    if (categoryName === '') {
      return { required: true };
    }

    const duplicateCategory = this.categories.find(
      (category) =>
        category._id !== this.category._id &&
        category.name.trim().toLowerCase() === categoryName.toLowerCase()
    );

    if (duplicateCategory) {
      return { duplicate: true };
    }

    return null;
  }

  validateCategoryImage(control: AbstractControl): ValidationErrors | null {
    const image = control.value;
    if (image && image.trim() === '') {
      return { whitespace: true };
    }
    return null;
  }

  onHandleUpdateCategory() {
    this.categoryForm.markAllAsTouched();
    if (this.categoryForm.valid) {
      const category: ICategory = {
        name: this.categoryForm.value.name,
      };

      if (this.categoryForm.value.image !== '') {
        category.image = this.categoryForm.value.image;
      }

      this.categoryService
        .updateCategory(this.category._id, category)
        .subscribe(
          (data) => {
            this.showSuccessMsg = true;
          },
          (error) => console.log(error.message)
        );
    }
  }
}
