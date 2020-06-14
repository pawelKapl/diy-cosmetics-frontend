import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplacementsModalComponent } from './replacements-modal.component';

describe('ReplacementsModalComponent', () => {
  let component: ReplacementsModalComponent;
  let fixture: ComponentFixture<ReplacementsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplacementsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplacementsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
