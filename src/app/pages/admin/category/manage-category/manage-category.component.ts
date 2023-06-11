import { Component } from '@angular/core';
import { ICategory } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss'],
})
export class ManageCategoryComponent {
  categories: ICategory[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data.categories;
    });
  }

  removeCategory(_id?: number | string) {
    if (confirm('Bạn có chắc chắn muốn xóa danh mục này ?')) {
      this.categoryService.deleteCategory(_id).subscribe(
        () => {
          this.categories = this.categories.filter(
            (category) => category._id !== _id
          );
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  }
}
