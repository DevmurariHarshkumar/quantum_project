import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPropertiesComponent } from './main-properties.component';

describe('MainPropertiesComponent', () => {
  let component: MainPropertiesComponent;
  let fixture: ComponentFixture<MainPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainPropertiesComponent]
    });
    fixture = TestBed.createComponent(MainPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
