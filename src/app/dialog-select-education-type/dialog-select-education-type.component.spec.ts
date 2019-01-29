import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectEducationTypeComponent } from './dialog-select-education-type.component';

describe('DialogSelectEducationTypeComponent', () => {
  let component: DialogSelectEducationTypeComponent;
  let fixture: ComponentFixture<DialogSelectEducationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSelectEducationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSelectEducationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
