import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePopupMOdalComponent } from './image-popup-modal.component';

describe('ImagePopupMOdalComponent', () => {
  let component: ImagePopupMOdalComponent;
  let fixture: ComponentFixture<ImagePopupMOdalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagePopupMOdalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePopupMOdalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
