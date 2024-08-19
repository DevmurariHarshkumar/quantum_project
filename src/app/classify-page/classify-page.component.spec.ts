import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifyPageComponent } from './classify-page.component';

describe('ClassifyPageComponent', () => {
  let component: ClassifyPageComponent;
  let fixture: ComponentFixture<ClassifyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassifyPageComponent]
    });
    fixture = TestBed.createComponent(ClassifyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
