import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewToolFormComponent } from './add-new-tool-form.component';

describe('AddNewToolFormComponent', () => {
  let component: AddNewToolFormComponent;
  let fixture: ComponentFixture<AddNewToolFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewToolFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewToolFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
