import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectParentComponent } from './dialog-select-parent.component';

describe('DialogSelectParentComponent', () => {
  let component: DialogSelectParentComponent;
  let fixture: ComponentFixture<DialogSelectParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSelectParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSelectParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
