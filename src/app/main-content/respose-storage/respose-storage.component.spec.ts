import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResposeStorageComponent } from './respose-storage.component';

describe('ResposeStorageComponent', () => {
  let component: ResposeStorageComponent;
  let fixture: ComponentFixture<ResposeStorageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResposeStorageComponent]
    });
    fixture = TestBed.createComponent(ResposeStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
