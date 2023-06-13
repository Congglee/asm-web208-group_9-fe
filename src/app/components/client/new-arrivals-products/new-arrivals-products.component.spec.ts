import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArrivalsProductsComponent } from './new-arrivals-products.component';

describe('NewArrivalsProductsComponent', () => {
  let component: NewArrivalsProductsComponent;
  let fixture: ComponentFixture<NewArrivalsProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewArrivalsProductsComponent]
    });
    fixture = TestBed.createComponent(NewArrivalsProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
