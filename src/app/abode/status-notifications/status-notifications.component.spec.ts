import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusNotificationsComponent } from './status-notifications.component';

describe('StatusNotificationsComponent', () => {
  let component: StatusNotificationsComponent;
  let fixture: ComponentFixture<StatusNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
