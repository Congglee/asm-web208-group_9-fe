import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategory } from 'src/app/models/category';

@Component({
  selector: 'app-category-list-admin',
  templateUrl: './category-list-admin.component.html',
  styleUrls: ['./category-list-admin.component.scss'],
})
export class CategoryListAdminComponent {
  @Input() categories!: ICategory[];
  @Output() onRemove: EventEmitter<number | string> = new EventEmitter<
    number | string
  >();

  removeCategory(_id?: number | string) {
    this.onRemove.emit(_id);
  }
}
