import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list-admin',
  templateUrl: './product-list-admin.component.html',
  styleUrls: ['./product-list-admin.component.scss'],
})
export class ProductListAdminComponent {
  @Input() products!: IProduct[];
  @Output() onRemove: EventEmitter<number | string> = new EventEmitter<
    number | string
  >();

  removeProduct(_id?: number | string) {
    this.onRemove.emit(_id);
  }
}
