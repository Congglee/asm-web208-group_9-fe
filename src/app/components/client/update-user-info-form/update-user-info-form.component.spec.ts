import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserInfoFormComponent } from './update-user-info-form.component';

describe('UpdateUserInfoFormComponent', () => {
  let component: UpdateUserInfoFormComponent;
  let fixture: ComponentFixture<UpdateUserInfoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserInfoFormComponent]
    });
    fixture = TestBed.createComponent(UpdateUserInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
