import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogListHomeComponent } from './blog-list-home.component';

describe('BlogListHomeComponent', () => {
  let component: BlogListHomeComponent;
  let fixture: ComponentFixture<BlogListHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogListHomeComponent]
    });
    fixture = TestBed.createComponent(BlogListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
