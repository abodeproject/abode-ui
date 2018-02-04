import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusIssuesComponent } from './status-issues.component';

describe('StatusIssuesComponent', () => {
  let component: StatusIssuesComponent;
  let fixture: ComponentFixture<StatusIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
