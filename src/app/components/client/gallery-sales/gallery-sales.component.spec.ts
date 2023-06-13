import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerySalesComponent } from './gallery-sales.component';

describe('GallerySalesComponent', () => {
  let component: GallerySalesComponent;
  let fixture: ComponentFixture<GallerySalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GallerySalesComponent]
    });
    fixture = TestBed.createComponent(GallerySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
