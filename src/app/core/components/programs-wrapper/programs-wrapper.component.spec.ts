import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsWrapperComponent } from './programs-wrapper.component';

describe('ProgramsWrapperComponent', () => {
  let component: ProgramsWrapperComponent;
  let fixture: ComponentFixture<ProgramsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
