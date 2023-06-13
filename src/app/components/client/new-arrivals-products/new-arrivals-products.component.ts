import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-new-arrivals-products',
  templateUrl: './new-arrivals-products.component.html',
  styleUrls: ['./new-arrivals-products.component.scss'],
})
export class NewArrivalsProductsComponent {
  @Input() products!: IProduct[];
}
