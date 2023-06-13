import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserInfoPageComponent } from './update-user-info-page.component';

describe('UpdateUserInfoPageComponent', () => {
  let component: UpdateUserInfoPageComponent;
  let fixture: ComponentFixture<UpdateUserInfoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserInfoPageComponent]
    });
    fixture = TestBed.createComponent(UpdateUserInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
