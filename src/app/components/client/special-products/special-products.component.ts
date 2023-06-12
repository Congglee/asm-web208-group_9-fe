import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-special-products',
  templateUrl: './special-products.component.html',
  styleUrls: ['./special-products.component.scss'],
})
export class SpecialProductsComponent {
  @Input() products!: IProduct[];
}
