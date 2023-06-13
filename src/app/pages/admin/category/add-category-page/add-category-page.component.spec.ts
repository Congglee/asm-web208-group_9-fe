import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryPageComponent } from './add-category-page.component';

describe('AddCategoryPageComponent', () => {
  let component: AddCategoryPageComponent;
  let fixture: ComponentFixture<AddCategoryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCategoryPageComponent]
    });
    fixture = TestBed.createComponent(AddCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
