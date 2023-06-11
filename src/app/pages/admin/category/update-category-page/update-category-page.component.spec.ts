import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategoryPageComponent } from './update-category-page.component';

describe('UpdateCategoryPageComponent', () => {
  let component: UpdateCategoryPageComponent;
  let fixture: ComponentFixture<UpdateCategoryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCategoryPageComponent]
    });
    fixture = TestBed.createComponent(UpdateCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
