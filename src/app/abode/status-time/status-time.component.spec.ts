import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTimeComponent } from './status-time.component';

describe('StatusTimeComponent', () => {
  let component: StatusTimeComponent;
  let fixture: ComponentFixture<StatusTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
