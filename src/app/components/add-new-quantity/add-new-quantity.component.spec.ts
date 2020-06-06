import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewQuantityComponent } from './add-new-quantity.component';

describe('AddNewQuantityComponent', () => {
  let component: AddNewQuantityComponent;
  let fixture: ComponentFixture<AddNewQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
