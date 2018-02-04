import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusNetworkComponent } from './status-network.component';

describe('StatusNetworkComponent', () => {
  let component: StatusNetworkComponent;
  let fixture: ComponentFixture<StatusNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
