import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ICategory } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-add-category-form',
  templateUrl: './add-category-form.component.html',
  styleUrls: ['./add-category-form.component.scss'],
})
export class AddCategoryFormComponent {
  category!: ICategory;
  categories: ICategory[] = [];
  categoryForm!: FormGroup;

  showSuccessMsg: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
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
  }

  validateCategoryName(control: AbstractControl): ValidationErrors | null {
    const categoryName = control.value.trim();

    if (categoryName === '') {
      return { required: true };
    }

    const duplicateCategory = this.categories.find(
      (category) =>
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

  onHandleAddCategory() {
    this.categoryForm.markAllAsTouched();
    if (this.categoryForm.valid) {
      const category: ICategory = {
        name: this.categoryForm.value.name,
      };

      if (this.categoryForm.value.image !== '') {
        category.image = this.categoryForm.value.image;
      }

      this.categoryService.addCategory(category).subscribe(
        (data) => {
          this.showSuccessMsg = true;
          this.categoryForm.reset();
        },
        (error) => console.log(error.message)
      );
    }
  }
}
