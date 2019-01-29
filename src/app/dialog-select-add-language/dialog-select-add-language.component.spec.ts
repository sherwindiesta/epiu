import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectAddLanguageComponent } from './dialog-select-add-language.component';

describe('DialogSelectAddLanguageComponent', () => {
  let component: DialogSelectAddLanguageComponent;
  let fixture: ComponentFixture<DialogSelectAddLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSelectAddLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSelectAddLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
